import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PublicationModel } from "@/models/Publication";
import { RESEARCH_PAPERS } from "@/data/departmentData";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbPapers = await PublicationModel.find().lean();
      if (dbPapers && dbPapers.length > 0) {
        return NextResponse.json({
          source: "mongodb",
          count: dbPapers.length,
          data: dbPapers,
        });
      }
    }
  } catch (error) {
    console.warn("Falling back to local research dataset:", error);
  }

  return NextResponse.json({
    source: "hybrid-seed-fallback",
    count: RESEARCH_PAPERS.length,
    data: RESEARCH_PAPERS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const created = await PublicationModel.create(body);
      return NextResponse.json(
        { success: true, message: "Research paper indexed in database.", data: created },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Simulated index: Running in hybrid mode without live MONGODB_URI.",
        data: body,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process request.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
