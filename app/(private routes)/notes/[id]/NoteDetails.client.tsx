"use client";

export default function NoteDetails({ note }: { note: { id: string; title: string; content: string } }) {
  return (
    <section>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </section>
  );
}
