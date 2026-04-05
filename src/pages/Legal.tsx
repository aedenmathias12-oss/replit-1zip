import { Helmet } from 'react-helmet-async';

export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Mentions Légales — CannaZen</title>
        <meta name="description" content="Mentions légales de CannaZen — Éditeur, hébergement, propriété intellectuelle et conformité légale." />
      </Helmet>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Mentions Légales</h1>
      <div className="space-y-8 text-[#7a7267] text-sm leading-relaxed font-light">
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Éditeur du site</h2>
          <p>CannaZen — Benkiran Hatim</p>
          <p>11 rue de Tourraine, 67100 Strasbourg, France</p>
          <p>Email : contact@cannazen.space</p>
          <p>Site : cannazen.space</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Hébergement</h2>
          <p>Le site est hébergé par Replit, Inc.</p>
          <p>350 Bush Street, Suite 200, San Francisco, CA 94104, USA</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Propriété intellectuelle</h2>
          <p>L'ensemble du contenu du site (textes, images, logos) est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Conformité légale</h2>
          <p>Tous les produits vendus sur CannaZen sont conformes à la législation française et européenne en vigueur. Le taux de THC est strictement inférieur à 0.3%. La vente est réservée aux personnes majeures.</p>
        </section>
      </div>
    </div>
  );
}
