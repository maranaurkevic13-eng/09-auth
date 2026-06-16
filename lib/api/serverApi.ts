import axios from "axios";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export async function getMe() {
  const res = await serverApi.get("/users/me");
  return res.data;
}
