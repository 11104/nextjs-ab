// 仮でメモリ内に保存する簡易版
let receipts: any[] = [];
let nextId = 1;

export async function getReceipts() {
  return receipts;
}

export async function createReceipt({ storeName, date, items }: any) {
  const total = items.reduce((sum: number, i: any) => sum + Number(i.price || 0), 0);
  const newReceipt = { id: nextId.toString(), storeName, date, items, total };
  receipts.push(newReceipt);
  nextId++;
  return newReceipt;
}