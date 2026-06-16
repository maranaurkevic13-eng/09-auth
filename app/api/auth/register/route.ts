import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = await api.post("/auth/register", body);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Registration failed" }, { status: 400 });
  }
}
