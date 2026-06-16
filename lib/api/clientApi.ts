import axios from "axios";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export async function checkSession() {
  const res = await clientApi.get("/auth/session");
  return res.data;
}

export async function getMe() {
  const res = await clientApi.get("/users/me");
  return res.data;
}

export async function register(data: { email: string; password: string }) {
  const res = await clientApi.post("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await clientApi.post("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await clientApi.post("/auth/logout");
  return res.data;
}
