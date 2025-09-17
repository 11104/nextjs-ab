import { useState } from "react";
import { useRouter } from "next/router";

interface Item {
  name: string;
  price: string;
  category: string;
}

export default function ReceiptNewPage() {
  const router = useRouter();

  // レシート基本情報
  const [storeName, setStoreName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // 商品明細
  const [items, setItems] = useState<Item[]>([{ name: "", price: "", category: "" }]);

  // 商品追加
  const addItem = () => setItems([...items, { name: "", price: "", category: "" }]);

  // 商品更新
  const updateItem = (index: number, key: keyof Item, value: string) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  // 削除
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems.length ? newItems : [{ name: "", price: "", category: "" }]);
  };

  // 保存（API POST）
  const handleSave = async () => {
    try {
      const res = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeName, date, items }),
      });

      if (!res.ok) throw new Error("保存に失敗しました");

      const saved = await res.json();
      console.log("保存成功:", saved);
      router.push("/receipts");
    } catch (err) {
      console.error(err);
      alert("保存に失敗しました。コンソールを確認してください。");
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">新規レシート作成</h1>

      {/* レシート基本情報 */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium">日付</span>
          <input
            type="date"
            className="w-full border p-2 rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">店舗名</span>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </label>
      </div>

      {/* 商品明細 */}
      <h2 className="text-lg font-semibold">商品一覧</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex space-x-2 bg-gray-50 p-3 rounded-lg shadow items-center"
          >
            <input
              type="text"
              placeholder="商品名"
              className="flex-1 border p-2 rounded-lg"
              value={item.name}
              onChange={(e) => updateItem(idx, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="金額"
              className="w-24 border p-2 rounded-lg"
              value={item.price}
              onChange={(e) => updateItem(idx, "price", e.target.value)}
            />
            <input
              type="text"
              placeholder="カテゴリ"
              className="w-28 border p-2 rounded-lg"
              value={item.category}
              onChange={(e) => updateItem(idx, "category", e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => removeItem(idx)}
            >
              削除
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        onClick={addItem}
      >
        + 商品追加
      </button>

      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={handleSave}
      >
        保存
      </button>
    </div>
  );
}