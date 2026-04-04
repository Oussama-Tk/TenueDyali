import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: `Sujet: ${formData.subject}\n\n${formData.message}`
      };

      await axios.post('http://localhost:8000/api/contact', payload);
      setStatus({ success: true, message: 'Transmission confirmée. L\'unité de commandement a reçu le message.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ success: false, message: 'Erreur réseau. Échec de la transmission sécurisée.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-green-900/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">Transmission <span className="text-royal-green-500 neon-text">Sécurisée</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Une anomalie tactique ? Un besoin d'équipement spécial ? Établissez la liaison.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider">Antenne Relais</h3>
              <div className="space-y-8">
                <div className="flex items-start group relative">
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 mr-5 group-hover:border-royal-green-500 transition-colors">
                    <MapPin className="text-royal-green-500 w-6 h-6 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300 uppercase text-sm tracking-wider">Base Opérationnelle</h4>
                    <p className="text-gray-500 mt-1 font-light">Av. des Marguerites<br />Tangier, 90000<br />Maroc</p>
                  </div>
                </div>
                <div className="flex items-start group relative">
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 mr-5 group-hover:border-royal-green-500 transition-colors">
                    <Phone className="text-royal-green-500 w-6 h-6 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300 uppercase text-sm tracking-wider">Fréquence Vocale</h4>
                    <p className="text-gray-500 mt-1 font-light">+212 6 67 98 58 87</p>
                  </div>
                </div>
                <div className="flex items-start group relative">
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 mr-5 group-hover:border-royal-green-500 transition-colors">
                    <Mail className="text-royal-green-500 w-6 h-6 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300 uppercase text-sm tracking-wider">Canal Digital</h4>
                    <p className="text-gray-500 mt-1 font-light">tenuedyali@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-royal-green-500/10 blur-3xl rounded-full" />

              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Formulaire de Liaison</h3>
              <p className="text-gray-500 mb-8 font-light">Insérez les données requises pour initialiser le transfert.</p>

              {status.message && (
                <div className={`p-4 rounded-xl mb-8 font-bold border ${status.success ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'} backdrop-blur-sm`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Identifiant</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none transition-all placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Adresse Sécurisée (Email)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none transition-all placeholder-gray-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Objet Tactique</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none transition-all placeholder-gray-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Rapport</label>
                  <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full p-4 bg-gray-950 text-white border border-gray-800 rounded-xl focus:border-royal-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] outline-none transition-all placeholder-gray-600"></textarea>
                </div>
                <button type="submit" className="w-full py-5 text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all block text-center bg-gray-800 border border-gray-700 hover:bg-gray-900 hover:text-royal-green-400 hover:border-royal-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 mt-4">
                  <div className="flex items-center justify-center">
                    <Send className="mr-3 w-5 h-5" />
                    Transmettre le paquet
                  </div>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
