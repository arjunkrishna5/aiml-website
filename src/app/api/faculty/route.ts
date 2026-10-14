import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FacultyModel } from "@/models/Faculty";
import { FACULTY_DATA } from "@/data/departmentData";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbFaculty = await FacultyModel.find().lean();
      if (dbFaculty && dbFaculty.length > 0) {
        return NextResponse.json({
          source: "mongodb",
          count: dbFaculty.length,
          data: dbFaculty,
        });
      }
    }
  } catch (error) {
    console.warn("Falling back to local faculty dataset:", error);
  }

  return NextResponse.json({
    source: "hybrid-seed-fallback",
    count: FACULTY_DATA.length,
    data: FACULTY_DATA,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const created = await FacultyModel.create(body);
      return NextResponse.json(
        { success: true, message: "Faculty member added to database.", data: created },
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process request.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
