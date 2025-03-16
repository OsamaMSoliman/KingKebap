import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react"; // Using lucide-react icons from shadcn/ui
import { useSidePanelStore } from "~/stores/SidePanelStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useSidePanelStore((state) => state.toggle);

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

        {/* Added relative positioning */}
        <div className="relative flex items-center space-x-4">
          {/* Cart Icon (Always Visible) */}
          <a
            onClick={toggle}
            className="flex items-center text-gray-300 hover:text-white hover:cursor-pointer"
          >
            <ShoppingCart className="mr-1 h-5 w-5" />
            <span className="hidden md:inline">Warenkorb</span>
          </a>

          {/* Notification */}
          <span className="absolute top-0 right-0 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-200 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-yellow-300"></span>
          </span>
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
