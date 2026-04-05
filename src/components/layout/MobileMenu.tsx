import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import Logo from '../ui/Logo';

const menuItems = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Fleurs', children: [
      { label: 'Fleurs CBD', to: '/boutique?cat=fleurs-cbd' },
      { label: 'Fleurs D10', to: '/boutique?cat=fleurs-d10' },
      { label: 'Fleurs OH+', to: '/boutique?cat=fleurs-oh' },
    ]
  },
  { label: 'Résines D10', to: '/boutique?cat=resines-d10' },
  {
    label: 'Vapes', children: [
      { label: 'Vapes OH+', to: '/boutique?cat=vapes' },
      { label: 'Vapes HEC10', to: '/boutique?cat=vapes' },
    ]
  },
  { label: 'Huiles CBD', to: '/boutique?cat=huiles-cbd' },
  { label: 'Gummies D9', to: '/boutique?cat=gummies-d9' },
  { label: 'Boutique complète', to: '/boutique' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Connexion', to: '/connexion' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[#3d5a3a]/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-[#f7f3ec] p-6 shadow-xl lg:hidden flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <Logo variant="dark" />
          <button onClick={onClose} aria-label="Fermer le menu" className="text-[#7a7267] hover:text-[#2c2520]"><X size={24} /></button>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map(item => {
            const hasChildren = 'children' in item && item.children;
            const isExpanded = expandedItem === item.label;
            return (
              <div key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                      className="w-full flex items-center justify-between text-sm font-medium text-[#7a7267] hover:text-[#2c2520] hover:bg-[#e8efe4]/30 py-3 px-3 rounded-lg transition-colors"
                    >
                      {item.label}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isExpanded && item.children && (
                      <div className="pl-4 space-y-1 mb-2">
                        {item.children.map(child => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={onClose}
                            className="block text-sm text-[#7a7267] hover:text-[#6b8f5e] py-2 px-3 rounded-lg hover:bg-[#e8efe4]/20 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={'to' in item ? item.to! : '/'}
                    onClick={onClose}
                    className="text-sm font-medium text-[#7a7267] hover:text-[#2c2520] hover:bg-[#e8efe4]/30 py-3 px-3 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
