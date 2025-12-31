import React from 'react';
import { getPbImageUrl } from '../../api';
import { clubConfig } from '../../config/clubConfig';

interface EventCardProps {
  evt: any;
  onClick: (evt: any) => void;
}

const EventCard: React.FC<EventCardProps> = ({ evt, onClick }) => {
  // Fonction de formatage locale au composant
  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const startDateStr = start.toLocaleDateString('fr-FR', options);
    const endDateStr = end.toLocaleDateString('fr-FR', options);

    if (startDateStr === endDateStr) {
      return `Le ${startDateStr}`;
    }
    return `Du ${startDateStr.split(' 20')[0]} au ${endDateStr}`;
  };

  return (
    <div 
      onClick={() => onClick(evt)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 group"
    >
      
        <div className="h-56 overflow-hidden relative">
          {evt.image && (
          <img 
            src={evt.image} 
            alt={evt.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          /> ) || (
            <img src={clubConfig.identity.logoUrl} alt={evt.title} className="w-full h-full object-contain p-10 bg-gray-100" />
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white text-primary px-4 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-all">
              Voir détails
            </span>
          </div>
        </div>
      
      <div className="p-5">
        <div className="text-sm text-secondary font-bold mb-2">
          {formatDateRange(evt.startObj, evt.endObj)}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{evt.title}</h3>
        <div 
          className="text-gray-500 text-sm line-clamp-2" 
          dangerouslySetInnerHTML={{ __html: evt.description }} 
        />
      </div>
    </div>
  );
};

export default EventCard;