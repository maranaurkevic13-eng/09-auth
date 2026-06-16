import axios from "axios";     
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export async function checkSessionServer(
  cookieHeader?: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const { data } = await serverApi.get("/auth/session", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  return data;
}

export async function getMe(cookieHeader?: string): Promise<User> {
  const { data } = await serverApi.get("/users/me", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  return data;
}

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function fetchNoteByIdServer(id: string, cookieHeader?: string): Promise<Note> {
  const { data } = await serverApi.get(`/notes/${id}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });        
  return data;
}

export async function fetchNotesServer(
  page: number,
  perPage: number = 10,
  search?: string,
  tag?: string,
  cookieHeader?: string
) {
  const { data } = await serverApi.get("/notes", {
    params: { page, perPage, search, tag },
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });       
  return data;
}
