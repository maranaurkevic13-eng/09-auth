"use client";

import Link from "next/link";

export default function AuthNavigation() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
      <Link href="/logout">Logout</Link>
    </nav>
  );
}
