import { fetchNotesServer } from "@/lib/api/serverApi";       
import type { Metadata } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

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
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const currentTag = slug?.[0] ?? "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", currentTag],
    queryFn: () => fetchNotesServer(currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}
