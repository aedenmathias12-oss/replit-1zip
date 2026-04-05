import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Shield, Truck, Star, Droplets, Mail, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/shop/ProductCard';

const heroCategories = [
  { emoji: '🌿', name: 'Fleurs CBD', slug: 'fleurs-cbd' },
  { emoji: '💎', name: 'Fleurs D10', slug: 'fleurs-d10' },
  { emoji: '⚡', name: 'Fleurs OH+', slug: 'fleurs-oh' },
  { emoji: '🧱', name: 'Résines D10', slug: 'resines-d10' },
  { emoji: '💨', name: 'Vapes OH+ & HEC10', slug: 'vapes' },
  { emoji: '🫧', name: 'Huiles CBD BIO', slug: 'huiles-cbd' },
  { emoji: '🍬', name: 'Gummies D9', slug: 'gummies-d9' },
];

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div>
      <Helmet>
        <title>CannaZen — CBD Premium, Fleurs, Résines, Huiles & Vapes</title>
        <meta name="description" content="Boutique en ligne de CBD premium — Fleurs, résines, huiles et vapes de qualité supérieure. THC < 0.3%, 100% légal en France. Livraison offerte dès 49€." />
        <meta property="og:title" content="CannaZen — CBD Premium" />
        <meta property="og:description" content="Découvrez notre sélection de produits CBD premium. Fleurs, résines, huiles et vapes de qualité supérieure." />
        <meta property="og:image" content="/logo-cannazen.png" />
      </Helmet>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8efe4]/30 via-[#f7f3ec] to-[#f7f3ec]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto fade-in-up">
          <img
            src="/logo-cannazen.png"
            alt="CannaZen"
            className="mx-auto h-[90px] sm:h-[130px] object-contain mb-5 drop-shadow-md"
          />
          <div className="inline-flex items-center gap-2 bg-[#e8efe4]/60 text-[#4a6741] text-xs font-medium px-4 py-2 rounded-full mb-6 tracking-wider">
            CANNABIS LÉGAL · THC &lt; 0.3%
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2c2520] leading-tight mb-3 italic">
            L'univers de{' '}
            <span className="text-[#6b8f5e]">Mary Jane</span>
          </h1>
          <p className="text-base text-[#7a7267] mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Découvrez notre sélection de produits CBD premium. Fleurs, résines, huiles et vapes de qualité supérieure, cultivés avec soin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/boutique"
              className="inline-flex items-center justify-center gap-2 bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-md shadow-[#6b8f5e]/20"
            >
              Découvrir la boutique <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, text: 'THC < 0.3%', sub: '100% légal en France' },
            { icon: Truck, text: 'Livraison offerte', sub: "Dès 49€ d'achat" },
            { icon: Star, text: 'Qualité premium', sub: 'Sélection rigoureuse' },
            { icon: Droplets, text: "Cannabis d'exception", sub: 'Cultivé avec soin' },
          ].map((item, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm border border-[#e8efe4]/40 rounded-xl p-5 text-center shadow-sm">
              <item.icon size={22} className="text-[#6b8f5e] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#2c2520]">{item.text}</p>
              <p className="text-xs text-[#7a7267] font-light mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-[#2c2520] mb-8 text-center italic">Nos catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {heroCategories.map(cat => (
            <Link
              key={cat.slug}
              to={`/boutique?cat=${cat.slug}`}
              className="bg-white/60 backdrop-blur-sm border border-[#e8efe4]/40 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group shadow-sm"
            >
              <span className="text-3xl mb-3 block">{cat.emoji}</span>
              <h3 className="font-['Cormorant_Garamond'] font-semibold text-sm text-[#2c2520] group-hover:text-[#6b8f5e] transition-colors">{cat.name}</h3>
              <p className="text-xs text-[#7a7267] mt-1 font-light">
                {products.filter(p => p.categorySlug === cat.slug).length} produits
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-[#2c2520] italic">Best-sellers</h2>
          <Link to="/boutique" className="text-[#6b8f5e] text-sm font-medium hover:text-[#4a6741] flex items-center gap-1 transition-colors">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-[#2c2520] italic">Nouveautés</h2>
          <Link to="/boutique" className="text-[#6b8f5e] text-sm font-medium hover:text-[#4a6741] flex items-center gap-1 transition-colors">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#3d5a3a] to-[#2c4430] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative z-10">
            <Mail size={28} className="text-[#e8efe4]/60 mx-auto mb-4" />
            <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-white italic mb-3">
              Restez dans le jardin
            </h2>
            <p className="text-[#e8efe4]/70 font-light mb-8 max-w-md mx-auto">
              Recevez nos nouveautés, offres exclusives et conseils du Smokellier directement dans votre boîte mail.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-[#e8efe4]">
                <CheckCircle size={20} className="text-[#6b8f5e]" />
                <span className="font-medium">Merci ! Vous êtes inscrit(e).</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-[#e8efe4]/40 focus:outline-none focus:border-[#6b8f5e] focus:ring-1 focus:ring-[#6b8f5e]/40 text-sm backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6b8f5e] hover:bg-[#4a6741] text-white rounded-xl font-semibold text-sm transition-colors shadow-md"
                >
                  S'inscrire
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#e8efe4]/30 mt-4 font-light">Pas de spam. Désabonnement en un clic.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
