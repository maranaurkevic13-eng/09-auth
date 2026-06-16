"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import type { Note } from "@/types/note";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { data } = useQuery<{ notes: Note[]; totalPages: number }>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, 10, debouncedSearch, tag),
    placeholderData: (prev) => prev,
  });

  return (
    <div>
      <SearchBox value={search} onSearch={setSearch} />
      <Link href="/notes/action/create">Create Note</Link>
      {data?.notes && <NoteList notes={data.notes} />}
      <Pagination
        currentPage={page}
        pageCount={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
