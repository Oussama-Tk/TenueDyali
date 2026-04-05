import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 pt-16 pb-8 text-gray-300 border-t border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-royal-green-600 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.8)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div className="col-span-1">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tighter mb-4 block hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-all">
              Tenue<span className="text-royal-green-500">Dyali</span>
            </Link>
            <p className="text-gray-500 leading-relaxed pr-4 font-light">
              L'excellence du textile sportif couplée à une personnalisation haute précision.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white tracking-widest uppercase text-sm">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-royal-green-400 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 h-[2px] bg-royal-green-500 group-hover:w-4 transition-all duration-300"></span>Accueil</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-royal-green-400 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 h-[2px] bg-royal-green-500 group-hover:w-4 transition-all duration-300"></span>Boutique</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-royal-green-400 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 h-[2px] bg-royal-green-500 group-hover:w-4 transition-all duration-300"></span>À Propos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-royal-green-400 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 h-[2px] bg-royal-green-500 group-hover:w-4 transition-all duration-300"></span>Nous Contacter</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white tracking-widest uppercase text-sm">Réseaux</h3>
            <p className="text-gray-500 mb-6 font-light">Suivez notre trajectoire sur les terrains numériques.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/tenuedyali/" target="_blank" rel="noreferrer" className="bg-gray-900 border border-gray-800 p-3 rounded-xl hover:border-royal-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-gray-400 hover:text-white transition-all transform hover:-translate-y-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="https://www.facebook.com/share/16UoDQBywi/" target="_blank" rel="noreferrer" className="bg-gray-900 border border-gray-800 p-3 rounded-xl hover:border-royal-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-gray-400 hover:text-white transition-all transform hover:-translate-y-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://wa.me/212667985887" target="_blank" rel="noreferrer" className="bg-gray-900 border border-gray-800 p-3 rounded-xl hover:border-royal-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-gray-400 hover:text-white transition-all transform hover:-translate-y-1">
                <Phone size={24} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center bg-gray-950">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} TenueDyali. L'Élite du Flocage.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-600 text-sm">
            <a href="#" className="hover:text-royal-green-500 transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-royal-green-500 transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
