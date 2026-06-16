import { NextResponse } from "next/server";
import { api } from "../../api";

export async function GET() {
  try {
    const { data } = await api.get("/auth/session");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ message: "Session check failed" }, { status: 400 });
  }
}
