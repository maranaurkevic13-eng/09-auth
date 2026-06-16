import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 
  try {
    const { data } = await api.get(`/notes/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Note GET error:", error.response?.data);
      return NextResponse.json(error.response?.data, {
        status: error.response?.status || 500,
      });
    }
    console.error("Note GET unknown error:", error);
    return NextResponse.json({ message: "Failed to fetch note" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 
  try {
    const { data } = await api.delete(`/notes/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Note DELETE error:", error.response?.data);
      return NextResponse.json(error.response?.data, {
        status: error.response?.status || 500,
      });
    }
    console.error("Note DELETE unknown error:", error);
    return NextResponse.json({ message: "Failed to delete note" }, { status: 500 });
  }
}
