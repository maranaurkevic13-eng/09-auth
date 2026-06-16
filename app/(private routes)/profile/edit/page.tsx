"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
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
    <main>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
          />
        </div>
        <label>
          Email:
          <input type="email" value={user?.email} readOnly />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            defaultValue={user?.username}
            required
          />
        </label>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => router.push("/profile")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}


