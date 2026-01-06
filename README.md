# Toy Store EC (React) - Portfolio Project

実店舗（おもちゃ店）のECサイト制作経験をもとに、Reactで再構築したポートフォリオ用デモECアプリです。  
「商品一覧 → 詳細 → カート操作」までの基本導線と、状態管理・永続化を含むECのコア機能を実装しています。

> ※ 実案件は業務上の理由で非公開のため、同様の要件を想定して再現したデモプロジェクトです。

---

## Demo / Screenshot
- Demo: https://toy-ec.vercel.app/
- Screenshot: 

---

## Features（実装機能）
- 商品一覧表示（データを配列管理し `map` で描画）
- 商品詳細ページ（URLパラメータ `:id` で表示切替）
- カート機能
  - 追加（同一商品は数量 +1）
  - 数量増減（+ / -）
  - 商品削除
  - カートを空にする
- 合計金額 / 合計点数の表示
- localStorage によるカート永続化（リロードしても状態保持）

---

## Admin Dashboard（業務UIデモ）
- 在庫管理CRUD（作成/更新/削除）
- ロール別権限（Admin/Staff/Viewer）
- 検索・Low stock フィルタ
- ステータス表示（OK / Low / Out）
- 実務想定の管理画面をECと同一アプリで構築
※ Admin画面はデモ用です。認証・権限はUI制御で再現しています。

---

## Tech Stack（使用技術）
- React
- Vite
- JavaScript (ES6)
- React Router
- Context API（状態管理）
- localStorage（永続化）

---

## Architecture / Design（設計ポイント）
### 1. 状態管理（Context API）
カート状態を `CartContext` に集約し、ページを跨いでも同じ状態を参照できる構成にしています。  
props のバケツリレーを避け、`useCart()` で必要なコンポーネントから利用できるようにしました。

### 2. データ分離
商品データを `src/data/products.js` に分離し、将来的にAPI連携に差し替えやすい形にしています。

### 3. ルーティング設計
ECの基本導線に沿ってURLを設計しています。
- `/products`：商品一覧
- `/products/:id`：商品詳細
- `/cart`：カート

### 4. 永続化（localStorage）
カート状態は `useEffect` で localStorage に同期し、リロードしても状態を復元するようにしています。

---

## Folder Structure
```txt
src/
  components/
    Header.jsx
  context/
    CartContext.jsx
  data/
    products.js
  pages/
    Home.jsx
    Products.jsx
    ProductDetail.jsx
    Cart.jsx
