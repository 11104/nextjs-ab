import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReceiptDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/receipts?id=${id}`)
        .then((res) => res.json())
        .then(setReceipt);
    }
  }, [id]);

  if (!receipt) return <p>読み込み中...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">{receipt.store}</h1>
      <p className="text-gray-500">{receipt.date}</p>

      <ul className="space-y-2">
        {receipt.items.map((i: any) => (
          <li
            key={i.id}
            className="flex justify-between bg-white p-3 rounded-lg shadow"
          >
            <span>
              {i.name} <span className="text-sm text-gray-400">({i.category})</span>
            </span>
            <span className="font-semibold">{i.price}円</span>
          </li>
        ))}
      </ul>

      <p className="text-right font-bold text-lg">合計: {receipt.total}円</p>
    </div>
  );
}