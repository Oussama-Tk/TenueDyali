import { useState } from 'react';
import { Rnd } from 'react-rnd';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function CustomizationTool({ product, isOpen, onClose }) {
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [name, setName] = useState('VOTRE NOM');
  const [number, setNumber] = useState('10');
  const [font, setFont] = useState('Arial');
  const [color, setColor] = useState('#ffffff');
  const [choiceSize, setChoiceSize] = useState('L');
  
  const [nameSize, setNameSize] = useState(24);
  const [numberSize, setNumberSize] = useState(60);

  // Pos default
  const [namePos, setNamePos] = useState({ x: 100, y: 150 });
  const [numPos, setNumPos] = useState({ x: 120, y: 220 });

  const handleAddToCart = () => {
    if (!user) {
      onClose();
      navigate('/login');
      return;
    }

    const customization = {
      name,
      number,
      font,
      color,
      size: choiceSize,
      pos_x: namePos.x,
      pos_y: namePos.y
    };
    addToCart(product, customization);
    onClose();
    alert("Produit ajouté à l'arsenal !");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            className="relative bg-gray-900 border border-gray-800 w-full max-w-5xl rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.15)] overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[600px]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-gray-800 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white transition-colors border border-gray-700">
              <X size={24} />
            </button>

            {/* Zone de prévisualisation (Drag & Drop) */}
            <div className="flex-1 bg-gray-200 relative overflow-hidden flex items-center justify-center border-b border-gray-300 md:border-b-0 md:border-r">
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative w-[300px] h-[400px]">
                <img 
                  src={product.custom_image_url ? (product.custom_image_url.startsWith('http') ? product.custom_image_url : `http://localhost:8000${product.custom_image_url}`) : (product.image_url?.startsWith('http') ? product.image_url : `http://localhost:8000${product.image_url}`)} 
                  alt={product.name} 
                  className="w-full h-full object-contain pointer-events-none drop-shadow-2xl" 
                />
                
                <Rnd
                  size={{ width: 'auto', height: 'auto' }}
                  position={{ x: namePos.x, y: namePos.y }}
                  onDragStop={(e, d) => setNamePos({ x: d.x, y: d.y })}
                  bounds="parent"
                  className="cursor-move hover:ring-2 hover:ring-royal-green-500/50 rounded transition-shadow"
                >
                  <div style={{ fontFamily: font, color: color, fontSize: `${nameSize}px`, lineHeight: 1 }} className="font-bold uppercase drop-shadow-md whitespace-nowrap">
                    {name}
                  </div>
                </Rnd>

                <Rnd
                  size={{ width: 'auto', height: 'auto' }}
                  position={{ x: numPos.x, y: numPos.y }}
                  onDragStop={(e, d) => setNumPos({ x: d.x, y: d.y })}
                  bounds="parent"
                  className="cursor-move hover:ring-2 hover:ring-royal-green-500/50 rounded transition-shadow"
                >
                  <div style={{ fontFamily: font, color: color, fontSize: `${numberSize}px`, lineHeight: 1 }} className="font-black drop-shadow-md whitespace-nowrap">
                    {number}
                  </div>
                </Rnd>
              </div>
            </div>

            {/* Contrôles */}
            <div className="w-full md:w-[400px] p-8 flex flex-col justify-between overflow-y-auto bg-gray-900 border-l border-gray-800">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-wider">Configuration</h3>
                  <p className="text-sm text-gray-400">Opérez vos réglages tactiques.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Nom sur le maillot</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={12} className="w-full p-3 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Numéro</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))} maxLength={2} className="w-full p-3 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] outline-none transition-all" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Taille du Maillot</label>
                    <select value={choiceSize} onChange={(e) => setChoiceSize(e.target.value)} className="w-full p-3 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] outline-none transition-all cursor-pointer font-bold text-center">
                      <option value="S">S - Small</option>
                      <option value="M">M - Medium</option>
                      <option value="L">L - Large</option>
                      <option value="XL">XL - Extra Large</option>
                      <option value="XXL">XXL - Double Extra Large</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Police</label>
                      <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full p-3 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] outline-none transition-all cursor-pointer">
                        <option value="Arial">Standard (Arial)</option>
                        <option value="Impact">Sport (Impact)</option>
                        <option value="Times New Roman">Classique (Times)</option>
                      </select>
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Couleur</label>
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-[50px] p-1 bg-gray-950 border border-gray-800 rounded-xl cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Taille Nom: {nameSize}px</label>
                      <input type="range" min="12" max="60" value={nameSize} onChange={(e) => setNameSize(e.target.value)} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-royal-green-500 mt-3" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Taille N°: {numberSize}px</label>
                      <input type="range" min="20" max="150" value={numberSize} onChange={(e) => setNumberSize(e.target.value)} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-royal-green-500 mt-3" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="mt-8 w-full py-4 text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all block text-center bg-gray-800 border border-gray-700 hover:bg-gray-900 hover:text-royal-green-400 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1"
              >
                Intégrer au Panier
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
