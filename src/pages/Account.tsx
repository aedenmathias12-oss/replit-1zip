import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, Package, Heart, Shield, Mail, Star } from 'lucide-react';
import { useAuthActions } from '../hooks/useAuthActions';
import AuthGuard from '../components/auth/AuthGuard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

function AccountContent() {
  const { user, profile } = useAuth();
  const { signOut } = useAuthActions();

  const menuItems = [
    { to: '/compte/commandes', icon: Package, label: 'Mes commandes', desc: 'Suivez vos commandes en cours et passées' },
    { to: '/wishlist', icon: Heart, label: 'Mes favoris', desc: 'Retrouvez vos produits préférés' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet><title>Mon compte — CannaZen</title></Helmet>

      <Breadcrumbs items={[{ label: 'Mon compte' }]} />

      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Mon compte</h1>

      <div className="bg-white/80 border border-[#e8efe4]/50 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt={`Photo de ${profile.displayName || 'profil'}`} className="w-16 h-16 rounded-full border-2 border-[#e8efe4]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#e8efe4]/50 flex items-center justify-center text-[#6b8f5e] text-xl font-semibold">
              {(profile?.displayName || user?.email || '?')[0].toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h2 className="font-semibold text-lg text-[#2c2520]">{profile?.displayName || 'Utilisateur'}</h2>
            <p className="text-sm text-[#7a7267] font-light flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> {user?.email}
            </p>
            {profile?.provider && (
              <p className="text-xs text-[#7a7267]/60 mt-1 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Connecté via {profile.provider === 'google' ? 'Google' : 'Email'}
              </p>
            )}
          </div>
        </div>

        {profile?.stats && (profile.stats.totalOrders > 0 || profile.stats.loyaltyPoints > 0) && (
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#e8efe4]/50">
            <div className="text-center">
              <p className="text-lg font-semibold text-[#2c2520]">{profile.stats.totalOrders}</p>
              <p className="text-xs text-[#7a7267] font-light">Commandes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[#2c2520]">{profile.stats.totalSpent.toFixed(0)} €</p>
              <p className="text-xs text-[#7a7267] font-light">Dépensé</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[#6b8f5e] flex items-center justify-center gap-1">
                <Star className="h-4 w-4" /> {profile.stats.loyaltyPoints}
              </p>
              <p className="text-xs text-[#7a7267] font-light">Points</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-4 bg-white/80 border border-[#e8efe4]/50 rounded-xl p-4 hover:border-[#6b8f5e]/30 transition-colors shadow-sm group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8efe4]/30 text-[#6b8f5e] group-hover:bg-[#6b8f5e]/10 transition-colors">
              <item.icon size={20} />
            </div>
            <div>
              <span className="text-[#2c2520] font-medium">{item.label}</span>
              <p className="text-xs text-[#7a7267] font-light">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={signOut}
        className="flex items-center gap-3 w-full bg-white/80 border border-[#e8efe4]/50 rounded-xl p-4 text-red-500 hover:border-red-200 hover:bg-red-50/50 transition-colors shadow-sm"
      >
        <LogOut size={20} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default function Account() {
  return (
    <AuthGuard>
      <AccountContent />
    </AuthGuard>
  );
}
