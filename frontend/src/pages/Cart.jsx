import { useCartStore } from '../store/useCartStore';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.product.price, 0);

  const handleCheckout = () => {
    alert("Commande passée avec succès (Simulation API) !");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-400">Votre panier est vide.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-royal-green-900 mb-8">Votre Panier</h1>
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
              <div className="flex items-center gap-6">
                <img src={item.product.image_url} alt="Maillot" className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{item.product.name}</h3>
                  <p className="text-royal-green-600 font-semibold">{item.product.price} €</p>
                  {item.customization && (
                    <div className="text-sm text-gray-500 mt-2 bg-gray-100 p-2 rounded-md">
                      Flocage: {item.customization.name} - {item.customization.number} (Police: {item.customization.font})
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-3 rounded-full hover:bg-red-100 smooth-transitions">
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="pt-8 border-t mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold">Total: <span className="text-royal-green-600">{total.toFixed(2)} €</span></div>
            <button onClick={handleCheckout} className="w-full md:w-auto px-8 py-4 gradient-royal text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-royal-green-500/30 transform hover:-translate-y-1 transition">
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
