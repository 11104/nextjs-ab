import type { NextApiRequest, NextApiResponse } from "next";

// ダミーデータ
const dummyReceipts = [
  {
    id: "1",
    store: "スーパーA",
    date: "2025-09-10",
    total: 530,
    items: [
      { id: "1", name: "牛乳", price: 180, category: "飲料" },
      { id: "2", name: "卵", price: 200, category: "食品" },
      { id: "3", name: "パン", price: 150, category: "食品" },
    ],
  },
  {
    id: "2",
    store: "コンビニB",
    date: "2025-09-11",
    total: 350,
    items: [
      { id: "1", name: "コーヒー", price: 200, category: "飲料" },
      { id: "2", name: "サンドイッチ", price: 150, category: "食品" },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      // 詳細取得
      const receipt = dummyReceipts.find((r) => r.id === id);
      if (receipt) res.status(200).json(receipt);
      else res.status(404).json({ error: "Receipt not found" });
    } else {
      // 一覧取得
      res.status(200).json(dummyReceipts);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}