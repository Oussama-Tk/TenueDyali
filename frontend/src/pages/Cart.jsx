import { useCartStore } from '../store/useCartStore';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((acc, item) => acc + parseFloat(item.product.price || 0), 0);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const payload = {
        total_amount: total,
        items: cart.map(item => ({
          product_id: item.product.id,
          customization: item.customization || null
        }))
      };

      await axios.post('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/orders', payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert("Processus de caisse initié avec succès ! Commande enregistrée.");
      clearCart();
    } catch (err) {
      console.error(err);
      let errorMsg = "Erreur lors de la validation du panier.";
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          errorMsg += "\n" + err.response.data.message;
        }
        if (err.response.data.error) {
          errorMsg += "\n" + err.response.data.error;
        }
      }
      alert(errorMsg);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 pt-32 pb-12 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">Votre arsenal est vide.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-royal-green-900/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-white mb-8 uppercase tracking-widest">Opération <span className="text-royal-green-500 neon-text">Panier</span></h1>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center justify-between border-b border-gray-800 pb-6 last:border-0 last:pb-0 gap-6"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="relative w-24 h-24 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                  {item.customization?.preview_image_base64 ? (
                    <img src={item.customization.preview_image_base64} alt="Maillot Customisé" className="w-full h-full object-contain bg-gray-300" />
                  ) : (
                    <img src={item.product.image_url?.startsWith('http') ? item.product.image_url : `https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${item.product.image_url}`} alt="Maillot" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">{item.product.name}</h3>
                  <p className="text-royal-green-500 font-semibold mt-1">{item.product.price} MAD</p>
                  {item.customization && (
                    <div className="text-xs text-gray-400 mt-3 bg-gray-950 border border-gray-800 p-3 rounded-lg uppercase tracking-wider">
                      Flocage: <span className="text-white font-bold">{item.customization.name}</span> - <span className="text-white font-bold">{item.customization.number}</span>
                      <span className="text-royal-green-500 mx-2">|</span>
                      Taille: <span className="text-white font-bold">{item.customization.size}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-full md:w-auto text-red-500 hover:text-red-400 bg-red-950/30 border border-red-900 p-4 rounded-xl hover:bg-red-900/50 hover:border-red-700 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={20} /> <span className="md:hidden uppercase text-sm font-bold tracking-widest">Retirer</span>
              </button>
            </motion.div>
          ))}

          <div className="pt-8 border-t border-gray-800 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-white uppercase tracking-wider">Investissement Total: <span className="text-royal-green-500 neon-text">{total.toFixed(2)} MAD</span></div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full md:w-auto px-10 py-5 text-white rounded-xl font-bold text-sm shadow-xl transition-all uppercase tracking-widest border ${isCheckingOut
                ? 'bg-gray-700 border-gray-600 cursor-wait'
                : 'bg-gray-800 border-gray-700 hover:bg-gray-900 hover:text-royal-green-400 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1'
                }`}
            >
              {isCheckingOut ? 'Validation...' : 'Valider le Panier'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
