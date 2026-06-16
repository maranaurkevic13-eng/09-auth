import { NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const { data } = await api.get("/notes");
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Notes GET error:", error.response?.data);
      return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
    }
    console.error("Notes GET unknown error:", error);
    return NextResponse.json({ message: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = await api.post("/notes", body);
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Notes POST error:", error.response?.data);
      return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
    }
    console.error("Notes POST unknown error:", error);
    return NextResponse.json({ message: "Failed to create note" }, { status: 500 });
  }
}
