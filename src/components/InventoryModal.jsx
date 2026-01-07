import { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  { value: "wood", label: "wood" },
  { value: "brain", label: "brain" },
  { value: "plush", label: "plush" },
];

function validate({ id, name, price, stock }) {
  const errors = {};
  if (!id.trim()) errors.id = "SKUは必須です";
  if (!name.trim()) errors.name = "名前は必須です";

  const p = Number(price);
  const s = Number(stock);

  if (Number.isNaN(p) || p < 0) errors.price = "価格は0以上の数値";
  if (Number.isNaN(s) || s < 0) errors.stock = "在庫は0以上の数値";

  return errors;
}

export default function InventoryModal({
  open,
  mode, // "create" | "edit"
  initialItem,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState(() => ({
    id: initialItem?.id ?? "",
    name: initialItem?.name ?? "",
    category: initialItem?.category ?? "wood",
    price: initialItem?.price ?? 0,
    stock: initialItem?.stock ?? 0,
  }));

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      id: initialItem?.id ?? "",
      name: initialItem?.name ?? "",
      category: initialItem?.category ?? "wood",
      price: initialItem?.price ?? 0,
      stock: initialItem?.stock ?? 0,
    });
    setTouched(false);
  }, [open, initialItem]);

  const errors = useMemo(() => validate(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b p-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {isEdit ? "Edit Item" : "Add Item"}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {isEdit ? "在庫情報を更新します" : "新しい商品を追加します"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">SKU</label>
              <input
                value={form.id}
                disabled={isEdit}
                onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                onBlur={() => setTouched(true)}
                className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${
                  isEdit ? "bg-gray-50 text-gray-500" : "bg-white"
                }`}
                placeholder="SKU-004"
              />
              {touched && errors.id && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.id}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              onBlur={() => setTouched(true)}
              className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
              placeholder="Wooden Train"
            />
            {touched && errors.name && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                onBlur={() => setTouched(true)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
                min={0}
              />
              {touched && errors.price && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                onBlur={() => setTouched(true)}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
                min={0}
              />
              {touched && errors.stock && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.stock}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t p-5">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              setTouched(true);
              if (hasErrors) return;
              onSubmit({
                id: form.id.trim(),
                name: form.name.trim(),
                category: form.category,
                price: Number(form.price),
                stock: Number(form.stock),
              });
            }}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
          >
            {isEdit ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
