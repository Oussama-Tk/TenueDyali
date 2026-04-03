import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-royal-green-900 mb-8">Boutique Officielle</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl smooth-transitions transform hover:-translate-y-2 group">
              <div className="bg-gray-100 rounded-xl mb-4 overflow-hidden h-64 flex items-center justify-center relative">
                <img 
                  src={p.image_url?.startsWith('http') ? p.image_url : `http://localhost:8000${p.image_url}`} 
                  alt={p.name} 
                  className={`h-full w-full object-cover group-hover:scale-110 smooth-transitions ${p.is_available === 0 ? 'grayscale opacity-50' : ''}`} 
                />
                {!p.is_available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg rotate-12 drop-shadow-xl text-lg">ÉPUISÉ</span>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
              <p className="text-lg font-semibold text-royal-green-600 mt-2">{p.price} €</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
