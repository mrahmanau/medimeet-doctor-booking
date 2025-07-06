import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env.local");
}

export async function authenticate(request: NextRequest) {
  try {
    // Extract the Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized. Token missing" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    // Attach user info to request (optional: you can pass it through URL or use cookies later)
    request.headers.set("x-user-id", decoded.id);
    request.headers.set("x-user-email", decoded.email);
    request.headers.set("x-user-role", decoded.role);

    // Success — no error response means the route can proceed
    return null;
  } catch (error) {
    console.error("❌ Invalid or expired token:", error);
    return NextResponse.json(
      { error: "Unauthorized. Invalid or expired token." },
      { status: 401 }
    );
  }
}
