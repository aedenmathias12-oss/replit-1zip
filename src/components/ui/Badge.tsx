interface Props {
  children: React.ReactNode;
  variant?: 'sage' | 'earth' | 'gold' | 'red' | 'default';
}

const variants = {
  sage: 'bg-[#e8efe4] text-[#4a6741]',
  earth: 'bg-[#8b7355]/10 text-[#8b7355]',
  gold: 'bg-[#f5ecd7] text-[#8b7355]',
  red: 'bg-red-50 text-red-600',
  default: 'bg-[#ede7da]/60 text-[#7a7267]',
};

export default function Badge({ children, variant = 'default' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
