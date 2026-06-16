import { fetchNotesServer } from "@/lib/api/serverApi";   
import NoteList from "@/components/NoteList/NoteList";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug?.[0] ?? "all";

  return {
    title: `Notes filtered by ${currentTag} | NoteHub`,
    description: `Browse notes tagged with ${currentTag}`,
  };
}

export default async function FilteredNotesPage({
}: {
  params: Promise<{ slug: string[] }>;
}) {   

  const { notes } = await fetchNotesServer();

  return <NoteList notes={notes} />;
}


