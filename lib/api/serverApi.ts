import { cookies } from "next/headers";
import axios from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await serverApi.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return data;
}

export async function checkSessionServer(): Promise<{ accessToken: string; refreshToken: string }> {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await serverApi.get("/auth/session", {
    headers: { Cookie: cookieHeader },
  });

  return data;
}

export async function getMe(): Promise<User> {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await serverApi.get("/users/me", {
    headers: { Cookie: cookieHeader },
  });

  return data;
}   

export async function fetchNotesServer(
  page: number,
  perPage: number = 10,
  search?: string,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await serverApi.get("/notes", {
    params: { page, perPage, search, tag },
    headers: { Cookie: cookieHeader },
  });

  return data;
}