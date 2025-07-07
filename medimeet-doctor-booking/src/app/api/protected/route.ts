import { NextResponse } from "next/server";
import { authenticate } from "@/middlewares/authMiddleware";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authResponse = await authenticate(request);
  if (authResponse) return authResponse;

  return NextResponse.json({
    message: "You are authorized to access this protected route.",
  });
}
