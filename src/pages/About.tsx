import { Helmet } from 'react-helmet-async';
import { Leaf, Heart, Award, Truck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>À propos — CannaZen</title>
        <meta name="description" content="Découvrez CannaZen, boutique de CBD premium à Strasbourg. Notre vision, nos valeurs et notre engagement pour un cannabis légal de qualité." />
        <meta property="og:title" content="À propos — CannaZen" />
        <meta property="og:image" content="/logo-cannazen.png" />
      </Helmet>
      <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#2c2520] italic">
        À propos de CannaZen
      </h1>
      <p className="text-[#7a7267] text-base mb-12 font-light">Notre vision, nos valeurs, notre engagement.</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#2c2520] italic mb-4">Notre Vision</h2>
        <p className="text-[#7a7267] leading-relaxed mb-4 font-light">
          CannaZen est née d'une conviction simple : le cannabis légal mérite une approche premium, transparente et respectueuse. Nous sélectionnons les meilleurs produits CBD, D10 et OH+ pour vous offrir une expérience unique.
        </p>
        <p className="text-[#7a7267] leading-relaxed font-light">
          Basés à Strasbourg, nous travaillons directement avec les meilleurs producteurs et fournisseurs pour garantir la qualité de chaque produit. Notre engagement : zéro compromis sur la qualité, des prix justes et un service irréprochable.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Leaf, title: "Qualité Premium", desc: "Chaque produit est rigoureusement sélectionné et testé. Nous ne proposons que le meilleur." },
          { icon: Heart, title: "Transparence", desc: "THC < 0.3%, analyses disponibles, traçabilité complète. Aucun secret, que de la confiance." },
          { icon: Award, title: "Expertise", desc: "Notre équipe de passionnés vous conseille et vous guide vers les produits adaptés à vos besoins." },
          { icon: Truck, title: "Livraison Rapide", desc: "Expédition Colissimo sous 24h. Livraison gratuite dès 49€ d'achat. Emballage discret." },
        ].map((item, i) => (
          <div key={i} className="bg-white/80 border border-[#e8efe4]/50 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#e8efe4]/50 flex items-center justify-center mb-3">
              <item.icon size={20} className="text-[#6b8f5e]" />
            </div>
            <h3 className="font-semibold text-[#2c2520] mb-2">{item.title}</h3>
            <p className="text-sm text-[#7a7267] font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="bg-[#f5ecd7]/30 border border-[#c4a35a]/15 rounded-2xl p-8 shadow-sm mb-12">
        <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#2c2520] italic mb-4">Le Sommelier CannaZen</h2>
        <p className="text-[#7a7267] leading-relaxed font-light mb-4">
          Notre outil exclusif, le Smokellier, est votre conseiller personnel. Basé sur notre expertise, il vous guide vers les produits les plus adaptés à vos envies : détente, énergie, créativité ou sommeil.
        </p>
        <p className="text-sm text-[#c4a35a] font-medium italic">Disponible en bas à droite de chaque page — essayez-le !</p>
      </section>

      <section className="bg-white/80 border border-[#e8efe4]/50 rounded-2xl p-8 shadow-sm">
        <h2 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#2c2520] italic mb-4">Contact</h2>
        <div className="text-sm text-[#7a7267] space-y-1 font-light">
          <p>CannaZen — Benkiran Hatim</p>
          <p>11 rue de Tourraine, 67100 Strasbourg</p>
          <p>Email : <a href="mailto:contact@cannazen.space" className="text-[#6b8f5e] hover:underline">contact@cannazen.space</a></p>
        </div>
      </section>
    </div>
  );
}
