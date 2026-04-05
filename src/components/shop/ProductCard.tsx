import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../../data/products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const minPrice = Math.min(...product.prices.map(p => p.amount));

  return (
    <Link
      to={`/boutique/${product.slug}`}
      className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e8efe4]/40 shadow-lg shadow-[#6b8f5e]/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-square bg-gradient-to-br from-[#e8efe4]/40 via-[#f7f3ec] to-[#f5ecd7]/20 border-b border-[#e8efe4]/40 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#6b8f5e]/80 text-white backdrop-blur-sm tracking-wider">
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#8b7355]/80 text-white backdrop-blur-sm">
            NOUVEAU
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] font-medium tracking-[0.15em] text-[#7a7267]/60 uppercase mb-1">{product.category}</p>
        <h3 className="font-['Cormorant_Garamond'] font-semibold text-sm text-[#2c2520] line-clamp-1 hover:text-[#6b8f5e] transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1.5 mb-2">
          <Star size={11} className="fill-[#c4a35a] text-[#c4a35a]" />
          <span className="text-[11px] text-[#7a7267] font-light">{product.rating} ({product.reviewCount})</span>
        </div>
        <p className="text-[#6b8f5e] font-semibold text-sm">
          {product.prices.length > 1 ? `Dès ${minPrice.toFixed(2)}€` : `${minPrice.toFixed(2)}€`}
        </p>
      </div>
    </Link>
  );
}
