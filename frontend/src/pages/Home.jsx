import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        const available = res.data.filter(p => (p.is_available === 1 || p.is_available === true));
        setFeaturedProducts(available.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col pt-20">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Image de fond avec overlay ultra sombre */}
          <div className="absolute inset-0 bg-[url('/hero-bg.jpeg')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 flex flex-col items-center text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 max-w-4xl"
            >
              <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-tight">
                L'ÉLITE DU <br/>
                <span className="text-transparent bg-clip-text gradient-royal neon-text">MAILLOT SUR MESURE</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                Forgez votre identité sur le terrain. Des équipements premium conçus avec une précision absolue et un design percutant.
              </p>
              <div className="flex justify-center gap-6 pt-8">
                <Link to="/shop" className="px-10 py-5 bg-royal-green-900/40 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 smooth-transitions inline-flex items-center justify-center neon-border backdrop-blur-sm">
                  Explorer la collection
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gray-950 relative">
          {/* Subtle glow effect in the background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal-green-900/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">Créations <span className="text-royal-green-500 neon-text">Populaires</span></h2>
              <p className="text-lg text-gray-400 mt-4">Les pièces maîtres de notre arsenal.</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
              {featuredProducts.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/shop/${p.id}`} className="block bg-gray-900 rounded-2xl p-5 border border-gray-800 smooth-transitions transform hover:-translate-y-3 group hover:neon-border relative overflow-hidden">
                    <div className="bg-gray-800/50 rounded-xl mb-6 overflow-hidden h-72 flex items-center justify-center relative">
                      <img 
                        src={p.image_url?.startsWith('http') ? p.image_url : `http://localhost:8000${p.image_url}`} 
                        alt={p.name} 
                        className="h-full w-full object-cover group-hover:scale-110 smooth-transitions" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white group-hover:text-royal-green-400 transition-colors">{p.name}</h3>
                      <p className="text-xl font-semibold text-royal-green-500 mt-2">{p.price} MAD</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/shop" className="px-10 py-5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 shadow-xl transform hover:-translate-y-1 smooth-transitions border border-gray-700 hover:border-royal-green-600 inline-block uppercase tracking-wider text-sm">
                Déployer tout l'arsenal
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Us Preview Section */}
        <section className="py-24 bg-gray-950 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-royal-green-900/10 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-royal-green-500/20 rounded-3xl blur-xl" />
                  <img src="/about-img.jpeg" alt="À propos" className="relative rounded-3xl shadow-2xl w-full object-cover h-80 border border-gray-800" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl font-extrabold text-white mb-6 uppercase tracking-wider">La Base <span className="text-royal-green-500 neon-text">Opérationnelle</span></h2>
                <div className="w-12 h-1 bg-royal-green-500 mb-6 rounded-full neon-border" />
                <p className="text-lg text-gray-400 mb-8 leading-relaxed font-light">
                  Nés de la ferveur des stades, nous équipons chaque passionné avec des maillots professionnels. Flocage sur-mesure d'une endurance à toute épreuve, développé pour ceux qui dominent le terrain.
                </p>
                <Link to="/about" className="inline-block px-8 py-4 border border-gray-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:border-royal-green-500 hover:text-royal-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 transition-all">
                  Découvrir notre histoire
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-900 border-t border-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
               <h2 className="text-4xl font-extrabold text-white uppercase tracking-wider">Retours <span className="text-royal-green-500 neon-text">Déploiement</span></h2>
               <p className="text-gray-400 mt-4 font-light text-lg">L'analyse de ceux qui opèrent sur le terrain.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Opérateur Y.A", text: "Flocage impeccable, le maillot tient parfaitement même après plusieurs chocs en match. Très satisfait.", rating: 5 },
                { name: "S.K", text: "La qualité du tissu est largement au-dessus de mes attentes. Le Vert Royal claque !", rating: 5 },
                { name: "Client Anonyme", text: "Livraison ultra rapide et la taille (XL) est exactement comme prévu. Je recommande fortement l'arsenal.", rating: 4 }
              ].map((feedback, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-gray-950 border border-gray-800 p-8 rounded-2xl relative hover:border-royal-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-all flex flex-col"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < feedback.rating ? "text-royal-green-500 fill-royal-green-500" : "text-gray-800"} />
                    ))}
                  </div>
                  <p className="text-gray-300 font-light italic mb-6 leading-relaxed">"{feedback.text}"</p>
                  <div className="mt-auto border-t border-gray-800 pt-4">
                    <p className="text-white font-bold tracking-wider text-sm uppercase">{feedback.name}</p>
                    <p className="text-xs text-royal-green-500 uppercase tracking-widest mt-1">Achat Confirmé</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
