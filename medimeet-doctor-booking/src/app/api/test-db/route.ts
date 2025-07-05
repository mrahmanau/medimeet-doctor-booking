// src/app/api/test-db/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";

/**
 * GET /api/test-db
 * This route connects to MongoDB and returns a success message.
 */
export async function GET() {
  try {
    await connectDB(); // Try to connect to MongoDB
    return NextResponse.json({ message: "✅ MongoDB connected successfully!" });
  } catch (error) {
    console.error("❌ Connection failed:", error);
    return NextResponse.json(
      { error: "❌ MongoDB connection failed!" },
      { status: 500 }
    );
  }
}
