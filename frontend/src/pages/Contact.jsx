import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Le backend attend {name, email, message}. On combine Subject et Message ici.
      const payload = {
        name: formData.name,
        email: formData.email,
        message: `Sujet: ${formData.subject}\n\n${formData.message}`
      };
      
      await axios.post('http://localhost:8000/api/contact', payload);
      setStatus({ success: true, message: 'Votre message a été envoyé avec succès ! Nous vous répondrons très vite.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ success: false, message: 'Désolé, une erreur est survenue lors de l\'envoi du message.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-royal-green-900 mb-6">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question sur une commande ? Besoin d'aide pour une personnalisation ? Notre équipe est là pour vous répondre du bout des doigts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations de contact (Mock) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-royal-green-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Adresse</h4>
                    <p className="text-gray-600 mt-1">123 Avenue Mohammed V<br/>Casablanca, 20000<br/>Maroc</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-royal-green-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600 mt-1">+212 6 12 34 56 78</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-royal-green-600 w-6 h-6 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">contact@tenuedyali.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h3>
              
              {status.message && (
                <div className={`p-4 rounded-xl mb-6 font-bold ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-royal-green-500 outline-none"></textarea>
                </div>
                <button type="submit" className="w-full md:w-auto px-8 py-4 gradient-royal text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-royal-green-500/30 transform hover:-translate-y-1 transition flex items-center justify-center">
                  <Send className="mr-2 w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
