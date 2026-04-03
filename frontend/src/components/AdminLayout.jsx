import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Package, ShoppingBag, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user || !user.is_admin) {
    return <div className="pt-32 text-center text-red-500 font-bold">Accès Refusé. Redirection...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col fixed h-full z-40">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-royal-green-900">Dashboard Admin</h2>
          <p className="text-sm text-gray-500">{user.username}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 relative">
          <Link to="/admin/products" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-royal-green-50 hover:text-royal-green-700 rounded-xl transition">
            <Package size={20} /> Produits
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-royal-green-50 hover:text-royal-green-700 rounded-xl transition">
            <ShoppingBag size={20} /> Commandes
          </Link>
          <Link to="/admin/messages" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-royal-green-50 hover:text-royal-green-700 rounded-xl transition">
            <MessageSquare size={20} /> Messages
          </Link>
          
          <button onClick={handleLogout} className="absolute bottom-28 w-[calc(100%-2rem)] flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition">
            <LogOut size={20} /> Déconnexion
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
