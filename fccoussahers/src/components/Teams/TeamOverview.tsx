import React from 'react';
import { useState } from 'react';

interface Team {
  id: string;
  name: string;
  coach: string;
  category: string;
  description: string;
  images?: string[];
}

interface TeamOverviewProps {
  team: Team;
}

const TeamOverview: React.FC<TeamOverviewProps> = ({ team }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    team.images && team.images.length > 0 ? team.images[0] : null
  );

  React.useEffect(() => {
    if (team.images && team.images.length > 0) {
        setSelectedImage(team.images[0]);
    } else {
        setSelectedImage(null);
    }
  }, [team]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* IMAGE PRINCIPALE */}
      <div className="relative w-full aspect-video bg-gray-200">
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt={`Équipe ${team.name}`} 
            className="w-full h-full object-contain bg-black/5" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-primary font-bold text-xl">
              {team.name}
            </span>
          </div>
        )}
      </div>

      {/* GALERIE (S'il y a plus d'une image) */}
      {team.images && team.images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto bg-gray-50 border-b border-gray-100">
            {team.images.map((img, index) => (
                <button 
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
            ))}
        </div>
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{team.name}</h2>
        <div className="mb-4">
          <span className="inline-block bg-green-100 text-primary rounded-full px-3 py-1 text-sm font-semibold mr-2">
            {team.category}
          </span>
        </div>
        <div className="mb-4">
          <p className="font-medium">
            Entraîneur: <span className="font-normal">{team.coach}</span>
          </p>
        </div>
        <div className="prose max-w-none text-gray-700">
          <p>{team.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
