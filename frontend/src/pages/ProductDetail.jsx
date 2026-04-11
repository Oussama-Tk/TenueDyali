import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from "../components/LoadingIndicator";
import { CheckCircle, XCircle } from 'lucide-react';
import CustomizationTool from '../components/CustomizationTool';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 min-h-screen bg-gray-950 flex flex-col items-center justify-start">
        <LoadingIndicator className="w-16 h-16 text-royal-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
        <div className="text-xl font-bold text-royal-green-500 tracking-widest uppercase animate-pulse">
          Chargement du Produit ...
        </div>
      </div>
    );
  }

  const isAvailable = product.is_available === 1 || product.is_available === true;

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-royal-green-900/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          <div className="md:w-1/2 p-4 md:p-8 bg-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Subtle inner glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-900" />
            <img
              src={product.image_url?.startsWith('http') ? product.image_url : `https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${product.image_url}`}
              alt={product.name}
              className={`relative z-10 max-w-full h-auto max-h-[500px] object-cover rounded-2xl drop-shadow-2xl transform hover:scale-105 smooth-transitions ${!isAvailable && 'grayscale opacity-50'}`}
            />
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-900 border-l border-gray-800">
            <div className="mb-6">
              {isAvailable ? (
                <span className="inline-flex items-center bg-royal-green-900/30 text-royal-green-400 border border-royal-green-700/50 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest"><CheckCircle size={14} className="mr-2" /> Disponible</span>
              ) : (
                <span className="inline-flex items-center bg-red-900/30 text-red-400 border border-red-700/50 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(220,38,38,0.2)]"><XCircle size={14} className="mr-2" /> Épuisé</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">{product.name}</h1>
            <p className="text-3xl font-extrabold text-royal-green-500 mb-8 neon-text">{product.price} MAD</p>

            <div className="w-12 h-1 bg-royal-green-500 mb-8 rounded-full" />

            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light whitespace-pre-wrap">{product.description}</p>

            <button
              onClick={() => {
                if (!user) {
                  useToastStore.getState().addToast('Identification requise pour déployer l\'arsenal de personnalisation.', 'error');
                  navigate('/login');
                } else {
                  setIsCustomizing(true);
                }
              }}
              disabled={!isAvailable}
              className={`w-full py-5 rounded-xl font-black text-lg uppercase tracking-widest transition-all duration-300 ease-in-out block text-center ${isAvailable
                ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-900 hover:text-royal-green-400 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1'
                : 'bg-gray-800/50 text-gray-600 border border-gray-800 cursor-not-allowed'
                }`}
            >
              {isAvailable ? 'Déployer la Personnalisation' : 'Arsenal Insuffisant'}
            </button>
          </div>

        </div>
      </motion.div>

      <CustomizationTool
        product={product}
        isOpen={isCustomizing}
        onClose={() => setIsCustomizing(false)}
      />
    </div>
  );
}
