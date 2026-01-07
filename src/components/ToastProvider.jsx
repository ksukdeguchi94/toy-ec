import { createContext, useContext, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

function typeStyles(type) {
  switch (type) {
    case "success":
      return "border-green-200 bg-green-50 text-green-900";
    case "error":
      return "border-red-200 bg-red-50 text-red-900";
    case "warning":
      return "border-yellow-200 bg-yellow-50 text-yellow-900";
    default:
      return "border-gray-200 bg-white text-gray-900";
  }
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const remove = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  };

  const push = (toast) => {
    const id = crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
    const t = {
      id,
      type: toast.type ?? "info",
      title: toast.title ?? "",
      message: toast.message ?? "",
      duration: toast.duration ?? 2200,
    };

    setToasts((prev) => [t, ...prev].slice(0, 5)); // 最大5件

    const timer = setTimeout(() => remove(id), t.duration);
    timersRef.current.set(id, timer);
  };

  const api = useMemo(
    () => ({
      push,
      success: (message, opts = {}) =>
        push({ type: "success", message, ...opts }),
      error: (message, opts = {}) => push({ type: "error", message, ...opts }),
      warning: (message, opts = {}) =>
        push({ type: "warning", message, ...opts }),
      info: (message, opts = {}) => push({ type: "info", message, ...opts }),
      remove,
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Toasts */}
      <div className="fixed right-4 top-4 z-[999] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-2xl border p-3 shadow-sm ${typeStyles(t.type)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {t.title && (
                  <div className="text-sm font-bold leading-5">{t.title}</div>
                )}
                <div className="text-sm font-semibold leading-5">
                  {t.message}
                </div>
              </div>

              <button
                onClick={() => remove(t.id)}
                className="rounded-lg border bg-white/60 px-2 py-1 text-xs font-semibold hover:bg-white"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
