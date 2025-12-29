import React from 'react';
import { CLUB_HISTORY, CLUB_BOARD } from '../data/club';
import { clubConfig } from '../config/clubConfig';

const Club: React.FC = () => {
  return (
    <div className="w-full bg-gray-50">
      {/* Header avec couleur primaire dynamique */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Notre Club</h1>
          <p className="text-lg max-w-3xl">
            Découvrez l'histoire et les valeurs qui font du {clubConfig.identity.name} bien
            plus qu'un simple club de football.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex justify-center mb-8">
              <img 
                src={clubConfig.identity.logoUrl} 
                alt={`Logo ${clubConfig.identity.name}`} 
                className="h-48 w-48 object-contain" 
              />
            </div>
            
            <h2 className="text-2xl font-bold text-primary mb-4">
              {CLUB_HISTORY.title}
            </h2>
            
            <div className="prose max-w-none">
              {/* Mapping de l'historique */}
              {CLUB_HISTORY.content.map((paragraph, index) => (
                <p key={index} className={index > 0 ? "mt-4" : ""}>
                  {paragraph}
                </p>
              ))}

              <p className="mt-4">
                Quelques jeunes issus de notre formation restent des exemples :
              </p>
              <ul className="list-disc pl-6 mt-2">
                {/* Mapping des Success Stories */}
                {CLUB_HISTORY.successStories.map((story, index) => (
                  <li key={index}>{story}</li>
                ))}
              </ul>
              <p className="mt-4 font-bold text-primary">
                Allez le {clubConfig.identity.shortName} !!!
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
              Bureau du club
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mapping des membres du bureau */}
                {CLUB_BOARD.map((member, index) => (
                  <div 
                    key={index} 
                    className={`pb-2 md:pb-0 ${index % 2 === 0 ? 'md:border-r md:pr-4' : ''} ${index < CLUB_BOARD.length - 1 ? 'border-b md:border-b-0' : ''}`}
                  >
                    <h3 className="font-bold text-lg mb-1">{member.role}</h3>
                    <p>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Nos Stades
              </h2>
              
              {/* Site de Coussa */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
                <div className="p-4 bg-secondary text-white">
                  <h3 className="text-xl font-bold">Site de Coussa</h3>
                  <p>Chem. de la Prade, 09120 Coussa</p>
                </div>
                <div className="h-64 w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.3626860452095!2d1.6838347761059198!3d43.51517517110707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aed39a7c37e9ef%3A0x2e43f94df1b0f7c5!2sChem.%20de%20la%20Prade%2C%2009120%20Coussa!5e0!3m2!1sfr!2sfr!4v1699967068932!5m2!1sfr!2sfr" 
                    width="100%" height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    title="Stade de Coussa"
                  ></iframe>
                </div>
              </div>

              {/* Site des Pujols */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
                <div className="p-4 bg-secondary text-white">
                  <h3 className="text-xl font-bold">Site des Pujols</h3>
                  <p>1 Chemin du Payroulie, 09100 Les Pujols</p>
                </div>
                <div className="h-64 w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.0891746651673!2d1.6714841761054128!3d43.50094797112871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aed33d7e20a7a3%3A0xd7c9e8e0e8e9e8e0!2s1%20Chemin%20du%20Payroulie%2C%2009100%20Les%20Pujols!5e0!3m2!1sfr!2sfr!4v1699967068932!5m2!1sfr!2sfr" 
                    width="100%" height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    title="Stade des Pujols"
                  ></iframe>
                </div>
              </div>

              {/* Utilisation de bg-surface pour le fond léger et border-accent-hover */}
              <div className="bg-surface p-6 rounded-lg border border-accent-hover mt-8">
                <h3 className="font-bold text-lg text-primary mb-3">
                  Nous rendre visite
                </h3>
                <p>
                  Les matchs de l'équipe première se jouent généralement au
                  stade de Coussa.
                </p>
                <p className="mt-2">
                  Pour toute information sur les lieux des rencontres, consultez
                  notre calendrier des matchs ou contactez-nous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;