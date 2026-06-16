import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "test@example.com",
    username: "Marianna",
    avatar: "/default-avatar.png",
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: "Profile updated", user: body });
}
