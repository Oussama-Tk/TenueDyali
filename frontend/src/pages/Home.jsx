import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch products
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        // filter available and take up to 3
        const available = res.data.filter(p => (p.is_available === 1 || p.is_available === true));
        setFeaturedProducts(available.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-royal-green-50 to-white -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col md:flex-row items-center gap-12">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-royal-green-900 tracking-tight leading-tight">
                Portez <br/><span className="text-transparent bg-clip-text gradient-royal">Votre Passion</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Découvrez notre collection exclusive de maillots de football et personnalisez-les avec votre nom et numéro. Qualité premium, design unique.
              </p>
              <div className="flex gap-4">
                <Link to="/shop" className="px-8 py-4 gradient-royal text-white rounded-full font-bold shadow-xl shadow-royal-green-500/30 hover:scale-105 smooth-transitions inline-flex items-center justify-center">
                  Découvrir la collection
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-royal-green-100 rounded-full blur-3xl opacity-50 transform -translate-y-10" />
              <img 
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop" 
                alt="Maillot Premium" 
                className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl transform rotate-3"
              />
            </motion.div>
            
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Nos Maillots <span className="text-royal-green-600">Populaires</span></h2>
              <p className="text-lg text-gray-500 mt-4">Les pièces favorites de notre communauté de supporters.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((p) => (
                <Link key={p.id} to={`/shop/${p.id}`} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-md hover:shadow-xl smooth-transitions transform hover:-translate-y-2 group">
                  <div className="bg-white rounded-xl mb-4 overflow-hidden h-64 flex items-center justify-center relative">
                    <img 
                      src={p.image_url?.startsWith('http') ? p.image_url : `http://localhost:8000${p.image_url}`} 
                      alt={p.name} 
                      className="h-full w-full object-cover group-hover:scale-110 smooth-transitions" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                  <p className="text-lg font-semibold text-royal-green-600 mt-2">{p.price} €</p>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link to="/shop" className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-royal-green-600 shadow-lg transform hover:-translate-y-1 transition duration-300">
                Voir tous nos maillots
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
