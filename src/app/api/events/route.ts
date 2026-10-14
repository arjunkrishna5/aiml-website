import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { EventModel } from "@/models/Event";
import { getLocalEvents, addLocalEvent, removeLocalEvent } from "@/lib/eventStore";
import { DepartmentEvent } from "@/data/departmentData";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbEvents = await EventModel.find().sort({ createdAt: -1 }).lean();
      if (dbEvents && dbEvents.length > 0) {
        return NextResponse.json({
          source: "mongodb",
          count: dbEvents.length,
          data: dbEvents,
        });
      }
    }
  } catch (error) {
    console.warn("Falling back to local events dataset:", error);
  }

  const localList = getLocalEvents();
  return NextResponse.json({
    source: "hybrid-seed-fallback",
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
      title: body.title.trim(),
      tagline: body.tagline ? body.tagline.trim() : "CYPHER AIML Department Event",
      date: body.date.trim(),
      status: body.status || "upcoming",
      category: body.category || "Hackathon",
      venue: body.venue ? body.venue.trim() : "NCERC Campus, Pampady",
      registrationOpen: typeof body.registrationOpen === "boolean" ? body.registrationOpen : true,
      prizePool: body.prizePool ? body.prizePool.trim() : undefined,
      attendees: body.attendees ? body.attendees.trim() : undefined,
      winners: body.winners ? body.winners.trim() : undefined,
      description: body.description ? body.description.trim() : body.title,
    };

    // Save to DB if available
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await EventModel.create(newEvent);
      }
    } catch (dbError) {
      console.warn("MongoDB create event fallback to local store:", dbError);
    }

    // Always store in runtime store
    addLocalEvent(newEvent);

    return NextResponse.json(
      { success: true, message: "Department event published successfully.", data: newEvent },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process request.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Event ID is required." }, { status: 400 });
    }

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await EventModel.findOneAndDelete({ id });
      }
    } catch (dbErr) {
      console.warn("MongoDB delete fallback to local store:", dbErr);
    }

    removeLocalEvent(id);

    return NextResponse.json({ success: true, message: `Event ${id} removed.` });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete event.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
