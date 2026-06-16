import { api } from "./api"; 
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import type { AxiosResponse } from "axios";

function getCookieHeader(): string {
  const cookieStore = cookies();
  return cookieStore.toString();
}

export async function getMeServer(): Promise<User> {
  const { data } = await api.get("/auth/me", {
    headers: { Cookie: getCookieHeader() },
  });
  return data;
}

export async function checkSessionServer(): Promise<AxiosResponse<{ accessToken: string; refreshToken: string }>> {
  const response = await api.get("/auth/session", {
    headers: { Cookie: getCookieHeader() },
  });
  return response; 
}

export async function fetchNotesServer(): Promise<{ notes: Note[] }> {
  const { data } = await api.get("/notes", {
    headers: { Cookie: getCookieHeader() },
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: getCookieHeader() },
  });
  return data;
}
