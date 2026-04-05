import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[90] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } ${type === 'success' ? 'bg-white border-[#6b8f5e]/20 shadow-[#6b8f5e]/10' : 'bg-white border-red-200 shadow-red-500/10'}`}>
      {type === 'success' ? (
        <Check size={16} className="text-[#6b8f5e]" />
      ) : (
        <X size={16} className="text-red-500" />
      )}
      <span className="text-sm text-[#2c2520]">{message}</span>
    </div>
  );
}
