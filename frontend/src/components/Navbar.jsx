import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, LogOut, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { userCarts } = useCartStore();
  const { user, logout } = useAuthStore();
  const cart = userCarts?.[user?.id || 'guest'] || [];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed w-full z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:scale-105 smooth-transitions">
              <img src="/logo.png" alt="TenueDyali Logo" className="h-20 w-auto" />
              {/* Le texte reste en backup ou décoratif, on peut le masquer avec hidden si l'image suffit */}
              <span className="text-2xl font-bold bg-clip-text text-transparent gradient-royal hidden sm:block neon-text">
                TenueDyali
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-royal-green-500 transition-colors duration-300 font-medium">Accueil</Link>
            <Link to="/shop" className="text-gray-300 hover:text-royal-green-500 transition-colors duration-300 font-medium">Boutique</Link>
            <Link to="/about" className="text-gray-300 hover:text-royal-green-500 transition-colors duration-300 font-medium">À propos</Link>
            <Link to="/contact" className="text-gray-300 hover:text-royal-green-500 transition-colors duration-300 font-medium">Contact</Link>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-royal-green-500 font-bold text-xs uppercase tracking-widest">{user.username}</span>
                <button onClick={() => { logout(); }} className="flex items-center gap-2 text-gray-400 text-sm font-semibold hover:text-red-500 transition-colors duration-300">
                  Déconnexion <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block text-gray-300 font-semibold hover:text-royal-green-500 transition-colors duration-300">Connexion</Link>
            )}
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-royal-green-500 transition-colors duration-300">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-950 transform translate-x-1/2 -translate-y-1/2 bg-royal-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-royal-green-500 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 absolute w-full left-0 top-20 shadow-2xl">
          <div className="px-4 pt-2 pb-6 flex flex-col space-y-4">
            <Link to="/" onClick={closeMenu} className="text-gray-300 hover:text-royal-green-500 transition-colors font-medium text-lg uppercase tracking-wider block py-2 border-b border-gray-800">Accueil</Link>
            <Link to="/shop" onClick={closeMenu} className="text-gray-300 hover:text-royal-green-500 transition-colors font-medium text-lg uppercase tracking-wider block py-2 border-b border-gray-800">Boutique</Link>
            <Link to="/about" onClick={closeMenu} className="text-gray-300 hover:text-royal-green-500 transition-colors font-medium text-lg uppercase tracking-wider block py-2 border-b border-gray-800">À propos</Link>
            <Link to="/contact" onClick={closeMenu} className="text-gray-300 hover:text-royal-green-500 transition-colors font-medium text-lg uppercase tracking-wider block py-2 border-b border-gray-800">Contact</Link>

            {user ? (
              <div className="flex justify-between items-center pt-4">
                <span className="text-royal-green-500 font-bold text-sm uppercase tracking-widest">{user.username}</span>
                <button onClick={() => { logout(); closeMenu(); }} className="flex items-center gap-2 text-red-400 font-semibold hover:text-red-500 transition-colors">
                  Déconnexion <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="pt-4">
                <Link to="/login" onClick={closeMenu} className="block w-full text-center py-3 bg-royal-green-500 text-gray-950 rounded-xl font-bold uppercase tracking-wider hover:bg-royal-green-400 transition-colors">Connexion</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
