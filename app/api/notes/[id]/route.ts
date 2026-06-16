import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await api.get(`/notes/${params.id}`);
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Note GET error:", error.response?.data);
      return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
    }
    console.error("Note GET unknown error:", error);
    return NextResponse.json({ message: "Failed to fetch note" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await api.delete(`/notes/${params.id}`);
    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Note DELETE error:", error.response?.data);
      return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
    }
    console.error("Note DELETE unknown error:", error);
    return NextResponse.json({ message: "Failed to delete note" }, { status: 500 });
  }
}
