import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/messages');
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages Reçus</h2>
      <div className="space-y-4">
        {messages.length === 0 ? <p className="text-gray-500">Aucun message.</p> : messages.map(msg => (
          <div key={msg.id} className="border rounded-xl p-5 hover:bg-gray-50 transition">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">{msg.name} <span className="text-gray-500 text-sm font-normal">({msg.email})</span></h3>
              <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
