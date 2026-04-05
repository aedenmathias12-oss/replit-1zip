import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#3d5a3a]/95 pt-14 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Logo variant="light" className="mb-4" />
            <p className="text-[#f7f3ec]/60 text-sm font-light leading-relaxed">L'excellence du cannabis légal. Produits CBD premium sélectionnés avec soin.</p>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#e8efe4]/40 mb-4 uppercase">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Accueil</Link>
              <Link to="/boutique" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Boutique</Link>
              <Link to="/a-propos" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">À propos</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#e8efe4]/40 mb-4 uppercase">Catégories</h4>
            <div className="flex flex-col gap-2">
              <Link to="/boutique?cat=fleurs-cbd" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Fleurs CBD</Link>
              <Link to="/boutique?cat=fleurs-d10" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Fleurs D10</Link>
              <Link to="/boutique?cat=fleurs-oh" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Fleurs OH+</Link>
              <Link to="/boutique?cat=vapes" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Vapes</Link>
              <Link to="/boutique?cat=huiles-cbd" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Huiles CBD</Link>
              <Link to="/boutique?cat=gummies-d9" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Gummies D9</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#e8efe4]/40 mb-4 uppercase">Informations</h4>
            <div className="flex flex-col gap-2">
              <Link to="/cgv" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">CGV</Link>
              <Link to="/mentions-legales" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Mentions légales</Link>
              <Link to="/politique-de-confidentialite" className="text-sm text-[#e8efe4]/60 hover:text-white transition-colors font-light">Confidentialité</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] text-[#e8efe4]/40 mb-4 uppercase">Contact</h4>
            <div className="text-sm text-[#e8efe4]/60 space-y-1 font-light">
              <p>contact@cannazen.space</p>
              <p>11 rue de Tourraine</p>
              <p>67100 Strasbourg</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e8efe4]/15 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#e8efe4]/30 font-light">© 2026 CannaZen · Cannabis légal · THC &lt; 0.3%</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#e8efe4]/30 font-light">Paiement sécurisé</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#f7f3ec]/10 rounded px-2 py-1 text-[10px] text-[#f7f3ec]/60 font-medium">CB</span>
                <span className="bg-[#f7f3ec]/10 rounded px-2 py-1 text-[10px] text-[#f7f3ec]/60 font-medium">VISA</span>
                <span className="bg-[#f7f3ec]/10 rounded px-2 py-1 text-[10px] text-[#f7f3ec]/60 font-medium">MC</span>
                <span className="bg-[#f7f3ec]/10 rounded px-2 py-1 text-[10px] text-[#f7f3ec]/60 font-medium">Virement</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-[#e8efe4]/20 font-light text-center mt-4">© CannaZen 2026 · THC &lt; 0.3% · Vente interdite aux mineurs · Produits non médicamenteux</p>
        </div>
      </div>
    </footer>
  );
}
