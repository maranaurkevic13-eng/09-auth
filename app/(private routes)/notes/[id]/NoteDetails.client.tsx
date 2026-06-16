"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError) return <p>Failed to load note.</p>;
  if (!data) return <p>No note found.</p>;

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: {data.tag}</p>
      <p>Created: {new Date(data.createdAt).toLocaleString()}</p>
    </article>
  );
}
