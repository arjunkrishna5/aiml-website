import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  const startTime = Date.now();
  const conn = await connectToDatabase();
  const latency = Date.now() - startTime;

  const isConnected = !!conn && mongoose.connection.readyState === 1;

  return NextResponse.json({
    status: "online",
    engine: "Next.js 16 App Router Route Handlers",
    database: {
      provider: "MongoDB",
      status: isConnected ? "connected" : "fallback-hybrid-mode",
      readyState: mongoose.connection.readyState,
      latencyMs: latency,
      message: isConnected
        ? "Connected to MongoDB Atlas cluster."
        : "Running in Zero-Downtime Hybrid Mode (Seed data fallback active). Provide MONGODB_URI in .env.local to enable live database syncing.",
    },
    collections: ["faculties", "publications", "events", "projects"],
    timestamp: new Date().toISOString(),
  });
}
