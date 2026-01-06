import { useEffect, useMemo, useState } from "react";
import { seedIfEmpty, listInventory, deleteItem } from "../services/inventoryApi";
import { PermissionError } from "../auth/permissions";

const ROLES = ["admin", "staff", "viewer"];

const seed = [
  { id: "SKU-001", name: "Wooden Train", category: "wood", price: 3200, stock: 12 },
  { id: "SKU-002", name: "Puzzle Toy", category: "brain", price: 1800, stock: 3 },
  { id: "SKU-003", name: "Building Blocks", category: "wood", price: 2500, stock: 0 },
];

function Admin() {
  const [role, setRole] = useState("admin");
  const [itemsSource, setItemsSource] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  (async () => {
    await seedIfEmpty(seed);
    const data = await listInventory();
    setItemsSource(data);
    setLoading(false);
  })();
}, []);

  const [query, setQuery] = useState("");
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  const canCreate = role === "admin" || role === "staff";
  const canEdit = role === "admin" || role === "staff";
  const canDelete = role === "admin";

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return itemSource
      .filter((i) =>
        q ? `${i.id} ${i.name}`.toLowerCase().includes(q) : true
      )
      .filter((i) => (onlyLowStock ? i.stock > 0 && i.stock <= 3 : true));
  }, [query, onlyLowStock]);

  const badge = (r) => {
    if (r === "admin") return "bg-gray-900 text-white";
    if (r === "staff") return "bg-gray-100 text-gray-900";
    return "bg-white text-gray-700 border";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Admin</h1>
          <p className="mt-1 text-sm text-gray-600">
            ロールごとに操作権限が変わる管理画面デモ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(role)}`}>
            role: {role}
          </span>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold text-gray-900"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            disabled={!canCreate}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              canCreate
                ? "bg-gray-900 text-white hover:bg-black"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => alert("次のステップで追加モーダルを実装します")}
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by SKU or name..."
            className="w-full rounded-xl border bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 sm:max-w-md"
          />

          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={onlyLowStock}
              onChange={(e) => setOnlyLowStock(e.target.checked)}
              className="h-4 w-4"
            />
            Low stock（1〜3）
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const status =
                  i.stock === 0
                    ? { label: "Out", cls: "bg-red-50 text-red-700" }
                    : i.stock <= 3
                    ? { label: "Low", cls: "bg-yellow-50 text-yellow-800" }
                    : { label: "OK", cls: "bg-green-50 text-green-800" };

                return (
                  <tr key={i.id} className="border-t">
                    <td className="px-4 py-3 font-semibold text-gray-900">{i.id}</td>
                    <td className="px-4 py-3 text-gray-900">{i.name}</td>
                    <td className="px-4 py-3 text-gray-700">{i.category}</td>
                    <td className="px-4 py-3 text-gray-900">¥{i.price.toLocaleString("ja-JP")}</td>
                    <td className="px-4 py-3 text-gray-900">{i.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.cls}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          disabled={!canEdit}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            canEdit
                              ? "text-gray-900 hover:bg-gray-50"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                          onClick={() => alert("次のステップで編集モーダルを実装します")}
                        >
                          Edit
                        </button>

                        <button
                          disabled={!canDelete}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            canDelete
                              ? "text-gray-900 hover:bg-gray-50"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                          onClick={async () => {
                            setError("");
                            try {
                              const next = await deleteItem(role, i.id);
                              setItemsSource(next);
                            } catch (e) {
                              if (e instanceof PermissionError) {
                                setError("権限がありません（Deleteはadminのみ）");
                              } else {
                                setError("削除に失敗しました");
                              }
                            }
                          }}
                          
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-4 py-3 text-xs text-gray-600">
          権限：Admin=CRUD / Staff=追加・編集 / Viewer=閲覧のみ
        </div>
      </div>
    </div>
  );
}

export default Admin;
