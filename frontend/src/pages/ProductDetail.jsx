import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import CustomizationTool from '../components/CustomizationTool';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="pt-32 text-center text-xl font-bold">Chargement...</div>;

  const isAvailable = product.is_available === 1 || product.is_available === true;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 bg-gray-100 flex items-center justify-center">
            <img 
              src={product.image_url?.startsWith('http') ? product.image_url : `http://localhost:8000${product.image_url}`} 
              alt={product.name} 
              className={`max-w-full h-auto max-h-96 object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-500 ${!isAvailable && 'grayscale opacity-75'}`} 
            />
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="mb-4">
              {isAvailable ? (
                <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full"><CheckCircle size={16} className="mr-2"/> Disponible</span>
              ) : (
                <span className="inline-flex items-center bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full"><XCircle size={16} className="mr-2"/> Rupture de Stock</span>
              )}
            </div>
          
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-royal-green-600 mb-6">{product.price} €</p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-wrap">{product.description}</p>
            
            <button 
              onClick={() => setIsCustomizing(true)}
              disabled={!isAvailable}
              className={`w-full py-4 rounded-xl font-bold text-xl shadow-xl transform transition ${isAvailable ? 'gradient-royal text-white hover:shadow-royal-green-500/40 hover:-translate-y-1' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isAvailable ? 'Personnaliser ce maillot' : 'Actuellement Indisponible'}
            </button>
          </div>
        </div>
      </div>

      <CustomizationTool 
        product={product} 
        isOpen={isCustomizing} 
        onClose={() => setIsCustomizing(false)} 
      />
    </div>
  );
}
