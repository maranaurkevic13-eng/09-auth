"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "./EditProfile.module.css";
import Image from "next/image";

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;

    try {
      const updated = await updateMe({ username });
      setUser(updated);
      router.push("/profile");
    } catch {
      alert("Update failed");
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || "/default-avatar.png"} 
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button type="button" className={css.cancelButton} onClick={() => router.push("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
