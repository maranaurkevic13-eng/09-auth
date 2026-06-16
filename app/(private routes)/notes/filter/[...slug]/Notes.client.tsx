"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

export default function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);


  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); 
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, 10, search, tag),
    placeholderData: keepPreviousData,
  });    

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes</p>;

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main>
      <div className="notes-header">
        <SearchBox value={search} onSearch={debouncedSearch} />
        <Link href="/notes/action/create">Create Note</Link>
      </div>

      <NoteList notes={notes} />

      {notes.length > 0 && (
        <Pagination
          currentPage={page}
          pageCount={totalPages}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}
