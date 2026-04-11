import { useToastStore } from '../store/useToastStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[300px] ${
              toast.type === 'success' 
                ? 'bg-gray-900/90 border-royal-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                : 'bg-gray-900/90 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="text-royal-green-500 flex-shrink-0" size={24} />
            ) : (
              <XCircle className="text-red-500 flex-shrink-0" size={24} />
            )}
            <p className="text-white font-medium text-sm flex-1 break-words">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
