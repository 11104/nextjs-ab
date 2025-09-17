import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Receipt {
  id: string;
  storeName: string;
  date: string;
  total: number;
  items: Item[];
}

export default function ReceiptListPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await fetch("/api/receipts");
        if (!res.ok) throw new Error("Failed to fetch receipts");
        const data = await res.json();
        setReceipts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) return <p className="p-4">読み込み中...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">レシート一覧</h1>
        <Link
          href="/receipts/new"
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          + 新規レシート
        </Link>
      </div>

      {receipts.length === 0 ? (
        <p>レシートがありません。</p>
      ) : (
        receipts.map((r) => (
          <Link key={r.id} href={`/receipts/${r.id}`}>
            <div className="p-3 bg-white shadow rounded-lg hover:bg-gray-50 cursor-pointer">
              <p>
                {r.date} - {r.storeName}
              </p>
              <p className="font-semibold">合計: {r.total}円</p>
              <p className="text-sm text-gray-500">
                商品数: {r.items.length}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}