export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main>
      <h1>Note {id}</h1>
      <p>Content of the note...</p>
    </main>
  );
}
