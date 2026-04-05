import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';

export default function Confirmation() {
  const { id } = useParams();

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center fade-in-up">
      <Helmet><title>Commande confirmée — CannaZen</title></Helmet>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e8efe4] mb-5">
        <CheckCircle size={32} className="text-[#6b8f5e]" />
      </div>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-3">Commande confirmée !</h1>
      <p className="text-[#7a7267] mb-2 font-light">Merci pour votre commande</p>
      <p className="text-lg font-semibold text-[#6b8f5e] mb-8">Numéro : {id}</p>
      <p className="text-sm text-[#7a7267] mb-8 font-light leading-relaxed">
        Vous recevrez un email de confirmation avec les détails de votre commande et les informations de suivi.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/boutique" className="bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#6b8f5e]/20">
          Continuer mes achats
        </Link>
        <Link to="/" className="bg-white border border-[#e8efe4]/50 text-[#2c2520] px-6 py-3 rounded-xl font-semibold hover:border-[#6b8f5e]/30 transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
