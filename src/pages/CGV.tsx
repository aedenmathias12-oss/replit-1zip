import { Helmet } from 'react-helmet-async';

export default function CGV() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Conditions Générales de Vente — CannaZen</title>
        <meta name="description" content="CGV de CannaZen — Conditions de vente, livraison, retours et paiement pour vos achats de CBD en ligne." />
      </Helmet>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Conditions Générales de Vente</h1>
      <div className="space-y-8 text-[#7a7267] text-sm leading-relaxed font-light">
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 1 — Objet</h2>
          <p>Les présentes CGV régissent les ventes de produits CBD effectuées par CannaZen, exploitée par Benkiran Hatim, 11 rue de Tourraine, 67100 Strasbourg, auprès de ses clients via le site cannazen.space.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 2 — Produits</h2>
          <p>Les produits proposés sont des produits à base de cannabidiol (CBD) conformes à la législation française. Tous nos produits contiennent un taux de THC inférieur à 0.3%, conformément à la réglementation en vigueur. La vente est réservée aux personnes majeures (+18 ans).</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 3 — Prix</h2>
          <p>Les prix sont indiqués en euros TTC. CannaZen se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au prix en vigueur lors de la validation de la commande.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 4 — Commandes</h2>
          <p>La validation de la commande implique l'acceptation des présentes CGV. Toute commande constitue un contrat conclu à distance entre le client et CannaZen.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 5 — Livraison</h2>
          <p>Les livraisons sont effectuées en France métropolitaine. Colissimo domicile (2-3 jours) : 4,90€, gratuite dès 49€. Chronopost Express 24h : 9,90€. Point Relais Mondial Relay (3-5 jours) : 3,90€, gratuit dès 39€. Les colis sont expédiés sous 24h ouvrées.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 6 — Droit de rétractation</h2>
          <p>Conformément au Code de la consommation, le client dispose d'un délai de 14 jours à compter de la réception pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités. Les produits doivent être retournés dans leur emballage d'origine, non ouverts et en parfait état.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 7 — Paiement</h2>
          <p>Les moyens de paiement acceptés sont : carte bancaire (via PayGreen / OVRI) et virement bancaire. Le paiement en 3x sans frais via Klarna sera prochainement disponible.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Article 8 — Contact</h2>
          <p>Pour toute question : contact@cannazen.space</p>
        </section>
      </div>
    </div>
  );
}
