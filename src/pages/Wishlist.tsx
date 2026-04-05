import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { removeFromWishlist } from '../lib/supabaseDb';
import { useCart } from '../lib/CartContext';
import { products } from '../data/products';
import AuthGuard from '../components/auth/AuthGuard';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import toast from 'react-hot-toast';

function WishlistContent() {
  const { user, profile, refreshProfile } = useAuth();
  const { addToCart } = useCart();

  const wishlistProducts = (profile?.wishlist || [])
    .map(id => products.find(p => String(p.id) === id))
    .filter(Boolean) as typeof products;

  const handleRemove = async (productId: number) => {
    if (!user) return;
    try {
      await removeFromWishlist(user.id, String(productId));
      await refreshProfile();
      toast.success('Retiré des favoris');
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, product.prices[0], 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Mes Favoris — CannaZen</title>
        <meta name="description" content="Retrouvez vos produits favoris CannaZen" />
      </Helmet>

      <Breadcrumbs items={[{ label: 'Favoris' }]} />

      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">
        Mes Favoris
      </h1>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#e8efe4]/30">
            <Heart className="h-10 w-10 text-[#6b8f5e]/40" />
          </div>
          <h2 className="text-lg font-medium text-[#2c2520] mb-2">Votre liste de favoris est vide</h2>
          <p className="text-sm text-[#7a7267] font-light mb-6">Ajoutez des produits à vos favoris pour les retrouver facilement</p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md shadow-[#6b8f5e]/20"
          >
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-4 bg-white/80 border border-[#e8efe4]/50 rounded-xl p-4 shadow-sm">
              <Link to={`/boutique/${product.slug}`} className="shrink-0">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/boutique/${product.slug}`} className="block">
                  <h3 className="font-medium text-[#2c2520] truncate hover:text-[#6b8f5e] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-[#7a7267] font-light mt-0.5">{product.category}</p>
                <p className="text-[#6b8f5e] font-semibold mt-1">{product.prices[0].amount.toFixed(2)} €</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-1.5 bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden sm:inline">Ajouter</span>
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="p-2 text-[#7a7267] hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  aria-label="Retirer des favoris"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Wishlist() {
  return (
    <AuthGuard>
      <WishlistContent />
    </AuthGuard>
  );
}
