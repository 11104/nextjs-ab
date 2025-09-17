import type { NextApiRequest, NextApiResponse } from 'next';
import { createReceipt, getReceipts, getReceiptById, Receipt } from '../../../functions/receipts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      if (id) {
        const receipt = await getReceiptById(Array.isArray(id) ? id[0] : id);
        return res.status(200).json(receipt);
      } else {
        const allReceipts = await getReceipts();
        return res.status(200).json(allReceipts);
      }
    }

    if (req.method === 'POST') {
      const { storeName, date, items } = req.body;
      if (!storeName || !date || !items) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const receipt: Receipt = await createReceipt({ storeName, date, items });
      return res.status(201).json(receipt);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}