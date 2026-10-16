import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getLocalEvents, addLocalEvent, removeLocalEvent } from "@/lib/eventStore";
import { DepartmentEvent } from "@/data/departmentData";

export async function GET() {
  try {
    const { data: supaEvents, error } = await supabaseAdmin
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && supaEvents && supaEvents.length > 0) {
      const mapped = supaEvents.map((e) => ({
        id: e.id,
        title: e.title,
        tagline: e.tagline || "",
        date: e.event_date || "",
        category: e.category || "Hackathon",
        venue: e.venue || "NCERC Campus",
        status: e.status || "Upcoming",
        registrationLink: e.registration_link || "",
        prizePool: e.prize_pool || "",
        description: e.description || "",
      }));

      return NextResponse.json({
        source: "supabase",
        count: mapped.length,
        data: mapped,
      });
    }
  } catch (error) {
    console.warn("Supabase lookup fallback to local events:", error);
  }

  const localList = getLocalEvents();
  return NextResponse.json({
    source: "local-cache",
    count: localList.length,
    data: localList,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.date) {
      return NextResponse.json(
        { success: false, error: "Event title and date are required." },
        { status: 400 }
      );
    }

    const eventId = body.id || `event-${Date.now()}`;
    const newEvent: DepartmentEvent = {
      id: eventId,
      title: body.title,
      tagline: body.tagline || "",
      date: body.date,
      status: body.status || "upcoming",
      category: body.category || "Hackathon",
      venue: body.venue || "Aryabhatta Central Computing Block, NCERC",
      registrationOpen: body.registrationOpen ?? true,
      attendees: body.attendees || "250+ Engineers",
      description: body.description || "",
      prizePool: body.prizePool || "",
      registrationLink: body.registrationLink || "",
    };

    // Save to Supabase
    try {
      await supabaseAdmin.from("events").upsert({
        id: newEvent.id,
        title: newEvent.title,
        tagline: newEvent.tagline,
        event_date: newEvent.date,
        category: newEvent.category,
        venue: newEvent.venue,
        status: newEvent.status,
        registration_link: newEvent.registrationLink,
        prize_pool: newEvent.prizePool,
        description: newEvent.description,
      });
    } catch (err) {
      console.warn("Could not insert event into Supabase, saving locally:", err);
    }

    addLocalEvent(newEvent);

    return NextResponse.json({
      success: true,
      data: newEvent,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing event ID." }, { status: 400 });
    }

    try {
      await supabaseAdmin.from("events").delete().eq("id", id);
    } catch (err) {
      console.warn("Could not delete from Supabase:", err);
    }

    removeLocalEvent(id);

    return NextResponse.json({ success: true, message: "Event removed." });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
