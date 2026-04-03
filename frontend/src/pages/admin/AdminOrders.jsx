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
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Commandes</h2>
      <div className="space-y-6">
        {orders.length === 0 ? <p className="text-gray-500">Aucune commande.</p> : orders.map(order => (
          <div key={order.id} className="border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-gray-500">Commande #{order.id}</span>
                <h3 className="font-bold text-lg">{order.user ? order.user.username : 'Utilisateur invité'}</h3>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-royal-green-600 text-xl">{order.total_amount} €</span>
                <span className="block text-sm text-gray-500 uppercase tracking-wider">{order.status}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-sm text-gray-700">Détails des Flocages</h4>
              {order.customizations && order.customizations.map(cust => (
                <div key={cust.id} className="flex gap-4 text-sm mb-2 pb-2 border-b last:border-0 last:mb-0 last:pb-0">
                  <div className="font-medium">{cust.product?.name}</div>
                  <div>-</div>
                  <div>Nom: <span className="font-bold text-black">{cust.name_flocage || 'N/A'}</span></div>
                  <div>Numéro: <span className="font-bold text-black">{cust.number_flocage || 'N/A'}</span></div>
                  <div>Taille: <span className="font-bold text-royal-green-600 text-base">{cust.size || 'L'}</span></div>
                  <div>Police: {cust.font} | Couleur: {cust.color} | Pos: ({cust.pos_x}, {cust.pos_y})</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
