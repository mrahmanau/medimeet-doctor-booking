//src/app/api/auth/login/route.ts
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET not defined in .env.local");
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create the JWT payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Sign JWT
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Return token and basic user info
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
