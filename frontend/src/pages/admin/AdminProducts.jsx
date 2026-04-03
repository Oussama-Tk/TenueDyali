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
      const res = await axios.get('http://localhost:8000/api/products');
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
        await axios.post(`http://localhost:8000/api/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Produit modifié !');
      } else {
        await axios.post('http://localhost:8000/api/products', formData, {
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
    if (window.confirm('Voulez-vous supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {editingId ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
        </h2>
        <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none" />
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="isAvailable" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-5 h-5 text-royal-green-600 rounded border-gray-300 focus:ring-royal-green-500 cursor-pointer" />
              <label htmlFor="isAvailable" className="ml-2 block text-sm font-bold text-gray-900 cursor-pointer">
                Disponible à la vente
              </label>
            </div>
          </div>
          
          <div className="space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Photo Principale (Vitrine)</label>
                <div className="mt-1 flex justify-center px-4 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-xl hover:border-royal-green-500 transition cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-xs text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-royal-green-600 hover:text-royal-green-500">
                        <span>Upload Vitrine</span>
                        <input type="file" className="sr-only" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                      </label>
                    </div>
                    {image && <p className="text-xs font-semibold text-royal-green-600 truncate mt-1">{image.name}</p>}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Photo Dos (Personnalisation)</label>
                <div className="mt-1 flex justify-center px-4 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 transition cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-xs text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload Dos</span>
                        <input type="file" className="sr-only" onChange={(e) => setCustomImage(e.target.files[0])} accept="image/*" />
                      </label>
                    </div>
                    {customImage && <p className="text-xs font-semibold text-blue-600 truncate mt-1">{customImage.name}</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <button type="submit" className="w-full py-4 gradient-royal text-white rounded-xl font-bold shadow-lg hover:shadow-royal-green-500/30 transform hover:-translate-y-1 transition mt-auto">
              Sauvegarder le produit
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Catalogue Actuel</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left tracking-wider">Image Principale</th>
                <th className="px-6 py-3 text-left tracking-wider">Image Dos</th>
                <th className="px-6 py-3 text-left tracking-wider">Détails</th>
                <th className="px-6 py-3 text-left tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.image_url ? <img src={`http://localhost:8000${p.image_url}`} alt={p.name} className="h-12 w-12 object-cover rounded-md" /> : <span className="text-gray-400">N/A</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.custom_image_url ? <img src={`http://localhost:8000${p.custom_image_url}`} alt="Dos" className="h-12 w-12 object-cover rounded-md border border-blue-200" /> : <span className="text-gray-400">Aucune</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    <div>{p.name}</div>
                    <div className="text-gray-500 text-sm">{p.price} €</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.is_available ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"><CheckCircle size={14} className="mr-1"/> Disponible</span>
                    ) : (
                      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full"><XCircle size={14} className="mr-1"/> Épuisé</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg font-bold">
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg">
                      <Trash2 size={20} />
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
