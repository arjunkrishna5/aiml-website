import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CertificateModel } from "@/models/Certificate";
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

    try {
      const conn = await connectToDatabase();
      if (conn) {
        const dbCert = await CertificateModel.findOne({
          certificateId: { $regex: new RegExp(`^${trimmedCode}$`, "i") },
        }).lean();

        if (dbCert) {
          return NextResponse.json({
            success: true,
            verified: true,
            source: "database",
            certificate: {
              certificateId: dbCert.certificateId,
              name: dbCert.name,
              date: dbCert.date,
              event: dbCert.event,
              role: dbCert.role || "Certificate of Achievement",
              issuer: dbCert.issuer || "CYPHER — Department of AIML, NCERC",
              issuedAt: dbCert.createdAt || new Date(),
            },
          });
        }
      }
    } catch (error: unknown) {
      console.warn("DB lookup fallback to local store:", error);
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

  // 2. List All Certificates Mode
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbCerts = await CertificateModel.find().sort({ createdAt: -1 }).lean();
      if (dbCerts && dbCerts.length > 0) {
        return NextResponse.json({
          success: true,
          count: dbCerts.length,
          certificates: dbCerts,
        });
      }
    }
  } catch (error: unknown) {
    console.warn("Falling back to local certificates list:", error);
  }

  const localList = getLocalCertificates();
  return NextResponse.json({
    success: true,
    count: localList.length,
    certificates: localList,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Support single item or bulk array in `items`
    const rawItems: Array<{ name: string; date: string; event: string; role?: string }> =
      Array.isArray(body.items) ? body.items : [body];

    if (!rawItems || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "No certificate records provided." },
        { status: 400 }
      );
    }

    const currentLocal = getLocalCertificates();
    const existingIds = new Set(currentLocal.map((c) => c.certificateId.trim().toUpperCase()));

    const processedCerts: CertificateRecord[] = rawItems
      .filter((item) => item.name && item.name.trim() !== "")
      .map((item) => {
        const uniqueId = generateUniqueCode("CYPHER-2026", existingIds);
        return {
          certificateId: uniqueId,
          name: item.name.trim(),
          date: item.date ? item.date.trim() : new Date().toISOString().split("T")[0],
          event: item.event ? item.event.trim() : "CYPHER AIML Technical Excellence",
          role: item.role ? item.role.trim() : "Certificate of Achievement",
          issuer: "CYPHER — Department of AIML, NCERC",
          issuedAt: new Date().toISOString(),
        };
      });

    if (processedCerts.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid data: all rows were empty or missing names." },
        { status: 400 }
      );
    }

    // Save to DB if connected
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await CertificateModel.insertMany(processedCerts);
      }
    } catch (dbError: unknown) {
      console.warn("MongoDB insert error, saving to local store:", dbError);
    }

    // Always sync with in-memory store
    addLocalCertificates(processedCerts);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully generated ${processedCerts.length} certificate(s).`,
        count: processedCerts.length,
        certificates: processedCerts,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process certificates.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
