import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
    const { totalItems } = useCart();

    const navClass = ({ isActive }) =>
        [
            "rounded-md px-3 py-2 text-sm font-medium transition",
            isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
        ].join(" ");

    return (
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-900 text-white font-bold">
                        T
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold text-gray-900">Toy Store</div>
                        <div className="text-xs text-gray-500">Demo EC</div>
                    </div>
                </Link>

                {/* Nav */}
                <nav className="flex items-center gap-2">
                    <NavLink to="/" className={navClass} end>
                        Home
                    </NavLink>
                    <NavLink to="/products" className={navClass}>
                        Products
                    </NavLink>

                    <Link
                        to="/cart"
                        className="relative rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cart
                        {totalItems > 0 && (
                            <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
