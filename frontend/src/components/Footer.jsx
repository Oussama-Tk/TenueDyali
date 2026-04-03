import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1a14] pt-16 pb-8 text-white border-t-4 border-royal-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="col-span-1">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tighter mb-4 block">
              Tenue<span className="text-royal-green-500">Dyali</span>
            </Link>
            <p className="text-gray-400 leading-relaxed pr-4">
              La destination numéro 1 pour la création et la personnalisation de maillots de football de haute qualité.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-royal-green-500 transition">Accueil</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-royal-green-500 transition">Boutique</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-royal-green-500 transition">À Propos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-royal-green-500 transition">Nous Contacter</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6 text-white">Suivez-nous</h3>
            <p className="text-gray-400 mb-6">Rejoignez-nous sur les réseaux sociaux pour découvrir nos dernières créations.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-royal-green-600 transition transform hover:-translate-y-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-royal-green-600 transition transform hover:-translate-y-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://wa.me/212612345678" target="_blank" rel="noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-green-500 transition transform hover:-translate-y-1">
                <Phone size={24} className="text-white" />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} TenueDyali. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
