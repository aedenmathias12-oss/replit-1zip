import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import { useAuth } from '../../lib/AuthContext';
import CartDrawer from '../cart/CartDrawer';
import MobileMenu from './MobileMenu';
import UserMenu from '../auth/UserMenu';
import Logo from '../ui/Logo';

const navItems = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Fleurs', children: [
      { label: 'Fleurs CBD', to: '/boutique?cat=fleurs-cbd' },
      { label: 'Fleurs D10', to: '/boutique?cat=fleurs-d10' },
      { label: 'Fleurs OH+', to: '/boutique?cat=fleurs-oh' },
    ]
  },
  { label: 'Résines', to: '/boutique?cat=resines-d10' },
  {
    label: 'Vapes', children: [
      { label: 'Vapes OH+', to: '/boutique?cat=vapes' },
      { label: 'Vapes HEC10', to: '/boutique?cat=vapes' },
    ]
  },
  { label: 'Huiles', to: '/boutique?cat=huiles-cbd' },
  { label: 'Gummies', to: '/boutique?cat=gummies-d9' },
  { label: 'Boutique', to: '/boutique' },
];

function DropdownMenu({ item, onClose }: { item: typeof navItems[0]; onClose: () => void }) {
  if (!('children' in item) || !item.children) return null;
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[#f7f3ec] border border-[#e8efe4]/50 rounded-lg shadow-lg overflow-hidden py-1 min-w-[180px] z-50">
      {item.children.map(child => (
        <Link
          key={child.label}
          to={child.to}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-[#7a7267] hover:bg-[#e8efe4]/30 hover:text-[#2c2520] transition-colors"
        >
          {child.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => () => { if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current); }, []);

  return (
    <>
      <div className="relative bg-[#3d5a3a]/90 text-[#f7f3ec] text-[11px] font-light py-2.5 overflow-hidden whitespace-nowrap tracking-widest">
        <div className="inline-flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="inline-flex items-center">
              <span className="inline-flex items-center gap-1.5 mx-8 opacity-80"><span className="font-light italic">Livraison offerte dès 49€</span></span>
              <span className="inline-flex items-center gap-1.5 mx-8 opacity-80"><span className="font-light italic">THC &lt; 0.3% · 100% Légal</span></span>
              <span className="inline-flex items-center gap-1.5 mx-8 opacity-80"><span className="font-light italic">Cannabis d'exception cultivé avec soin</span></span>
              <span className="inline-flex items-center gap-1.5 mx-8 opacity-80"><span className="font-light italic">Expédition sous 24h</span></span>
              <span className="inline-flex items-center gap-1.5 mx-8 opacity-80"><span className="font-light italic">Gamme complète CBD · D10 · OH+</span></span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#f7f3ec]/90 backdrop-blur-md border-b border-[#e8efe4]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu" className="lg:hidden p-1.5 text-[#7a7267] hover:text-[#2c2520] transition-colors">
                <Menu size={20} />
              </button>
              <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Rechercher" className="p-1.5 text-[#7a7267] hover:text-[#2c2520] transition-colors">
                <Search size={20} />
              </button>
            </div>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <Logo variant="dark" />
            </Link>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link
                  to="/connexion"
                  aria-label="Mon compte"
                  className="p-1.5 text-[#7a7267] hover:text-[#2c2520] transition-colors"
                >
                  <User size={20} />
                </Link>
              )}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Ouvrir le panier"
                className="relative p-1.5 text-[#7a7267] hover:text-[#2c2520] transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6b8f5e] text-white text-[9px] font-semibold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex justify-center border-t border-[#e8efe4]/30 py-2 bg-[#f7f3ec]/50">
          <div className="flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] text-[#7a7267]">
            {navItems.map(item => {
              const hasChildren = 'children' in item && item.children;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleDropdownLeave()}
                >
                  {'to' in item && item.to ? (
                    <Link to={item.to} className="hover:text-[#2c2520] py-1.5 transition-colors uppercase">
                      {item.label}
                    </Link>
                  ) : (
                    <button className="hover:text-[#2c2520] py-1.5 transition-colors uppercase flex items-center gap-1">
                      {item.label} <ChevronDown size={10} />
                    </button>
                  )}
                  {hasChildren && openDropdown === item.label && (
                    <DropdownMenu item={item} onClose={() => setOpenDropdown(null)} />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {searchOpen && (
          <div className="border-t border-[#e8efe4]/30 px-4 py-3 bg-[#f7f3ec]">
            <form onSubmit={handleSearch} className="max-w-lg mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="flex-1 bg-white/60 border border-[#e8efe4]/60 rounded-xl px-4 py-2.5 text-sm text-[#2c2520] placeholder:text-[#7a7267]/50 focus:outline-none focus:border-[#6b8f5e] focus:ring-1 focus:ring-[#6b8f5e]/30"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Fermer la recherche" className="p-2 text-[#7a7267] hover:text-[#2c2520]">
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
