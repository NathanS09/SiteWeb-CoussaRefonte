import React from 'react';
import { getPbImageUrl } from '../../api';

interface AmicaleCardProps {
  item: any;
  onClick: (item: any) => void;
}

const AmicaleCard: React.FC<AmicaleCardProps> = ({ item, onClick }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-square bg-gray-200" onClick={() => onClick(item)}>
      {item.image && (
        <img 
          src={item.image} 
          alt={item.title || 'Photo club'} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent  transition-opacity duration-300 flex items-end p-4">
        <p className="text-white font-medium text-sm sm:text-base">
          {item.title}
        </p>
      </div>
    </div>
  );
};

export default AmicaleCard;
