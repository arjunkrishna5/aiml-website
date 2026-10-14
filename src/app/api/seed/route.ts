import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FacultyModel } from "@/models/Faculty";
import { PublicationModel } from "@/models/Publication";
import { EventModel } from "@/models/Event";
import { ProjectModel } from "@/models/Project";
import {
  FACULTY_DATA,
  RESEARCH_PAPERS,
  DEPARTMENT_EVENTS,
  PROJECTS_DATA,
} from "@/data/departmentData";

export async function POST() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          message:
            "MongoDB connection unavailable. Add MONGODB_URI to your .env.local file to seed your live database.",
        },
        { status: 503 }
      );
    }

    // Upsert / Seed Faculty
    for (const faculty of FACULTY_DATA) {
      await FacultyModel.findOneAndUpdate({ id: faculty.id }, faculty, {
        upsert: true,
        new: true,
      });
    }

    // Upsert / Seed Research Papers
    for (const paper of RESEARCH_PAPERS) {
      await PublicationModel.findOneAndUpdate({ id: paper.id }, paper, {
        upsert: true,
        new: true,
      });
    }

    // Upsert / Seed Events
    for (const event of DEPARTMENT_EVENTS) {
      await EventModel.findOneAndUpdate({ id: event.id }, event, {
        upsert: true,
        new: true,
      });
    }

    // Upsert / Seed Projects
    for (const project of Object.values(PROJECTS_DATA)) {
      await ProjectModel.findOneAndUpdate({ slug: project.slug }, project, {
        upsert: true,
        new: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with all department collections.",
      counts: {
        faculty: FACULTY_DATA.length,
        publications: RESEARCH_PAPERS.length,
        events: DEPARTMENT_EVENTS.length,
        projects: Object.keys(PROJECTS_DATA).length,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to seed database.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
