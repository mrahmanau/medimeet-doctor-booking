import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // 🧩 1. Connect to MongoDB
    await connectDB();

    // 🧩 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("🔍 Checking for existing user with email:", email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    // ⏸️ Stop here for now — next we'll hash password and save the user
    return NextResponse.json(
      { message: "User does not exist yet — ready to create!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
