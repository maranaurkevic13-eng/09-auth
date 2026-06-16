export default function NotesFilteredPage({ params }: { params: { slug: string[] } }) {
  return (
    <main>
      <h1>Filtered Notes</h1>
      <p>Slug: {params.slug.join("/")}</p>
    </main>
  );
}
