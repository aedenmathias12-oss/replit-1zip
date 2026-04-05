import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center fade-in-up">
      <Helmet>
        <title>Page introuvable — CannaZen</title>
      </Helmet>
      <div className="text-7xl mb-6">🌿</div>
      <h1 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#2c2520] italic mb-3">
        Page introuvable
      </h1>
      <p className="text-[#7a7267] mb-8 font-light leading-relaxed">
        Cette page n'existe pas ou a été déplacée. Pas d'inquiétude, notre jardin vous attend.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#6b8f5e]/20"
        >
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
        <Link
          to="/boutique"
          className="inline-flex items-center justify-center gap-2 bg-white border border-[#e8efe4]/50 text-[#2c2520] px-6 py-3 rounded-xl font-semibold hover:border-[#6b8f5e]/30 transition-colors"
        >
          Voir la boutique
        </Link>
      </div>
    </div>
  );
}
