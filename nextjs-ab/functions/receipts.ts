// functions/receipts.ts

export interface Item {
  name: string;
  price: string;
  category: string;
}

export interface Receipt {
  id: string;
  storeName: string;
  date: string;
  total: number;
  items: Item[];
}

let receipts: Receipt[] = [];
let nextId = 1;

// 全件取得
export async function getReceipts(): Promise<Receipt[]> {
  return receipts;
}

// ID指定取得
export async function getReceiptById(id: string): Promise<Receipt | null> {
  return receipts.find(r => r.id === id) || null;
}

// 新規作成
export async function createReceipt({ storeName, date, items }: { storeName: string; date: string; items: Item[] }): Promise<Receipt> {
  const total = items.reduce((sum, i) => sum + Number(i.price || 0), 0);
  const newReceipt: Receipt = { id: nextId.toString(), storeName, date, items, total };
  receipts.push(newReceipt);
  nextId++;
  return newReceipt;
}