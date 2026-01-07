import { can, PermissionError } from "../auth/permissions";

const KEY = "toy-ec-inventory";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function load() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export async function seedIfEmpty(seed) {
  const existing = load();
  if (!existing || existing.length === 0) {
    save(seed);
  }
}

export async function listInventory() {
  await sleep(200);
  return load() ?? [];
}

export async function deleteItem(role, id) {
  await sleep(200);
  if (!can(role, "delete")) throw new PermissionError();

  const items = load() ?? [];
  const next = items.filter((it) => it.id !== id);
  save(next);
  return next;
}

export async function createItem(role, item) {
  await sleep(200);
  if (!can(role, "create")) throw new PermissionError();

  const items = load() ?? [];

  // id(SKU)の重複チェック（実務感）
  if (items.some((it) => it.id === item.id)) {
    throw new Error("DUPLICATE_SKU");
  }

  const next = [item, ...items];
  save(next);
  return next;
}

export async function updateItem(role, id, patch) {
  await sleep(200);
  if (!can(role, "update")) throw new PermissionError();

  const items = load() ?? [];
  const next = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
  save(next);
  return next;
}
