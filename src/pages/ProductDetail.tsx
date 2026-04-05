import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Minus, Plus, ShoppingCart, Shield, Truck, Package, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { addToWishlist, removeFromWishlist } from '../lib/supabaseDb';
import ProductCard from '../components/shop/ProductCard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const { user, profile, refreshProfile } = useAuth();
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productIdStr = product ? String(product.id) : '';
  const isInWishlist = product ? (profile?.wishlist || []).includes(productIdStr) : false;

  const toggleWishlist = async () => {
    if (!product || !user) {
      toast.error('Connectez-vous pour ajouter aux favoris');
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist(user.id, productIdStr);
        toast.success('Retiré des favoris');
      } else {
        await addToWishlist(user.id, productIdStr);
        toast.success('Ajouté aux favoris');
      }
      await refreshProfile();
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="font-['Cormorant_Garamond'] text-2xl font-semibold mb-4 text-[#2c2520] italic">Produit non trouvé</h1>
        <p className="text-[#7a7267] mb-6 font-light">Ce produit n'existe pas ou n'est plus disponible.</p>
        <Link to="/boutique" className="inline-flex items-center gap-2 bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const selectedPrice = product.prices[selectedPriceIndex];
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const alsoLike = related.length < 4
    ? [...related, ...products.filter(p => p.id !== product.id && !related.find(r => r.id === p.id)).slice(0, 4 - related.length)]
    : related;

  const handleAddToCart = () => {
    addToCart(product, selectedPrice, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>{product.name} — CannaZen</title>
        <meta name="description" content={`${product.name} — ${product.description.slice(0, 150)}`} />
        <meta property="og:title" content={`${product.name} — CannaZen`} />
        <meta property="og:description" content={product.description.slice(0, 150)} />
        <meta property="og:image" content={product.image} />
      </Helmet>

      <Breadcrumbs items={[
        { label: 'Boutique', to: '/boutique' },
        { label: product.category, to: `/boutique?cat=${product.categorySlug}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <div className="relative aspect-square bg-gradient-to-br from-[#e8efe4]/40 via-[#f7f3ec] to-[#f5ecd7]/20 rounded-2xl overflow-hidden border border-[#e8efe4]/40 flex items-center justify-center group">
          <img
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-[#6b8f5e]/85 text-white backdrop-blur-sm tracking-wider">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full bg-[#8b7355]/85 text-white backdrop-blur-sm">
              NOUVEAU
            </span>
          )}
        </div>

        <div>
          <p className="text-[10px] font-medium tracking-[0.15em] text-[#7a7267]/60 uppercase mb-1">{product.category}</p>
          <h1 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#2c2520] italic mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.round(product.rating) ? 'fill-[#c4a35a] text-[#c4a35a]' : 'text-[#e8efe4]'} />
              ))}
            </div>
            <span className="text-sm text-[#7a7267] font-light">{product.rating} ({product.reviewCount} avis)</span>
          </div>

          <p className="text-[#7a7267] mb-6 font-light leading-relaxed">{product.description}</p>

          <div className="mb-4">
            <p className="text-xs font-medium tracking-wider text-[#7a7267]/60 uppercase mb-2">Effets</p>
            <div className="flex flex-wrap gap-2">
              {product.effects.map(effect => (
                <span key={effect} className="bg-[#e8efe4]/60 text-[#6b8f5e] text-xs font-medium px-3 py-1.5 rounded-full">{effect}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium tracking-wider text-[#7a7267]/60 uppercase mb-2">Intensité</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-[#e8efe4] rounded-full overflow-hidden">
                <div className="h-full bg-[#6b8f5e] rounded-full transition-all duration-500" style={{ width: `${(product.intensity / 5) * 100}%` }} />
              </div>
              <span className="text-xs text-[#7a7267] font-light">{product.intensity}/5</span>
            </div>
          </div>

          {product.prices.length > 1 && (
            <div className="mb-6">
              <p className="text-xs font-medium tracking-wider text-[#7a7267]/60 uppercase mb-2">Format</p>
              <div className="flex flex-wrap gap-2">
                {product.prices.map((price, i) => (
                  <button
                    key={price.label}
                    onClick={() => setSelectedPriceIndex(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      selectedPriceIndex === i
                        ? 'bg-[#6b8f5e] text-white border-[#6b8f5e] shadow-md shadow-[#6b8f5e]/20'
                        : 'bg-white text-[#7a7267] border-[#e8efe4]/50 hover:border-[#6b8f5e]/30'
                    }`}
                  >
                    {price.label} — {price.amount.toFixed(2)}€
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-3xl font-semibold text-[#6b8f5e] mb-6">{selectedPrice.amount.toFixed(2)}€</div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3 bg-[#f7f3ec] border border-[#e8efe4]/40 rounded-xl px-3 py-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Réduire la quantité" className="text-[#7a7267] hover:text-[#2c2520]">
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Augmenter la quantité" className="text-[#7a7267] hover:text-[#2c2520]">
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-[#6b8f5e] hover:bg-[#4a6741] text-white py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#6b8f5e]/20 active:scale-[0.98]"
            >
              <ShoppingCart size={18} /> Ajouter au panier
            </button>
            <button
              onClick={toggleWishlist}
              aria-label={isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className={`p-3 rounded-xl border transition-all ${
                isInWishlist
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-white border-[#e8efe4]/50 text-[#7a7267] hover:border-[#6b8f5e]/30 hover:text-red-400'
              }`}
            >
              <Heart size={18} className={isInWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col items-center gap-1 text-center p-3 bg-white/50 rounded-xl border border-[#e8efe4]/30">
              <Truck size={16} className="text-[#6b8f5e]" />
              <span className="text-[10px] text-[#7a7267] font-light">Livraison 24h</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center p-3 bg-white/50 rounded-xl border border-[#e8efe4]/30">
              <Shield size={16} className="text-[#6b8f5e]" />
              <span className="text-[10px] text-[#7a7267] font-light">THC &lt; 0.3%</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center p-3 bg-white/50 rounded-xl border border-[#e8efe4]/30">
              <Package size={16} className="text-[#6b8f5e]" />
              <span className="text-[10px] text-[#7a7267] font-light">Discret</span>
            </div>
          </div>

          <div className="bg-[#f5ecd7]/30 border border-[#c4a35a]/15 rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#c4a35a] italic mb-2">Le Smokellier recommande</p>
            <p className="text-sm italic text-[#7a7267] font-light leading-relaxed">
              "{product.smokellierQuote}"
            </p>
          </div>
        </div>
      </div>

      {alsoLike.length > 0 && (
        <section>
          <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#2c2520] mb-6 italic">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {alsoLike.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
