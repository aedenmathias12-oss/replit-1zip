import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7267]/50" />
      <input
        type="text"
        value={localValue}
        onChange={e => handleChange(e.target.value)}
        placeholder="Rechercher un produit..."
        className="w-full bg-white/70 border border-[#e8efe4]/60 rounded-xl pl-11 pr-10 py-3 text-sm text-[#2c2520] placeholder:text-[#7a7267]/50 focus:outline-none focus:border-[#6b8f5e] focus:ring-1 focus:ring-[#6b8f5e]/20 transition-colors"
      />
      {localValue && (
        <button
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7a7267]/50 hover:text-[#2c2520] transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
