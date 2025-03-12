import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react"; // Using lucide-react icons from shadcn/ui
import { useCartStore } from "~/stores/CartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCartStore((state) => state.toggle);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="text-xl font-bold text-white">
          <a href="/" className="text-gray-300 hover:text-white">
            KingKebap
          </a>
        </div>

        {/* Cart Icon (Always Visible) */}
        <div className="flex items-center space-x-4">
          <a
            onClick={toggle}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <ShoppingCart className="mr-1 h-5 w-5" />
            <span className="hidden md:inline">Cart</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center space-x-4 md:flex">
          <a href="/offers" className="text-gray-300 hover:text-white">
            Angebote
          </a>
          <a href="/combo-meals" className="text-gray-300 hover:text-white">
            Menü
          </a>
          <a href="/menu" className="text-gray-300 hover:text-white">
            Speisekarte
          </a>
        </div>

        {/* Mobile Navigation Links (Dropdown) */}
        <div
          className={`absolute top-full left-0 z-10 w-full bg-gray-800 md:hidden ${isOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col space-y-2 p-4">
            <a href="/offers" className="text-gray-300 hover:text-white">
              Angebote
            </a>
            <a href="/combo-meals" className="text-gray-300 hover:text-white">
              Menü
            </a>
            <a href="/menu" className="text-gray-300 hover:text-white">
              Speisekarte
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
