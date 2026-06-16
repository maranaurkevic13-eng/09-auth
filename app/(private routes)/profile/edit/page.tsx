"use client";
 
import { FormEvent } from "react"; 
import { useRouter } from "next/navigation";   
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
 
export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={user?.email} readOnly />
      <input type="text" name="username" defaultValue={user?.username} required />
      <button type="submit">Save</button>
    </form>
  );
}

