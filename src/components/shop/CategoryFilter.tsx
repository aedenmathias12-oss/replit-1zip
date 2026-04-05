import { categories } from '../../data/products';

interface Props {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selected === cat.slug
              ? 'bg-[#6b8f5e] text-white shadow-md shadow-[#6b8f5e]/20'
              : 'bg-white/70 text-[#7a7267] border border-[#e8efe4]/50 hover:border-[#6b8f5e]/30 hover:text-[#2c2520]'
          }`}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
