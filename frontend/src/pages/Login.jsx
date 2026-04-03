import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  // States Login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // States Register
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regTelephon, setRegTelephon] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username: loginUsername,
        password: loginPassword
      });
      setAuth(response.data.user, response.data.access_token);
      
      if (response.data.user.is_admin) {
        navigate('/admin');
      } else {
        // Rediriger vers l'accueil ou vers le panier si l'utilisateur venait de là-bas
        navigate(location.state?.from || '/');
      }
    } catch (err) {
      setError('Identifiants incorrects.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: regName,
        username: regUsername,
        email: regEmail,
        telephon: regTelephon,
        password: regPassword
      });
      setAuth(response.data.user, response.data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            className={`text-xl font-extrabold pb-2 border-b-4 ${isLogin ? 'text-royal-green-900 border-royal-green-600' : 'text-gray-400 border-transparent'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Connexion
          </button>
          <button 
            className={`text-xl font-extrabold pb-2 border-b-4 ${!isLogin ? 'text-royal-green-900 border-royal-green-600' : 'text-gray-400 border-transparent'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            Inscription
          </button>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
              <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
            </div>
            <button type="submit" className="w-full py-3 gradient-royal text-white rounded-xl font-bold shadow-lg hover:shadow-royal-green-500/30 transform hover:-translate-y-1 transition">
              Se connecter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
              <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                <input type="text" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="tel" value={regTelephon} onChange={(e) => setRegTelephon(e.target.value)} required placeholder="Ex: 0612345678" className="w-full p-2 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
              <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe (Min 8 caractères)</label>
              <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={8} className="w-full p-2 border border-gray-300 rounded-xl focus:ring-royal-green-500 focus:border-royal-green-500" />
            </div>
            <button type="submit" className="w-full py-3 mt-4 gradient-royal text-white rounded-xl font-bold shadow-lg hover:shadow-royal-green-500/30 transform hover:-translate-y-1 transition">
              Créer mon compte
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
