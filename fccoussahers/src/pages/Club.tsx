import React, { useState, useEffect } from 'react';
import { clubConfig } from '../config/clubConfig';
import { fetchBoardMembers, fetchClubInfo } from '../api';
import { useClubData } from '../context/ClubContext';

const Club: React.FC = () => {
  const { boardMembers, clubInfo, loading } = useClubData();


  const renderContent = (text: string) => {
    if (!text) return <p>Historique en cours de rédaction...</p>;

    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentListItems: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('-')) {
        // On enlève le tiret et on nettoie
        const content = trimmedLine.substring(1).trim();
        currentListItems.push(<li key={`li-${index}`}>{content}</li>);
      } 
      else {
        if (currentListItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} className="list-disc pl-6 mb-4 space-y-1">
              {currentListItems}
            </ul>
          );
          currentListItems = []; 
        }


        if (trimmedLine.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="mb-4 text-gray-700 leading-relaxed">
              {line}
            </p>
          );
        }
      }
    });


    if (currentListItems.length > 0) {
      elements.push(
        <ul key="ul-end" className="list-disc pl-6 mb-4 space-y-1">
          {currentListItems}
        </ul>
      );
    }

    return elements;
  };
  // -----------------------------------

  if (loading) {
    return <div className="p-12 text-center">Chargement...</div>;
  }

  return (
    <div className="w-full bg-gray-50">
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
          
          {/* COLONNE GAUCHE */}
          <div>
            <div className="flex justify-center mb-8">
              <img 
                src={clubConfig.identity.logoUrl} 
                alt={`Logo ${clubConfig.identity.name}`} 
                className="h-48 w-48 object-contain" 
              />
            </div>
            
            <h2 className="text-2xl font-bold text-primary mb-4">
              Historique du club
            </h2>
            
            {/* On appelle notre fonction de rendu ici */}
            <div className="text-gray-700 text-lg">
              {renderContent(clubInfo.content)}
            </div>

            <p className="mt-8 font-bold text-primary">
                Allez le {clubConfig.identity.shortName} !!!
            </p>

            <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
              Bureau du club
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {boardMembers.length > 0 ? (
                  boardMembers.map((member, index) => (
                    <div 
                      key={member.id} 
                      className={`pb-2 md:pb-0 ${index % 2 === 0 ? 'md:border-r md:pr-4' : ''} border-b md:border-b-0 last:border-0`}
                    >
                      <h3 className="font-bold text-lg mb-1">{member.role}</h3>
                      <p>{member.name}</p>
                    </div>
                  ))
                ) : (
                  <p>Liste des membres indisponible.</p>
                )}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE (Stades - Inchangée) */}
          <div>
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Nos Stades
              </h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;