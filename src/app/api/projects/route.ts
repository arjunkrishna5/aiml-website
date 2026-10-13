import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/models/Project";
import { PROJECTS_DATA } from "@/data/departmentData";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbProjects = await ProjectModel.find().lean();
      if (dbProjects && dbProjects.length > 0) {
        return NextResponse.json({
          source: "mongodb",
          count: dbProjects.length,
          data: dbProjects,
        });
      }
    }
  } catch (error) {
    console.warn("Falling back to local projects dataset:", error);
  }

  const projectArray = Object.values(PROJECTS_DATA);

  return NextResponse.json({
    source: "hybrid-seed-fallback",
    count: projectArray.length,
    data: projectArray,
  });
}
