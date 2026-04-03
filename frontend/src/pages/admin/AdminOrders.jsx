import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Gestion des Commandes</h2>
      <div className="space-y-6">
        {orders.length === 0 ? <p className="text-gray-500 font-light italic">Aucune commande répertoriée dans la base.</p> : orders.map(order => (
          <div key={order.id} className="border border-gray-800 bg-gray-950 rounded-2xl p-6 shadow-md hover:border-royal-green-500/50 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Opération #{order.id}</span>
                <h3 className="font-bold text-xl text-white tracking-wide mt-1">{order.user ? order.user.username : 'Opérateur Inconnu'}</h3>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                <span className="font-black text-royal-green-500 text-2xl drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{order.total_amount} €</span>
                <span className="block text-xs text-gray-400 uppercase tracking-widest mt-1">Statut: <span className="text-white font-bold">{order.status}</span></span>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
              <h4 className="font-bold mb-4 text-xs text-gray-400 uppercase tracking-widest">Détails de Personnalisation</h4>
              {order.customizations && order.customizations.map(cust => (
                <div key={cust.id} className="flex flex-wrap gap-4 text-sm mb-3 pb-3 border-b border-gray-800 last:border-0 last:mb-0 last:pb-0 text-gray-300">
                  <div className="font-bold text-white min-w-[120px] uppercase tracking-wider">{cust.product?.name}</div>
                  <div className="hidden md:block text-royal-green-500">|</div>
                  <div>ID Flocage: <span className="font-bold text-white bg-gray-950 px-2 py-1 rounded">{cust.name_flocage || 'N/A'}</span></div>
                  <div>Chiffre: <span className="font-bold text-white bg-gray-950 px-2 py-1 rounded">{cust.number_flocage || 'N/A'}</span></div>
                  <div>Envergure: <span className="font-black text-royal-green-500 text-base">{cust.size || 'L'}</span></div>
                  <div className="w-full text-xs text-gray-500 mt-2 bg-gray-950 p-2 rounded">Tech: Police {cust.font} • Hex {cust.color} • Coords X:{cust.pos_x} Y:{cust.pos_y}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
