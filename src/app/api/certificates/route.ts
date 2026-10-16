import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  findLocalCertificate,
  getLocalCertificates,
  addLocalCertificates,
  generateUniqueCode,
} from "@/lib/certificateStore";
import { CertificateRecord } from "@/data/certificateData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // 1. Single Certificate Verification Mode
  if (code) {
    const trimmedCode = code.trim().toUpperCase();

    // Query Supabase first
    try {
      const { data: supaCert, error } = await supabaseAdmin
        .from("certificates")
        .select("*")
        .ilike("certificate_id", trimmedCode)
        .maybeSingle();

      if (!error && supaCert) {
        return NextResponse.json({
          success: true,
          verified: true,
          source: "supabase",
          certificate: {
            certificateId: supaCert.certificate_id,
            name: supaCert.recipient_name,
            date: supaCert.event_date,
            event: supaCert.event_name,
            role: supaCert.certificate_type || "Certificate of Achievement",
            issuer: supaCert.issuer || "CYPHER — Department of AIML, NCERC",
            issuedAt: supaCert.issued_at || supaCert.created_at,
          },
        });
      }
    } catch (error: unknown) {
      console.warn("Supabase lookup fallback to local store:", error);
    }

    // Fallback to local store
    const localCert = findLocalCertificate(trimmedCode);
    if (localCert) {
      return NextResponse.json({
        success: true,
        verified: true,
        source: "hybrid-store",
        certificate: localCert,
      });
    }

    // Invalid / Fake Certificate
    return NextResponse.json({
      success: true,
      verified: false,
      message: "The entered certificate ID does not match any authentic record issued by CYPHER AIML.",
    });
  }

  // 2. List All Certificates Mode (Admin Registry)
  try {
    const { data: supaCerts, error } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && supaCerts && supaCerts.length > 0) {
      const mapped = supaCerts.map((c) => ({
        certificateId: c.certificate_id,
        name: c.recipient_name,
        date: c.event_date,
        event: c.event_name,
        role: c.certificate_type || "Certificate of Achievement",
        issuer: c.issuer || "CYPHER — Department of AIML, NCERC",
        issuedAt: c.issued_at || c.created_at,
      }));

      return NextResponse.json({
        success: true,
        source: "supabase",
        count: mapped.length,
        certificates: mapped,
      });
    }
  } catch (error: unknown) {
    console.warn("Falling back to local certificates list:", error);
  }

  const localList = getLocalCertificates();
  return NextResponse.json({
    success: true,
    source: "local-cache",
    count: localList.length,
    certificates: localList,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Support single item or bulk array in `items`
    const rawItems: Array<{ name: string; date: string; event: string; role?: string; rollNumber?: string }> =
      Array.isArray(body.items) ? body.items : [body];

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "No certificate items provided in payload." },
        { status: 400 }
      );
    }

    const createdRecords: CertificateRecord[] = [];
    const supabasePayloads: any[] = [];
    const generatedCodesSet = new Set<string>();

    for (const item of rawItems) {
      if (!item.name || !item.event) continue;

      const certCode = generateUniqueCode("CYPHER-2026", generatedCodesSet);
      generatedCodesSet.add(certCode);

      const record: CertificateRecord = {
        certificateId: certCode,
        name: item.name.trim(),
        date: item.date || new Date().toISOString().split("T")[0],
        event: item.event.trim(),
        role: item.role ? item.role.trim() : "Certificate of Active Participation",
        issuer: "CYPHER — Department of AIML, NCERC",
        issuedAt: new Date().toISOString(),
      };

      createdRecords.push(record);

      supabasePayloads.push({
        certificate_id: record.certificateId,
        recipient_name: record.name,
        roll_number: item.rollNumber || null,
        event_name: record.event,
        event_date: record.date,
        certificate_type: record.role,
        issuer: record.issuer,
      });
    }

    if (createdRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid certificate items: 'name' and 'event' are required fields." },
        { status: 400 }
      );
    }

    // Save to Supabase
    try {
      const { error: supaErr } = await supabaseAdmin.from("certificates").insert(supabasePayloads);
      if (supaErr) {
        console.warn("Supabase insert warning:", supaErr.message);
      }
    } catch (err) {
      console.warn("Could not insert into Supabase, saving to local store:", err);
    }

    // Always keep local store updated as fallback
    addLocalCertificates(createdRecords);

    return NextResponse.json({
      success: true,
      message: `Successfully issued ${createdRecords.length} certificate(s).`,
      count: createdRecords.length,
      certificates: createdRecords,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: `Failed to issue certificates: ${errMessage}` },
      { status: 500 }
    );
  }
}
