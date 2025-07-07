import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/middlewares/authMiddleware";
import { checkRole } from "@/middlewares/roleGuard";

export async function GET(request: NextRequest) {
  console.log("🔔 API /api/doctor/dashboard called"); // Log entry to route

  // 🛡️ Step 1: Check JWT token
  const authResult = await authenticate(request);
  if (authResult) {
    console.log("⛔ Authentication failed or missing");
    return authResult;
  }
  console.log("✅ Authentication passed");

  // 🛡️ Step 2: Check if user is a doctor
  const roleCheck = checkRole(request, ["doctor"]);
  if (roleCheck) {
    console.log("⛔ Role check failed");
    return roleCheck;
  }
  console.log("✅ Role check passed");

  // ✅ Step 3: If passed both, return the dashboard
  console.log("🚀 Sending dashboard response");
  return NextResponse.json({
    message: "Welcome Doctor! This is your dashboard.",
  });
}
