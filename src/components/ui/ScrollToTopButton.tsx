import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut de page"
      className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-[#6b8f5e] text-white shadow-lg shadow-[#6b8f5e]/20 hover:bg-[#4a6741] transition-all flex items-center justify-center opacity-90 hover:opacity-100"
    >
      <ArrowUp size={18} />
    </button>
  );
}
