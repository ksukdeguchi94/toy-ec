import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const {
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    const formatJPY = (n) => `¥${n.toLocaleString("ja-JP")}`;

    if (cart.length === 0) {
        return (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">カート</h1>
                <p className="mt-2 text-gray-600">カートは空です。</p>
                <Link
                    to="/products"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition"
                >
                    商品を見に行く
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Items */}
            <div className="lg:col-span-2">
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">カート</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                {totalItems} 点 / 合計 {formatJPY(totalPrice)}
                            </p>
                        </div>

                        <button
                            onClick={clearCart}
                            className="rounded-xl border px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                        >
                            カートを空にする
                        </button>
                    </div>

                    <div className="mt-6 space-y-4">
                        {cart.map(({ product, quantity }) => (
                            <div
                                key={product.id}
                                className="flex gap-4 rounded-2xl border p-4"
                            >
                                {/* image placeholder */}
                                <div className="h-24 w-32 flex-shrink-0 rounded-xl bg-gray-100" />

                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {product.name}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600">
                                                単価 {formatJPY(product.price)}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
                                        >
                                            削除
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        {/* quantity controls */}
                                        <div className="inline-flex items-center rounded-xl border bg-white">
                                            <button
                                                onClick={() => decreaseQuantity(product.id)}
                                                className="px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                                                aria-label="decrease"
                                            >
                                                −
                                            </button>
                                            <div className="px-4 py-2 text-sm font-semibold text-gray-900">
                                                {quantity}
                                            </div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                                                aria-label="increase"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* subtotal */}
                                        <div className="text-sm font-semibold text-gray-900">
                                            小計 {formatJPY(product.price * quantity)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/products"
                            className="text-sm font-semibold text-gray-700 underline"
                        >
                            ← 買い物を続ける
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900">注文内容</h2>

                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between text-gray-700">
                            <span>商品点数</span>
                            <span className="font-semibold text-gray-900">{totalItems} 点</span>
                        </div>

                        <div className="flex items-center justify-between text-gray-700">
                            <span>小計</span>
                            <span className="font-semibold text-gray-900">
                                {formatJPY(totalPrice)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-gray-700">
                            <span>送料</span>
                            <span className="font-semibold text-gray-900">無料</span>
                        </div>

                        <div className="pt-3 border-t flex items-center justify-between">
                            <span className="text-gray-900 font-semibold">合計</span>
                            <span className="text-xl font-extrabold text-gray-900">
                                {formatJPY(totalPrice)}
                            </span>
                        </div>
                    </div>

                    <button
                        className="mt-6 w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition"
                        onClick={() => alert("デモのため購入処理は未実装です")}
                    >
                        購入に進む（デモ）
                    </button>

                    <p className="mt-3 text-xs text-gray-500">
                        ※ デモアプリのため決済は行いません
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cart;
