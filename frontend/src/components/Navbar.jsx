import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const { cart } = useCartStore();

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent gradient-royal">
              TenueDyali
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-royal-green-700 smooth-transitions font-medium">Accueil</Link>
            <Link to="/shop" className="text-gray-700 hover:text-royal-green-700 smooth-transitions font-medium">Boutique</Link>
            <Link to="/about" className="text-gray-700 hover:text-royal-green-700 smooth-transitions font-medium">À propos</Link>
            <Link to="/contact" className="text-gray-700 hover:text-royal-green-700 smooth-transitions font-medium">Contact</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden md:block text-royal-green-900 font-semibold hover:text-royal-green-700 smooth-transitions">Connexion</Link>
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-royal-green-700 smooth-transitions">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-royal-green-500 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-700">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
