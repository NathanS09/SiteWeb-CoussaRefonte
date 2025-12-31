import React from 'react';
import { useClubData } from '../context/ClubContext';
import AmicaleCard from '../components/Amicale/AmicaleCard';
import { getPbImageUrl } from '../api';
import { useState } from 'react';
import { X } from 'lucide-react';

const Amicale: React.FC = () => {
  const { amicale: rawAmicale, loading } = useClubData();
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

    const amicale = rawAmicale.map((item) => ({
        ...item,
        image: item.image ? getPbImageUrl(item, item.image) : null,
    }));


  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header de la page */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Amicale des Joueurs</h1>
          <p className="text-lg max-w-2xl">
            Retrouvez les moments de convivialité, les repas et la vie associative qui font battre le cœur du club.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {amicale.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {amicale.map((item) => (
              <AmicaleCard key={item.id} item={item} onClick={setSelectedPhoto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">La galerie photo est en cours de préparation. Revenez bientôt !</p>
          </div>
        )}
      </div>

      {/* --- MODAL LIGHTBOX --- */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Bouton Fermer */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-secondary transition-colors z-[110]"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={40} />
          </button>

          <div 
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.image} // On prend l'image originale sans resize
              alt={selectedPhoto.title} 
              className="max-h-[85vh] w-auto object-contain rounded-sm shadow-2xl"
            />
            
            {selectedPhoto.title && (
              <div className="mt-4 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                <p className="text-white text-lg font-medium">{selectedPhoto.title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Amicale;