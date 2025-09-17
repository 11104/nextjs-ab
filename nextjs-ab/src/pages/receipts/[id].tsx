import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  name: string;
  price: string;
  category: string;
}

interface Receipt {
  id: string;
  storeName: string;
  date: string;
  total: number;
  items: Item[];
}

export default function ReceiptDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    if (!id) return;

    const receiptId = Array.isArray(id) ? id[0] : id;

    const fetchReceipt = async () => {
      setReceipt(null); // 前のデータをクリア
      try {
        const res = await fetch(`/api/receipts?id=${receiptId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setReceipt(data); // API から取得した単一オブジェクトをセット
      } catch (err) {
        console.error(err);
        setReceipt(null);
      }
    };

    fetchReceipt();
  }, [id]);

  if (!receipt) return <p className="p-4">読み込み中...</p>;

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">{receipt.storeName}</h1>
      <p className="text-gray-500">{receipt.date}</p>

      <h2 className="text-lg font-semibold">商品明細</h2>
      <ul className="space-y-2">
        {receipt.items.map((i, index) => (
          <li
            key={index}
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