import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Upload, CheckCircle, XCircle } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description || '');
    setIsAvailable(p.is_available === 1 || p.is_available === true);
    setImage(null);
    setCustomImage(null);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('is_available', isAvailable ? '1' : '0');
    if (image) formData.append('image', image);
    if (customImage) formData.append('custom_image', customImage);

    try {
      if (editingId) {
        formData.append('_method', 'PUT');
        await axios.post(`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Produit modifié !');
      } else {
        await axios.post('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Produit ajouté !');
      }

      setEditingId(null);
      setName(''); setPrice(''); setDescription(''); setImage(null); setCustomImage(null); setIsAvailable(true);
      fetchProducts();
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression de cette pièce ?')) {
      try {
        await axios.delete(`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
          {editingId ? 'Mise à jour du produit' : 'Nouvelle entrée au catalogue'}
        </h2>
        <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Désignation</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Investissement (MAD)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Spécifications Technique</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 outline-none transition-all" />
            </div>
            <div className="flex items-center mt-4 bg-gray-950 border border-gray-800 p-4 rounded-xl">
              <input type="checkbox" id="isAvailable" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-5 h-5 text-royal-green-500 bg-gray-900 border-gray-700 rounded focus:ring-royal-green-500 cursor-pointer" />
              <label htmlFor="isAvailable" className="ml-3 block text-sm font-bold text-gray-200 cursor-pointer uppercase tracking-wider">
                Déploiement Autorisé (Disponible)
              </label>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Face (Vitrine)</label>
                <div className="mt-1 flex justify-center px-4 pt-5 pb-5 bg-gray-950 border-2 border-gray-800 border-dashed rounded-xl hover:border-royal-green-500 transition-colors cursor-pointer group">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-600 group-hover:text-royal-green-500 transition-colors" />
                    <div className="flex text-xs text-gray-500 justify-center">
                      <label className="relative cursor-pointer font-medium text-royal-green-500 hover:text-royal-green-400">
                        <span>Sélectionner</span>
                        <input type="file" className="sr-only" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                      </label>
                    </div>
                    {image && <p className="text-xs font-semibold text-royal-green-400 truncate mt-1">{image.name}</p>}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Dos (Custom)</label>
                <div className="mt-1 flex justify-center px-4 pt-5 pb-5 bg-gray-950 border-2 border-gray-800 border-dashed rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-600 group-hover:text-blue-500 transition-colors" />
                    <div className="flex text-xs text-gray-500 justify-center">
                      <label className="relative cursor-pointer font-medium text-blue-500 hover:text-blue-400">
                        <span>Sélectionner</span>
                        <input type="file" className="sr-only" onChange={(e) => setCustomImage(e.target.files[0])} accept="image/*" />
                      </label>
                    </div>
                    {customImage && <p className="text-xs font-semibold text-blue-400 truncate mt-1">{customImage.name}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-5 bg-gray-800 border border-gray-700 text-white rounded-xl font-bold uppercase tracking-widest shadow-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:border-royal-green-500 hover:-translate-y-1 transition-all mt-auto">
              Confirmer l'opération
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Inventaire Actif</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Visuel A</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Visuel B</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Identification</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Procédures</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.image_url ? <img src={`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${p.image_url}`} alt={p.name} className="h-14 w-14 object-cover rounded-md border border-gray-700 shadow-md" /> : <span className="text-gray-600 text-sm italic">Aucun</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.custom_image_url ? <img src={`https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net${p.custom_image_url}`} alt="Dos" className="h-14 w-14 object-cover rounded-md border border-blue-900 shadow-md" /> : <span className="text-gray-600 text-sm italic">Aucun</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-white uppercase tracking-wider">{p.name}</div>
                    <div className="text-royal-green-500 font-medium text-sm mt-1">{p.price} MAD</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.is_available ? (
                      <span className="inline-flex items-center bg-green-900/30 text-green-400 border border-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"><CheckCircle size={14} className="mr-1.5" /> Disp.</span>
                    ) : (
                      <span className="inline-flex items-center bg-red-900/30 text-red-400 border border-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"><XCircle size={14} className="mr-1.5" /> H.S.</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                    <button onClick={() => handleEdit(p)} className="text-blue-400 hover:text-white bg-blue-900/30 border border-blue-800 hover:bg-blue-600 transition-colors px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider">
                      Modif
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-white bg-red-900/30 border border-red-800 hover:bg-red-600 transition-colors px-3 py-1.5 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
