import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReceiptListPage() {
  const [receipts, setReceipts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/receipts")
      .then((res) => res.json())
      .then(setReceipts);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">レシート一覧</h1>
      {receipts.map((r) => (
        <Link key={r.id} href={`/receipts/${r.id}`}>
          <div className="p-3 bg-white shadow rounded-lg hover:bg-gray-50 cursor-pointer">
            <p>
              {r.date} - {r.store}
            </p>
            <p className="font-semibold">合計: {r.total}円</p>
          </div>
        </Link>
      ))}
    </div>
  );
}