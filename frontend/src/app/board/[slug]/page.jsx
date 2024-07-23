import BoardDetail from "@/components/BoardDetail";

export default function BoardPage({ params }) {
  return (
    <div>
      <BoardDetail slug={params.slug} />
    </div>
  );
}
