import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = useMemo(
        () => products.find((p) => p.id === Number(id)),
        [id]
    );

    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="rounded-2xl border bg-white p-6">
                <h2 className="text-lg font-semibold">商品が見つかりません</h2>
                <Link className="mt-3 inline-block text-sm text-gray-700 underline" to="/products">
                    商品一覧へ戻る
                </Link>
            </div>
        );
    }

    const handleAdd = () => {
        addToCart(product);
        toast.success("カートに追加しました！");
        setAdded(true);
        window.setTimeout(() => setAdded(false), 900);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Image */}
            <div className="rounded-3xl border bg-white p-4 shadow-sm">
                <div className="aspect-[4/3] w-full rounded-2xl bg-gray-100" />
            </div>

            {/* Right: Info */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    </div>
                    <div className="rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white">
                        ¥{product.price}
                    </div>
                </div>

                {/* Highlights */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-gray-50 p-4">
                        <div className="text-xs text-gray-500">発送</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                            1〜2営業日
                        </div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                        <div className="text-xs text-gray-500">対象年齢</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                            3歳〜
                        </div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                        <div className="text-xs text-gray-500">素材</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                            木 / プラスチック
                        </div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                        <div className="text-xs text-gray-500">ギフト</div>
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                            ラッピング可
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
                    >
                        カートに追加
                    </button>

                    <Link
                        to="/cart"
                        className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                    >
                        カートを見る
                    </Link>
                </div>

                {/* Feedback */}
                {added && (
                    <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                        カートに追加しました！
                    </div>
                )}

                <Link
                    to="/products"
                    className="mt-6 inline-block text-sm text-gray-700 underline"
                >
                    ← 商品一覧へ戻る
                </Link>
            </div>
        </div>
    );
}

export default ProductDetail;
