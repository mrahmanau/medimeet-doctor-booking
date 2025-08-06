import { NextRequest, NextResponse } from "next/server";

export function checkRole(
  request: NextRequest,
  allowedRoles: string[]
): NextResponse | null {
  const role = request.headers.get("x-user-role");

  if (!role) {
    return NextResponse.json(
      { error: "Unauthorized: Role missing." },
      { status: 403 }
    );
  }

  if (!allowedRoles.includes(role)) {
    return NextResponse.json(
      { error: "Forbidden: You do not have access to this resource." },
      { status: 403 }
    );
  }

  return null;
}
