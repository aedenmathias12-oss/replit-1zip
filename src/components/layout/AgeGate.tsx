import { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, Droplets } from 'lucide-react';

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('cannazen-age-verified');
    if (!verified) setShow(true);
  }, []);

  if (!show) return null;

  const handleYes = () => {
    localStorage.setItem('cannazen-age-verified', 'true');
    setShow(false);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3d5a3a]/60 backdrop-blur-md p-4">
      <div className="bg-[#f7f3ec] rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl shadow-[#3d5a3a]/20 fade-in-up border border-[#e8efe4]/40">
        <div className="mx-auto w-20 h-20 rounded-full bg-[#e8efe4]/50 flex items-center justify-center mb-6 animate-breathe">
          <Leaf size={32} className="text-[#6b8f5e]" />
        </div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl italic text-[#2c2520] mb-3">Bienvenue au jardin</h2>
        <p className="text-[#7a7267] mb-8 text-sm leading-relaxed font-light">
          L'accès à notre collection est réservé aux <span className="text-[#2c2520] font-medium">personnes majeures</span>. Confirmez votre âge pour découvrir l'univers de Mary Jane.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleNo}
            className="w-full py-3.5 px-6 border border-[#e8efe4] rounded-xl text-sm font-medium text-[#7a7267] hover:bg-[#e8efe4]/30 transition-colors"
          >
            J'ai moins de 18 ans
          </button>
          <button
            onClick={handleYes}
            className="w-full py-3.5 px-6 bg-[#6b8f5e] hover:bg-[#4a6741] rounded-xl text-sm font-semibold text-white transition-colors shadow-md shadow-[#6b8f5e]/20"
          >
            Oui, j'ai +18 ans
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-[#7a7267]/50 font-light italic">
          <span className="flex items-center gap-1"><ShieldCheck size={12} /> THC &lt; 0.3%</span>
          <span className="flex items-center gap-1"><Droplets size={12} /> Cannabis légal</span>
        </div>
      </div>
    </div>
  );
}
