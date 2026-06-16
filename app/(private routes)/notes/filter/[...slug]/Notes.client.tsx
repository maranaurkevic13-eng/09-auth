"use client";

export default function Notes({ notes }: { notes: { id: string; title: string }[] }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}
