import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "test@example.com",
    username: "Marianna",
    avatar: "/default-avatar.png",
  });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "Profile updated", user: body });
}
