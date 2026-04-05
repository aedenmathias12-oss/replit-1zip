import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import AuthGuard from '../components/auth/AuthGuard';
import Breadcrumbs from '../components/ui/Breadcrumbs';

function OrdersContent() {
  const orders = JSON.parse(localStorage.getItem('cannazen-orders') || '[]');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet><title>Mes commandes — CannaZen</title></Helmet>

      <Breadcrumbs items={[{ label: 'Mon compte', to: '/compte' }, { label: 'Commandes' }]} />

      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Mes commandes</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="text-[#e8efe4] mx-auto mb-4" />
          <p className="text-[#7a7267] mb-4 font-light">Aucune commande pour le moment</p>
          <Link to="/boutique" className="text-[#6b8f5e] hover:text-[#4a6741] font-medium">Voir la boutique</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: { id: string; date: string; total?: number }, i: number) => (
            <div key={i} className="bg-white/80 border border-[#e8efe4]/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#2c2520]">{order.id}</span>
                <span className="bg-[#e8efe4]/60 text-[#6b8f5e] text-xs font-medium px-3 py-1 rounded-full">Confirmée</span>
              </div>
              <p className="text-sm text-[#7a7267] font-light">{new Date(order.date).toLocaleDateString('fr-FR')}</p>
              <p className="text-sm font-semibold mt-1 text-[#2c2520]">{order.total?.toFixed(2)}€</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  return (
    <AuthGuard>
      <OrdersContent />
    </AuthGuard>
  );
}
