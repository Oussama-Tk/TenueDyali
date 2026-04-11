import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoadingIndicator from "../components/LoadingIndicator";
import axios from 'axios';

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase">Notre <span className="text-royal-green-500 neon-text">Arsenal</span></h1>
          <p className="text-xl text-gray-400 mt-4 font-light max-w-2xl mx-auto">
            Équipez-vous avec style. Personnalisation millimétrée, tissu haut de gamme.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          {products.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link to={`/shop/${p.id}`} className="flex flex-col h-full bg-gray-900 rounded-2xl p-3 sm:p-5 border border-gray-800 shadow-md smooth-transitions transform hover:-translate-y-3 group hover:neon-border relative overflow-hidden">
                <div className="bg-gray-800/40 rounded-xl mb-3 sm:mb-5 overflow-hidden h-48 sm:h-96 flex items-center justify-center relative">
                  <img
                    src={p.image_url ? `https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${p.image_url}` : ''}
                    alt={p.name}
                    className={`h-full w-full object-cover group-hover:scale-110 smooth-transitions ${p.is_available === 0 ? 'grayscale opacity-40' : ''}`}
                  />
                  {!p.is_available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <span className="bg-red-600/90 text-white font-black tracking-widest uppercase px-6 py-3 rounded-lg rotate-12 shadow-[0_0_15px_rgba(220,38,38,0.6)] text-xl border border-red-500">ÉPUISÉ</span>
                    </div>
                  )}
                  {p.is_available && (
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  )}
                </div>
                <div className="relative z-10 px-1 pb-1 sm:px-2 sm:pb-2 flex flex-col flex-1">
                  <h2 className="text-sm sm:text-2xl font-bold text-white group-hover:text-royal-green-400 transition-colors uppercase tracking-wide leading-tight">{p.name}</h2>
                  <p className="text-xs sm:text-xl font-semibold text-royal-green-500 mt-1 sm:mt-2 tracking-widest mt-auto pt-2 sm:pt-4">{p.price} MAD</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {products.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center">
            <LoadingIndicator className="w-16 h-16 text-royal-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
            <div className="text-xl font-bold text-royal-green-500 tracking-widest uppercase animate-pulse text-center">
              Chargement de l'arsenal...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
