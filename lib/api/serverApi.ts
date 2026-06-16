import axios from "axios";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export async function getMe() {
  const res = await serverApi.get("/users/me");
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

export async function createNote(data: { title: string; content: string; tag?: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}
