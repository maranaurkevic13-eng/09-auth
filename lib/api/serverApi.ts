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

