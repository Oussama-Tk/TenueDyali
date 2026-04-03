import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Package, ShoppingBag, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user || !user.is_admin) {
    return <div className="pt-32 text-center text-red-500 font-bold uppercase tracking-widest bg-gray-950 min-h-screen">Accès Refusé. Redirection...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 shadow-[20px_0_40px_rgba(0,0,0,0.5)] flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">Interface <span className="text-royal-green-500">Admin</span></h2>
          <p className="text-sm text-gray-500 mt-2 font-light">Opérateur: {user.username}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 relative">
          <Link to="/admin/products" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-royal-green-400 rounded-xl transition-all border border-transparent hover:border-gray-700">
            <Package size={20} /> Arsenal / Produits
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-royal-green-400 rounded-xl transition-all border border-transparent hover:border-gray-700">
            <ShoppingBag size={20} /> Commandes
          </Link>
          <Link to="/admin/messages" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 hover:text-royal-green-400 rounded-xl transition-all border border-transparent hover:border-gray-700">
            <MessageSquare size={20} /> Transmissions
          </Link>
          
          <button onClick={handleLogout} className="absolute bottom-28 w-[calc(100%-2rem)] flex items-center gap-3 p-3 text-red-500 hover:bg-red-950/30 hover:border-red-900 border border-transparent rounded-xl transition-all">
            <LogOut size={20} /> Déconnexion
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 text-gray-200">
        <Outlet />
      </main>
    </div>
  );
}
