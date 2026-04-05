import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-[#7a7267] font-light mb-6 overflow-x-auto">
      <Link to="/" className="hover:text-[#6b8f5e] transition-colors shrink-0" aria-label="Accueil">
        <Home size={13} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight size={11} className="text-[#e8efe4]" />
          {item.to ? (
            <Link to={item.to} className="hover:text-[#6b8f5e] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#2c2520] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
