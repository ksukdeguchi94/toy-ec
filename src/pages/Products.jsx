import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useToast } from "../components/ToastProvider";
import { useCart } from "../context/CartContext";

function Products() {
    const toast = useToast();
    const { addToCart } = useCart();
    
    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <p className="mt-1 text-sm text-gray-600">
                    おもちゃを選んでカートに追加できます。
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                    <Link
                        key={p.id}
                        to={`/products/${p.id}`}
                        className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        {/* 画像の代わりのプレースホルダ */}
                        <div className="aspect-[4/3] w-full rounded-xl bg-gray-100" />

                        <div className="mt-3 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 group-hover:underline">
                                    {p.name}
                                </h2>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                    {p.description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">¥{p.price}</span>

                            <div className="flex items-center gap-2">
                                <button
                                onClick={(e) => {
                                    e.preventDefault(); // Linkの遷移を止める
                                    e.stopPropagation();
                                    addToCart(p);
                                    toast.success("カートに追加しました");
                                }}
                                className="rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-black transition"
                                >
                                カートに追加
                                </button>

                                <span className="text-sm text-gray-600">View →</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Products;
