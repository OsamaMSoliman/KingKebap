import { Menu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { selectAllIds } from '~/stores/CartStore';
import { useSidePanelStore } from '~/stores/SidePanelStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useSidePanelStore((state) => state.toggle);
  const cartNotEmpty = selectAllIds().length > 0;

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
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto inline-block mr-2"
            />
            KingKebap
          </a>
        </div>

        {/* Cart Icon (Always Visible) */}
        <a
          onClick={toggle}
          className="flex space-x-4 items-center text-gray-300 hover:text-white hover:cursor-pointer"
        >
          {/* <ShoppingCart className="mr-1 h-5 w-5 animate-bounce" /> */}
          <span className="relative mr-1">
            {cartNotEmpty && (
              <ShoppingCart className="absolute h-5 w-5 animate-ping" />
            )}
            <ShoppingCart className="h-5 w-5" />
          </span>

          <span className="hidden md:inline">Warenkorb</span>
        </a>

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
          className={`absolute top-full left-0 z-10 w-full bg-gray-800 md:hidden ${isOpen ? 'block' : 'hidden'}`}
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
