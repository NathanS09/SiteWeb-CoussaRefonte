import React, { useState, useEffect } from 'react';
import TeamSelector from '../components/Teams/TeamSelector';
import TeamOverview from '../components/Teams/TeamOverview';
import { clubConfig } from '../config/clubConfig.ts';
import { useClubData } from '../context/ClubContext.tsx';
import { getPbImageUrl } from '../api.tsx';

const Teams: React.FC = () => {
  const { teams: rawTeams, loading } = useClubData();
  const [activeTeam, setActiveTeam] = useState<string>('');

  const teams = rawTeams.map(t => {

    let images: string[] = [];
    if (Array.isArray(t.image)) {
        images = t.image.map((img: string) => getPbImageUrl(t, img));
        
    } else if (t.image) {
        // Si c'est une seule image (ancienne version)
        images = [getPbImageUrl(t, t.image)? getPbImageUrl(t, t.image)! : ''];
    }

    return {
      ...t,
      images: images, 
      image: images.length > 0 ? images[0] : null 
    };
  });

  useEffect(() => {
    if (teams.length > 0 && activeTeam === '') {
      setActiveTeam(teams[0].id); // Ou teams[0].id si c'est un string
    }
  }, [teams, activeTeam]);

  const currentTeam = teams.find(t => t.id === activeTeam);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  console.log('Teams loaded:', teams);

  return <div className="w-full bg-gray-50">
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Équipes</h1>
          <p className="text-lg max-w-3xl">
            Découvrez les différentes équipes du {clubConfig.identity.name}.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <TeamSelector 
              teams={teams.map(t => ({ id: String(t.id), name: t.name }))} 
              activeTeam={activeTeam} 
              onSelectTeam={setActiveTeam} 
            />
        </div>
        {currentTeam && <div className="mb-12">
            <TeamOverview team={currentTeam} />
          </div>}
        {/*<h2 className="text-2xl font-bold text-primary mb-6">
          Composition de l'équipe
        </h2>
         <TeamFormation players={currentPlayers} /> */}
      </div>
    </div>;
};
export default Teams;
