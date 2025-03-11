import { useState } from "react";
import { Menu, ShoppingCart, Info } from "lucide-react"; // Using lucide-react icons from shadcn/ui if you have it

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Logo (You can replace this with your logo) */}
        <div className="text-xl font-bold text-white">KingKebap</div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center space-x-4 md:flex">
          <a href="/about" className="text-gray-300 hover:text-white">
            About
          </a>
          <a
            href="/cart"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <ShoppingCart className="mr-1 h-5 w-5" />
            Cart
          </a>
        </div>

        {/* Mobile Navigation Links (Dropdown) */}
        <div
          className={`absolute top-full left-0 z-10 w-full bg-gray-800 md:hidden ${isOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col space-y-2 p-4">
            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>
            <a
              href="/cart"
              className="flex items-center text-gray-300 hover:text-white"
            >
              <ShoppingCart className="mr-1 h-5 w-5" />
              Cart
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
