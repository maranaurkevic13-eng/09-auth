"use client";
import type { NoteTag } from "@/types/note";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";    
import { createNote } from "@/lib/api/clientApi"; 
import { useDraftStore } from "@/lib/store/noteStore";
import type { Note } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();   
  const { draft, setDraft, clearDraft } = useDraftStore();

  const createMutation = useMutation({
    mutationFn: (values: Omit<Note, "id" | "createdAt" | "updatedAt">) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={draft.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDraft({ ...draft, title: e.target.value })
        }
        required
      />
      <textarea
        name="content"
        value={draft.content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDraft({ ...draft, content: e.target.value })
        }
        required
      />
      <select
  name="tag"
  value={draft.tag}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    setDraft({ ...draft, tag: e.target.value as NoteTag })
  }
>
  <option value="Work">Work</option>
  <option value="Personal">Personal</option>
  <option value="Meeting">Meeting</option>
  <option value="Shopping">Shopping</option>
</select>
      <button type="submit">Save</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}
          