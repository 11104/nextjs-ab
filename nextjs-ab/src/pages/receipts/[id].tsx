import { useRouter } from "next/router";

export default function ReceiptDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      <h1>レシート詳細ページ</h1>
      <p>レシートID: {id}</p>
      <p>ここに後で商品明細を表示します。</p>
    </div>
  );
}