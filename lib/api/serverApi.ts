export async function fetchNoteByIdServer(id: string) {   
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
} 
