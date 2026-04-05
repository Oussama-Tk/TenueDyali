import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('https://api-tenuedyali-auaqexd7b2ajfbd7.canadacentral-01.azurewebsites.net/api/admin/messages');
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Transmissions Interceptées</h2>
      <div className="space-y-4">
        {messages.length === 0 ? <p className="text-gray-500 font-light italic">Aucun signal reçu.</p> : messages.map(msg => (
          <div key={msg.id} className="border border-gray-800 bg-gray-950 rounded-2xl p-6 hover:border-royal-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all">
            <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-800 pb-3">
              <h3 className="font-bold text-white tracking-wide uppercase">{msg.name} <span className="text-royal-green-500 text-sm font-normal lowercase tracking-normal ml-2">&lt;{msg.email}&gt;</span></h3>
              <span className="text-xs text-gray-500 font-bold tracking-widest mt-2 md:mt-0">{new Date(msg.created_at).toLocaleString()}</span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap font-light leading-relaxed">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
