import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
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

    // 3️⃣ Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return success
    return NextResponse.json(
      {
        message: "User created successfully!",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
