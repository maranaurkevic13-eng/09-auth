import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST() {
  try {
    const { data } = await api.post("/auth/logout");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 400 });
  }
}
