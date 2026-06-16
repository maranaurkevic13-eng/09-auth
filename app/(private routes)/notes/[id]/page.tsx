export default async function NotePage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Note {params.id}</h1>
      <p>Content of the note...</p>
    </main>
  );
}
