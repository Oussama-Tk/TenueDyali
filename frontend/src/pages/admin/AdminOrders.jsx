import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/admin/orders');
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
              <div className="text-left md:text-right mt-4 md:mt-0 flex flex-col items-end">
                <span className="font-black text-royal-green-500 text-2xl drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{order.total_amount} MAD</span>
                <span className="block text-xs text-gray-400 uppercase tracking-widest mt-1 mb-3">Statut: <span className="text-white font-bold">{order.status}</span></span>
                <button
                  onClick={async () => {
                    if (window.confirm('Voulez-vous vraiment supprimer cette commande ?')) {
                      try {
                        await axios.delete(`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/admin/orders/${order.id}`);
                        setOrders(orders.filter(o => o.id !== order.id));
                      } catch (err) {
                        alert('Erreur lors de la suppression.');
                      }
                    }
                  }}
                  className="px-4 py-2 bg-red-900/50 text-red-400 border border-red-800 rounded hover:bg-red-800 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  Supprimer
                </button>
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
                  {cust.preview_image && (
                    <div className="w-full mt-3 flex flex-col items-start">
                      <p className="text-xs font-bold text-royal-green-500 mb-2 uppercase tracking-widest">Maquette Générée</p>
                      <a href={`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${cust.preview_image}`} download target="_blank" rel="noreferrer" className="inline-block border border-gray-700 bg-gray-800 p-2 rounded-xl hover:border-royal-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                        <img src={`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${cust.preview_image}`} alt="Preview" className="h-40 w-auto object-contain rounded" />
                        <div className="text-center text-xs font-bold text-white mt-2 uppercase tracking-wider">Télécharger .PNG</div>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
