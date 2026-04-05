import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import { AlertTriangle, Package, Lock, Mail } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<'colissimo' | 'chronopost' | 'relay'>('colissimo');
  const [payment, setPayment] = useState<'card' | 'transfer' | 'klarna'>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: profile?.displayName?.split(' ')[0] || '',
    lastName: profile?.displayName?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  if (cartItems.length === 0) return <Navigate to="/boutique" />;

  const shippingCost = shipping === 'chronopost' ? 9.90
    : shipping === 'relay' ? (cartTotal >= 39 ? 0 : 3.90)
    : (cartTotal >= 49 ? 0 : 4.90);
  const total = cartTotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/connexion');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'confirmed',
          total_amount: total,
          shipping_method: shipping,
          shipping_cost: shippingCost,
          shipping_address: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            zip: form.zip,
          },
          items: cartItems.map(item => ({
            id: item.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.selectedPrice.amount,
          })),
          payment_status: 'confirmed',
          payment_method: payment,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      clearCart();
      navigate(`/checkout/confirmation/${order.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#e8efe4]/60 bg-[#f7f3ec]/50 text-[#2c2520] placeholder:text-[#7a7267]/50 focus:outline-none focus:border-[#6b8f5e] focus:ring-1 focus:ring-[#6b8f5e]/20 text-sm transition-colors";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet><title>Checkout — CannaZen</title></Helmet>
      <Breadcrumbs items={[
        { label: 'Boutique', to: '/boutique' },
        { label: 'Checkout' },
      ]} />
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Finaliser ma commande</h1>

      <div className="bg-[#f5ecd7]/40 border border-[#c4a35a]/15 rounded-xl p-4 mb-8 flex items-center gap-3">
        <AlertTriangle size={18} className="text-[#c4a35a] shrink-0" />
        <p className="text-sm text-[#8b7355] font-light">MODE TEST — Aucun paiement réel ne sera effectué</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm border border-[#e8efe4]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#2c2520] mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="Prénom" required className={inputClass} />
              <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Nom" required className={inputClass} />
            </div>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="Email" required className={`${inputClass} mt-4`} />
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} type="tel" placeholder="Téléphone" required className={`${inputClass} mt-4`} />
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-[#e8efe4]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#2c2520] mb-4">Adresse de livraison</h2>
            <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Adresse" required className={inputClass} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} placeholder="Code postal" required className={inputClass} />
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Ville" required className={inputClass} />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-[#e8efe4]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#2c2520] mb-4">Mode de livraison</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${shipping === 'colissimo' ? 'border-[#6b8f5e] bg-[#e8efe4]/20' : 'border-[#e8efe4]/50 hover:border-[#e8efe4]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shipping === 'colissimo'} onChange={() => setShipping('colissimo')} className="accent-[#6b8f5e]" />
                  <div>
                    <p className="text-sm font-medium text-[#2c2520]">📦 Colissimo domicile</p>
                    <p className="text-xs text-[#7a7267] font-light">2-3 jours ouvrés</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{cartTotal >= 49 ? <span className="text-[#6b8f5e]">GRATUIT</span> : '4,90€'}</span>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${shipping === 'chronopost' ? 'border-[#6b8f5e] bg-[#e8efe4]/20' : 'border-[#e8efe4]/50 hover:border-[#e8efe4]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shipping === 'chronopost'} onChange={() => setShipping('chronopost')} className="accent-[#6b8f5e]" />
                  <div>
                    <p className="text-sm font-medium text-[#2c2520]">⚡ Chronopost Express 24h</p>
                    <p className="text-xs text-[#7a7267] font-light">Livraison lendemain avant 13h</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">9,90€</span>
              </label>
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${shipping === 'relay' ? 'border-[#6b8f5e] bg-[#e8efe4]/20' : 'border-[#e8efe4]/50 hover:border-[#e8efe4]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shipping === 'relay'} onChange={() => setShipping('relay')} className="accent-[#6b8f5e]" />
                  <div>
                    <p className="text-sm font-medium text-[#2c2520]">📍 Point Relais (Mondial Relay)</p>
                    <p className="text-xs text-[#7a7267] font-light">3-5 jours ouvrés</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{cartTotal >= 39 ? <span className="text-[#6b8f5e]">GRATUIT</span> : '3,90€'}</span>
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#7a7267] font-light">
              <span className="flex items-center gap-1"><Package size={12} /> Expédition sous 24h</span>
              <span className="flex items-center gap-1"><Lock size={12} /> Emballage 100% discret et hermétique</span>
              <span className="flex items-center gap-1"><Mail size={12} /> Suivi de commande par email</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-[#e8efe4]/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#2c2520] mb-4">Moyen de paiement</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${payment === 'card' ? 'border-[#6b8f5e] bg-[#e8efe4]/20' : 'border-[#e8efe4]/50 hover:border-[#e8efe4]'}`}>
                <input type="radio" checked={payment === 'card'} onChange={() => setPayment('card')} className="accent-[#6b8f5e]" />
                <div>
                  <p className="text-sm font-medium text-[#2c2520]">💳 Carte bancaire</p>
                  <p className="text-xs text-[#7a7267] font-light">Via PayGreen / OVRI — Paiement sécurisé</p>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${payment === 'transfer' ? 'border-[#6b8f5e] bg-[#e8efe4]/20' : 'border-[#e8efe4]/50 hover:border-[#e8efe4]'}`}>
                <input type="radio" checked={payment === 'transfer'} onChange={() => setPayment('transfer')} className="accent-[#6b8f5e]" />
                <div>
                  <p className="text-sm font-medium text-[#2c2520]">🏦 Virement bancaire</p>
                  <p className="text-xs text-[#7a7267] font-light">IBAN communiqué après confirmation</p>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all opacity-60 ${payment === 'klarna' ? 'border-[#6b8f5e] bg-[#e8efe4]/20' : 'border-[#e8efe4]/50'}`}>
                <input type="radio" checked={payment === 'klarna'} onChange={() => setPayment('klarna')} className="accent-[#6b8f5e]" disabled />
                <div>
                  <p className="text-sm font-medium text-[#2c2520]">💶 Paiement en 3x sans frais (Klarna)</p>
                  <p className="text-xs text-[#c4a35a] font-medium">Bientôt disponible</p>
                </div>
              </label>
            </div>
            {payment === 'transfer' && (
              <div className="mt-4 bg-[#f5ecd7]/30 border border-[#c4a35a]/15 rounded-xl p-4 text-sm">
                <p className="text-[#8b7355] font-medium mb-2">Coordonnées bancaires</p>
                <div className="text-[#7a7267] font-light space-y-1">
                  <p>IBAN : <span className="font-medium text-[#2c2520]">LU61 6060 0020 0000 5401</span></p>
                  <p>BIC : <span className="font-medium text-[#2c2520]">OLKILUL1XXX</span></p>
                  <p className="text-xs italic mt-2">Référence = votre numéro de commande</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white/80 backdrop-blur-sm border border-[#e8efe4]/50 rounded-2xl p-6 shadow-lg shadow-[#6b8f5e]/5 sticky top-24">
            <h2 className="font-semibold text-[#2c2520] mb-4">Récapitulatif</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#7a7267] truncate mr-2 font-light">{item.product.name} x{item.quantity}</span>
                  <span className="font-medium">{(item.selectedPrice.amount * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e8efe4]/40 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#7a7267] font-light">Sous-total</span>
                <span className="font-medium">{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7a7267] font-light">Livraison ({shipping === 'chronopost' ? 'Express' : shipping === 'relay' ? 'Relais' : 'Colissimo'})</span>
                <span className={`font-medium ${shippingCost === 0 ? 'text-[#6b8f5e]' : ''}`}>{shippingCost === 0 ? 'Offerte' : `${shippingCost.toFixed(2)}€`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[#e8efe4]/40">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={payment === 'klarna' || loading}
              className="w-full mt-6 bg-[#6b8f5e] hover:bg-[#4a6741] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#6b8f5e]/20"
            >
              {loading ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
