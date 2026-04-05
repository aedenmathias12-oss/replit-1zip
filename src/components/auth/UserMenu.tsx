import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Package, Heart, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions';

export default function UserMenu() {
  const { user, profile, isAuthenticated, signOut } = useAuthActions();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!isAuthenticated) return null;

  const menuItems = [
    { href: '/compte', icon: Settings, label: 'Mon compte' },
    { href: '/compte/commandes', icon: Package, label: 'Mes commandes' },
    { href: '/wishlist', icon: Heart, label: 'Favoris' },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-1.5 text-[#7a7267] hover:text-[#2c2520] transition-colors"
        aria-label="Menu utilisateur"
      >
        {profile?.photoURL ? (
          <img src={profile.photoURL} alt="" className="h-7 w-7 rounded-full border border-[#e8efe4]" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8efe4]/50 text-[#6b8f5e]">
            <User className="h-4 w-4" />
          </div>
        )}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[#e8efe4]/50 bg-white shadow-xl shadow-[#6b8f5e]/10">
          <div className="border-b border-[#e8efe4]/50 px-4 py-3">
            <p className="text-sm font-medium text-[#2c2520]">{profile?.displayName || 'Utilisateur'}</p>
            <p className="text-xs text-[#7a7267] font-light">{user?.email}</p>
            {(profile?.stats?.loyaltyPoints ?? 0) > 0 && (
              <p className="mt-1 text-xs text-[#6b8f5e] font-medium">{profile?.stats.loyaltyPoints} points fidélité</p>
            )}
          </div>

          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#7a7267] transition-colors hover:bg-[#f7f3ec] hover:text-[#2c2520]"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#e8efe4]/50 py-1">
            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
