import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      const response = await axios.post('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/login', {
        username: loginUsername,
        password: loginPassword
      });
      setAuth(response.data.user, response.data.access_token);

      if (response.data.user.is_admin) {
        navigate('/admin');
      } else {
        navigate(location.state?.from || '/');
      }
    } catch (err) {
      setError('Identifiants incorrects. Accès refusé.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/register', {
        name: regName,
        username: regUsername,
        email: regEmail,
        telephon: regTelephon,
        password: regPassword
      });
      setAuth(response.data.user, response.data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur système lors de l\'enregistrement.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-royal-green-900/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        className="bg-gray-900 border border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center space-x-6 mb-10 border-b border-gray-800">
          <button
            className={`text-sm uppercase tracking-widest font-extrabold pb-4 border-b-2 transition-all ${isLogin ? 'text-royal-green-500 border-royal-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Se Connecter
          </button>
          <button
            className={`text-sm uppercase tracking-widest font-extrabold pb-4 border-b-2 transition-all ${!isLogin ? 'text-royal-green-500 border-royal-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            S'inscrire
          </button>
        </div>

        {error && <div className="bg-red-900/30 text-red-500 border border-red-800 p-3 rounded-lg text-sm text-center mb-6 font-bold uppercase tracking-wider">{error}</div>}

        {isLogin ? (
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Nom d'utilisateur</label>
              <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Mot de passe</label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none transition-all" />
            </div>
            <button type="submit" className="w-full py-4 text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all block text-center bg-gray-800 border border-gray-700 hover:bg-gray-900 hover:text-royal-green-400 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 mt-8">
              Connexion
            </button>
          </motion.form>
        ) : (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleRegister}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Nom Complet</label>
              <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Nom d'utilisateur</label>
                <input type="text" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Téléphone</label>
                <input type="tel" value={regTelephon} onChange={(e) => setRegTelephon(e.target.value)} required placeholder="Ex: 0611223344" className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Adresse Email</label>
              <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Mot de passe (Min 8)</label>
              <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={8} className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-royal-green-500 outline-none transition-all" />
            </div>
            <button type="submit" className="w-full py-4 text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all block text-center bg-gray-800 border border-gray-700 hover:bg-gray-900 hover:text-royal-green-400 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 mt-6">
              S'inscrire
            </button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
}
