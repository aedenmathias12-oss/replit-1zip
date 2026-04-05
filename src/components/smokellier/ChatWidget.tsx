import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import type { Product } from '../../data/products';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  products?: Product[];
}

const suggestions = [
  { label: "Fleurs", query: "fleurs cbd" },
  { label: "Nouveautés D10", query: "d10" },
  { label: "Vapes", query: "vape" },
  { label: "Conseille-moi", query: "meilleur" },
];

function getResponse(input: string): { text: string; products: Product[] } {
  const q = input.toLowerCase();
  const match = (keywords: string[]) => keywords.some(k => q.includes(k));

  if (match(['détente', 'relax', 'relaxation', 'sommeil', 'dormir', 'calme'])) {
    return { text: "Pour la détente, je te recommande ces pépites...", products: products.filter(p => [6, 18, 27].includes(p.id)) };
  }
  if (match(['puissant', 'fort', 'intense', 'défonce', 'effet'])) {
    return { text: "Tu veux du puissant ? Voilà les plus costauds de la boutique.", products: products.filter(p => [10, 14, 19].includes(p.id)) };
  }
  if (match(['pas cher', 'budget', 'petit prix', 'économique', 'prix'])) {
    return { text: "Bon plan détecté ! Voici les meilleurs rapports qualité-prix.", products: products.filter(p => [3, 5, 7].includes(p.id)) };
  }
  if (match(['gummy', 'gummies', 'bonbon', 'bonbons', 'cookies'])) {
    return { text: "Les Gummies Cookies® D9 — officiels et dévastateurs.", products: products.filter(p => p.categorySlug === 'gummies-d9') };
  }
  if (match(['vape', 'vapote', 'pen', 'puff'])) {
    return { text: "Côté vapes, on a du lourd en OH+ et HEC10.", products: products.filter(p => p.categorySlug === 'vapes').slice(0, 4) };
  }
  if (match(['huile', 'oil', 'sublingual'])) {
    return { text: "Nos huiles Trycome Full Spectrum BIO — premium et efficaces.", products: products.filter(p => p.categorySlug === 'huiles-cbd') };
  }
  if (match(['résine', 'resine', 'hash', 'haschich'])) {
    return { text: "Les résines D10 — Silk Road et Atlas Cargo, du lourd.", products: products.filter(p => p.categorySlug === 'resines-d10') };
  }
  if (match(['d10', 'delta-10', 'delta 10'])) {
    return { text: "La gamme D10 c'est l'avenir — puissance et créativité.", products: products.filter(p => p.categorySlug === 'fleurs-d10').slice(0, 4) };
  }
  if (match(['oh+', 'oh ', 'hydroxy', 'hhc'])) {
    return { text: "OH+ c'est le nouveau game — puissance next level.", products: products.filter(p => p.categorySlug === 'fleurs-oh' || (p.categorySlug === 'vapes' && p.category.includes('OH+'))).slice(0, 4) };
  }
  if (match(['cbd', 'débutant', 'commencer', 'premier'])) {
    return { text: "Pour commencer en douceur, je te recommande ceux-ci.", products: products.filter(p => [3, 5, 27].includes(p.id)) };
  }
  if (match(['fleur', 'fleurs'])) {
    return { text: "Nos fleurs — CBD, D10, OH+, on a de tout !", products: products.filter(p => p.categorySlug.startsWith('fleurs')).slice(0, 4) };
  }
  if (match(['meilleur', 'top', 'best', 'populaire', 'conseille'])) {
    return { text: "Les best-sellers de la boutique — ceux que tout le monde s'arrache.", products: products.filter(p => p.isBestSeller).slice(0, 4) };
  }
  if (match(['livraison', 'envoi', 'expedition', 'colis', 'colissimo'])) {
    return { text: "Livraison rapide !\n• Colissimo (2-3j) : 4,90€, GRATUIT dès 49€\n• Chronopost 24h : 9,90€\n• Point Relais : 3,90€, GRATUIT dès 39€\n• Emballage 100% discret et hermétique", products: [] };
  }
  if (match(['bonjour', 'salut', 'hello', 'hey', 'yo', 'coucou'])) {
    return { text: "Salut ! Je suis le Smokellier, ton guide dans l'univers CannaZen. Dis-moi ce que tu cherches !", products: [] };
  }

  return { text: "Hmm, je ne suis pas sûr de comprendre. Essaie de me demander des conseils sur les fleurs, les vapes, les résines, ou dis-moi ce que tu recherches (détente, puissance, petit prix...)", products: [] };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Bienvenue ! Je suis le Smokellier, ton conseiller CannaZen. Pose-moi une question ou choisis un sujet.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const { text: botText, products: botProducts } = getResponse(text);
      const botMsg: Message = { id: Date.now() + 1, text: botText, sender: 'bot', products: botProducts.length > 0 ? botProducts : undefined };
      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le Smokellier" : "Ouvrir le Smokellier"}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#6b8f5e] text-white shadow-lg shadow-[#6b8f5e]/30 hover:bg-[#4a6741] hover:scale-105 transition-all flex items-center justify-center"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[60] w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white border border-[#e8efe4]/50 rounded-2xl shadow-2xl shadow-[#6b8f5e]/10 flex flex-col overflow-hidden">
          <div className="px-5 py-3 bg-[#6b8f5e] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-sm">🌿</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Le Smokellier</h3>
                <span className="text-[10px] text-white/70 font-medium">En ligne</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fermer le chat" className="text-white/70 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f7f3ec]">
            {messages.map(msg => (
              <div key={msg.id}>
                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'ml-auto' : ''}`}>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#6b8f5e] text-white'
                      : 'bg-white text-[#2c2520] border border-[#e8efe4]/50'
                  }`}>
                    {msg.text}
                  </div>
                </div>
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.products.map(p => (
                      <Link
                        key={p.id}
                        to={`/boutique/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 bg-white border border-[#e8efe4]/50 rounded-xl p-2.5 hover:border-[#6b8f5e]/30 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#e8efe4]/30 flex items-center justify-center overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#2c2520] truncate">{p.name}</p>
                          <p className="text-xs text-[#6b8f5e] font-medium">
                            {p.prices.length > 1 ? `Dès ${Math.min(...p.prices.map(pr => pr.amount)).toFixed(2)}€` : `${p.prices[0].amount.toFixed(2)}€`}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 bg-[#f7f3ec]">
              {suggestions.map(s => (
                <button
                  key={s.label}
                  onClick={() => sendMessage(s.query)}
                  className="text-xs bg-white border border-[#e8efe4]/60 rounded-full px-3 py-1.5 text-[#7a7267] hover:border-[#6b8f5e]/30 hover:text-[#2c2520] transition-all"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 border-t border-[#e8efe4]/50 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Pose ta question..."
              className="flex-1 bg-[#f7f3ec] border border-[#e8efe4]/50 rounded-xl px-4 py-2.5 text-sm text-[#2c2520] placeholder:text-[#7a7267]/50 focus:outline-none focus:border-[#6b8f5e]"
            />
            <button type="submit" aria-label="Envoyer le message" className="bg-[#6b8f5e] hover:bg-[#4a6741] text-white p-2.5 rounded-xl transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
