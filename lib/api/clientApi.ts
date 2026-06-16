import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

// --- Auth ---
export async function register(data: { email: string; password: string }): Promise<User> {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }): Promise<User> {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const res = await api.get("/auth/session");
  return res.data || null;
}

export async function getMe(): Promise<User> {
  const res = await api.get("/users/me");
  return res.data;
}

export async function updateMe(data: Partial<User>): Promise<User> {
  const res = await api.patch("/users/me", data);
  return res.data;
}

// --- Notes ---
export async function fetchNotes(page: number, perPage = 12, search?: string, tag?: string) {
  const res = await api.get("/notes", { params: { page, perPage, search, tag } });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(values: { title: string; content: string; tag: string }): Promise<Note> {
  const res = await api.post("/notes", values);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
