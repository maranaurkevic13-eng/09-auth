"use client";

export default function CreateNotePage() {
  return (
    <main>
      <h1>Create Note</h1>
      <form>
        <input type="text" name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content"></textarea>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
