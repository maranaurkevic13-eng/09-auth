import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = await api.post("/auth/login", body);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 400 });
  }
}
