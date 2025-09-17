# nextjs-ab
project-root/
├── pages/
│   ├── index.tsx          # ホーム画面
│   ├── login.tsx          # ログインページ
│   ├── receipts/
│   │   ├── index.tsx      # レシート一覧
│   │   └── [id].tsx       # レシート詳細
│   └── products/
│       └── [id].tsx       # 商品詳細
│
├── pages/api/
│   ├── auth.ts            # 認証API
│   ├── receipts.ts        # レシートAPI
│   └── products.ts        # 商品API
│
├── functions/             # ビジネスロジック
│   ├── auth.ts
│   ├── receipts.ts
│   ├── products.ts
│   └── db.ts
│
├── components/            # UI部品
│   ├── Layout.tsx
│   ├── ReceiptForm.tsx
│   ├── ProductForm.tsx
│   └── ...
│
└── prisma/                # DBスキーマ (Prismaを使う場合)
    └── schema.prisma