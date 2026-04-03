import { Heart, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-royal-green-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-royal-green-900/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase">Base <span className="text-royal-green-500 neon-text">Opérationnelle</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Nous sommes forgés par la ferveur des stades. Notre mission : équiper chaque supporter avec un standard de qualité professionnel, pensé pour ceux qui dominent le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-royal-green-500/20 rounded-3xl blur-xl" />
            <img src="/about-img.jpeg" alt="Passion pour le foot" className="relative rounded-3xl shadow-2xl w-full object-cover h-96 border border-gray-800" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">Origines</h2>
            <div className="w-12 h-1 bg-royal-green-500 mb-6 rounded-full neon-border" />
            <p className="text-lg text-gray-400 mb-6 leading-relaxed font-light">
              Née au cœur de la ferveur sportive marocaine, TenueDyali est le fruit d'une quête d'excellence. Permettre à chaque joueur ou supporter de revêtir son aura de manière personnalisée avec un rendu parfait.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Des technologies de textile avancées, alliées à un flocage de précision garantissant robustesse face aux affrontements physiques et maintien intégral après d'innombrables lavages.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Qualité Blindée", desc: "Tissus normés athlétiques. Durabilité maximale saison après saison face à l'effort." },
            { icon: Heart, title: "Personnalisation Pure", desc: "Marquage arrière tactique. Vos initiales, votre chiffre, sans aucune bavure d'impression." },
            { icon: Truck, title: "Déploiement Rapide", desc: "Logistique express. Expédition de l'équipement où que vous soyez sur le territoire." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              className="bg-gray-900 border border-gray-800 p-8 rounded-2xl text-center transform hover:-translate-y-2 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.2), duration: 0.5 }}
            >
              <div className="mx-auto bg-gray-950 w-20 h-20 rounded-full flex items-center justify-center mb-6 border border-gray-800 group-hover:border-royal-green-500 transition-colors">
                <feature.icon className="text-royal-green-500 w-10 h-10 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{feature.title}</h3>
              <p className="text-gray-400 font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
