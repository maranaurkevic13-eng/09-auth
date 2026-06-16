export default async function NotesFilteredPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return (
    <main>
      <h1>Filtered Notes</h1>
      <p>Slug: {slug.join("/")}</p>
    </main>
  );
}
