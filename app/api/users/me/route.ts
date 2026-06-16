import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const { data } = await api.get("/users/me");
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Users GET error:", error.response?.data);
      return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
    }
    console.error("Users GET unknown error:", error);
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { data } = await api.patch("/users/me", body);
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Users PATCH error:", error.response?.data);
      return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
    }
    console.error("Users PATCH unknown error:", error);
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}

