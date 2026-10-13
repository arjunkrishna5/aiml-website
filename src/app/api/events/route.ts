import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { EventModel } from "@/models/Event";
import { DEPARTMENT_EVENTS } from "@/data/departmentData";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbEvents = await EventModel.find().lean();
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

  return NextResponse.json({
    source: "hybrid-seed-fallback",
    count: DEPARTMENT_EVENTS.length,
    data: DEPARTMENT_EVENTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const created = await EventModel.create(body);
      return NextResponse.json(
        { success: true, message: "Department event published in database.", data: created },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Simulated creation: Running in hybrid mode without live MONGODB_URI.",
        data: body,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request." },
      { status: 400 }
    );
  }
}
