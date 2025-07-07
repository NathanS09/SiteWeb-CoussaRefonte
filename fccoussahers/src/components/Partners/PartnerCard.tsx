import React from 'react';
interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website?: string;
}
interface PartnerCardProps {
  partner: Partner;
  featured?: boolean;
}
const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  featured = false
}) => {
  return <div className={`bg-white rounded-lg shadow-md overflow-hidden ${featured ? 'col-span-2' : ''}`}>
      <div className="p-6">
        <div className="h-32 flex items-center justify-center mb-4">
          <img src={partner.logo} alt={`Logo ${partner.name}`} className="max-h-full max-w-full object-contain" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          {partner.name}
        </h3>
        <p className="text-gray-600 mb-4">{partner.description}</p>
        {partner.website && <a href={partner.website} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Visiter le site
          </a>}
      </div>
    </div>;
};
export default PartnerCard;