import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export async function fetchNotes(page: number, perPage = 12, search?: string, tag?: string) {
  const res = await api.get("/notes", {
    params: { page, perPage, search, tag },
    headers: { Cookie: cookies().toString() },
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookies().toString() },
  });
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await api.get("/users/me", {
    headers: { Cookie: cookies().toString() },
  });
  return res.data;
}

export async function checkSession(): Promise<User | null> {
  const res = await api.get("/auth/session", {
    headers: { Cookie: cookies().toString() },
  });
  return res.data || null;
}
