import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Politique de Confidentialité — CannaZen</title>
        <meta name="description" content="Politique de confidentialité de CannaZen — Collecte, utilisation et protection de vos données personnelles conformément au RGPD." />
      </Helmet>
      <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2c2520] italic mb-8">Politique de Confidentialité</h1>
      <div className="space-y-8 text-[#7a7267] text-sm leading-relaxed font-light">
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Collecte des données</h2>
          <p>CannaZen collecte uniquement les données nécessaires au traitement des commandes : nom, prénom, adresse email, adresse de livraison, numéro de téléphone. Ces données sont collectées lors de la création de compte ou de la passation d'une commande.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour : le traitement et la livraison de vos commandes, la gestion de votre compte client, l'envoi de communications relatives à vos commandes.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Cookies</h2>
          <p>Le site utilise des cookies techniques nécessaires au fonctionnement (panier, authentification, vérification d'âge). Aucun cookie de suivi publicitaire n'est utilisé.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Vos droits</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données. Contactez-nous à contact@cannazen.space pour exercer ces droits.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[#2c2520] not-italic mb-3">Contact</h2>
          <p>CannaZen — Benkiran Hatim, 11 rue de Tourraine, 67100 Strasbourg</p>
          <p>contact@cannazen.space</p>
        </section>
      </div>
    </div>
  );
}
