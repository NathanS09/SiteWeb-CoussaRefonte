import React from 'react';
import PartnerCard from '../components/Partners/PartnerCard';
// Updated data with real partner logos
const partnersData = [{
  id: 1,
  name: 'Mairie de Coussa',
  description: 'La mairie de Coussa soutient le club depuis sa création et met à disposition les infrastructures sportives.',
  logo: "/mairie_coussa.webp",
  website: 'https://example.com/mairie'
}, {
  id: 2,
  name: 'District Ariège FFF',
  description: "Le District de Football de l'Ariège organise les compétitions départementales auxquelles participe le FC Coussa Hers.",
  logo: "/district_ariege.webp",
  website: 'https://ariege.fff.fr/'
}, {
  id: 3,
  name: "Ligue d'Occitanie",
  description: "La Ligue de Football d'Occitanie supervise les compétitions régionales et soutient le développement du football amateur.",
  logo: "/Ligue_de_Football_dOccitanie.svg",
  website: 'https://occitanie.fff.fr/'
}, {
  id: 4,
  name: 'Mairie de Pujols',
  description: 'La commune voisine de Pujols est un partenaire important qui soutient les projets du club.',
  logo: "/mairie_pujol.webp",
  website: 'https://example.com/pujols'
}, {
  id: 5,
  name: 'Intermarché',
  description: 'Intermarché fournit les ravitaillements lors des tournois organisés par le club.',
  logo: 'https://via.placeholder.com/200x100?text=Intermarche',
  website: 'https://example.com/intermarche'
}, {
  id: 6,
  name: 'Restaurant Le Petit Coussa',
  description: "Le restaurant accueille les repas d'après-match et les événements du club.",
  logo: 'https://via.placeholder.com/200x100?text=Le+Petit+Coussa',
  website: 'https://example.com/restaurant'
}];
const Partners: React.FC = () => {
  // Separate featured partners (first two) from regular partners
  const featuredPartners = partnersData.slice(0, 2);
  const regularPartners = partnersData.slice(2);
  return <div className="w-full bg-gray-50">
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Nos Partenaires
          </h1>
          <p className="text-lg max-w-3xl">
            Découvrez les entreprises et institutions qui soutiennent le FC
            Coussa Hers et contribuent à son développement.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Partenaires Principaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPartners.map(partner => <PartnerCard key={partner.id} partner={partner} featured={true} />)}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Autres Partenaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPartners.map(partner => <PartnerCard key={partner.id} partner={partner} />)}
          </div>
        </div>
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Devenir Partenaire
          </h2>
          <p className="text-lg mb-6">
            Vous souhaitez soutenir le FC Coussa Hers et associer votre image à
            nos valeurs ? Contactez-nous pour découvrir nos offres de
            partenariat.
          </p>
          <a href="mailto:partenariats@fccousahers.fr" className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-md transition-colors">
            Nous contacter
          </a>
        </div>
      </div>
    </div>;
};
export default Partners;