import type { NextApiRequest, NextApiResponse } from "next";
import { createReceipt, getReceipts } from "../../../functions/receipts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const receipts = await getReceipts(); // DBから一覧取得
      return res.status(200).json(receipts);
    }

    if (req.method === "POST") {
      const { storeName, date, items } = req.body;
      if (!storeName || !date || !items) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const receipt = await createReceipt({ storeName, date, items });
      return res.status(201).json(receipt);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}