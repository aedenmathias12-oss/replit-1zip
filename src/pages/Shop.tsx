import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products, categories } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import CategoryFilter from '../components/shop/CategoryFilter';
import SearchBar from '../components/shop/SearchBar';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', slug);
    }
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setSearchParams(params, { replace: true });
  };

  const handleReset = () => {
    setSearchParams({}, { replace: true });
  };

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.effects.some(e => e.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const activeCat = categories.find(c => c.slug === selectedCategory);
  const pageTitle = activeCat && activeCat.slug !== 'all'
    ? `${activeCat.name} — CannaZen`
    : 'Boutique CBD — CannaZen';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Parcourez notre catalogue de produits CBD premium : fleurs, résines D10, vapes OH+, huiles bio et gummies. Livraison rapide en France." />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content="/logo-cannazen.png" />
      </Helmet>

      <Breadcrumbs items={
        activeCat && activeCat.slug !== 'all'
          ? [{ label: 'Boutique', to: '/boutique' }, { label: activeCat.name }]
          : [{ label: 'Boutique' }]
      } />

      <div className="mb-8">
        <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#2c2520] italic">
          {activeCat && activeCat.slug !== 'all' ? activeCat.name : 'Boutique'}
        </h1>
        <p className="text-[#7a7267] font-light">
          {filtered.length} produit{filtered.length > 1 ? 's' : ''}{filtered.length !== products.length ? ` sur ${products.length}` : ' disponibles'}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <CategoryFilter selected={selectedCategory} onSelect={handleCategoryChange} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-[#7a7267] text-lg font-light mb-2">Aucun produit trouvé</p>
          <p className="text-sm text-[#7a7267]/60 font-light mb-4">Essayez avec d'autres mots-clés ou catégories</p>
          <button
            onClick={handleReset}
            className="text-[#6b8f5e] hover:text-[#4a6741] font-medium text-sm"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
