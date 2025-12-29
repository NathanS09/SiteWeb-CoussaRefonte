import React from 'react';
import PartnerCard from '../components/Partners/PartnerCard';
// Updated data with real partner logos
import { PARTNERS_DATA } from '../data/partners';


const Partners: React.FC = () => {
  // Separate featured partners (first two) from regular partners
  const featuredPartners = PARTNERS_DATA.filter(p => p.isFeatured);
  const regularPartners = PARTNERS_DATA.filter(p => !p.isFeatured);
  return <div className="w-full bg-gray-50">
      <div className="bg-primary text-white py-16">
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
          <h2 className="text-2xl font-bold text-primary mb-6">
            Partenaires Principaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPartners.map(partner => <PartnerCard key={partner.id} partner={partner} featured={true} />)}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Autres Partenaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPartners.map(partner => <PartnerCard key={partner.id} partner={partner} />)}
          </div>
        </div>
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Devenir Partenaire
          </h2>
          <p className="text-lg mb-6">
            Vous souhaitez soutenir le FC Coussa Hers et associer votre image à
            nos valeurs ? Contactez-nous pour découvrir nos offres de
            partenariat.
          </p>
          <a href="mailto:partenariats@fccousahers.fr" className="inline-block bg-secondary hover:bg-primary text-white font-bold py-3 px-6 rounded-md transition-colors">
            Nous contacter
          </a>
        </div>
      </div>
    </div>;
};
export default Partners;