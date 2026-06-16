import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json([{ id: 1, title: "First note", content: "Hello" }]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: "Note created", note: body });
}
