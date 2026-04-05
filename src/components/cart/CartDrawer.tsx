import { X, ShoppingBag, Minus, Plus, Trash2, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../lib/CartContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const FREE_SHIPPING_THRESHOLD = 49;
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.90;
  const total = cartTotal + shipping;
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <>
      {open && <div className="fixed inset-0 bg-[#3d5a3a]/30 backdrop-blur-sm z-[70]" onClick={onClose} />}
      <div className={`fixed inset-y-0 right-0 z-[80] w-full sm:w-[400px] bg-[#f7f3ec] shadow-2xl flex flex-col border-l border-[#e8efe4]/40 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8efe4]/40">
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-xl italic flex items-center gap-2 text-[#2c2520]">
            Panier
            {cartItems.length > 0 && (
              <span className="text-xs font-normal not-italic bg-[#e8efe4]/60 text-[#6b8f5e] px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </h2>
          <button onClick={onClose} aria-label="Fermer le panier" className="text-[#7a7267] hover:text-[#2c2520]"><X size={20} /></button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={48} className="text-[#e8efe4] mb-4" />
            <p className="text-[#7a7267] mb-2 font-light">Votre panier est vide</p>
            <p className="text-xs text-[#7a7267]/50 mb-6 font-light">Explorez notre collection pour trouver votre bonheur</p>
            <Link
              to="/boutique"
              onClick={onClose}
              className="bg-[#6b8f5e] hover:bg-[#4a6741] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Voir la boutique
            </Link>
          </div>
        ) : (
          <>
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={14} className={shipping === 0 ? 'text-[#6b8f5e]' : 'text-[#7a7267]'} />
                {shipping === 0 ? (
                  <p className="text-xs font-semibold text-[#6b8f5e]">Livraison offerte !</p>
                ) : (
                  <p className="text-xs text-[#7a7267] font-light">
                    Plus que <span className="font-semibold text-[#6b8f5e]">{remaining.toFixed(2)}€</span> pour la livraison offerte
                  </p>
                )}
              </div>
              <div className="h-1.5 w-full bg-[#e8efe4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6b8f5e] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="group relative bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-[#e8efe4]/40 shadow-sm">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#e8efe4]/40 via-[#f7f3ec] to-[#f5ecd7]/20 border border-[#e8efe4]/40 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#2c2520] truncate">{item.product.name}</h4>
                      <p className="text-xs text-[#7a7267] font-light">{item.selectedPrice.label}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-sm font-semibold text-[#6b8f5e]">{(item.selectedPrice.amount * item.quantity).toFixed(2)}€</p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-[#7a7267]/60 font-light">{item.selectedPrice.amount.toFixed(2)}€/u</p>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} aria-label={`Retirer ${item.product.name}`} className="absolute -top-2 -right-2 p-1 bg-[#f7f3ec] border border-[#e8efe4]/40 text-[#7a7267] hover:text-red-400 hover:border-red-200 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <div className="flex items-center gap-2 bg-[#f7f3ec] rounded-lg border border-[#e8efe4]/40">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Réduire la quantité" className="p-1.5 text-[#7a7267] hover:text-[#2c2520]">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-5 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Augmenter la quantité" className="p-1.5 text-[#7a7267] hover:text-[#2c2520]">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e8efe4]/40 p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#7a7267] font-light">Sous-total</span>
                <span className="font-medium">{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7a7267] font-light">Livraison estimée</span>
                <span className={`font-medium ${shipping === 0 ? 'text-[#6b8f5e]' : ''}`}>{shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)}€`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[#e8efe4]/40">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full text-center bg-[#6b8f5e] hover:bg-[#4a6741] text-white py-3 rounded-xl font-semibold transition-colors shadow-md shadow-[#6b8f5e]/20"
              >
                Commander — {total.toFixed(2)}€
              </Link>
              <button
                onClick={onClose}
                className="block w-full text-center text-sm text-[#7a7267] hover:text-[#2c2520] font-light transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
