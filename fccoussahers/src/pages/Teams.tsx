import React, { useState, useEffect } from 'react';
import TeamSelector from '../components/Teams/TeamSelector';
import TeamFormation from '../components/Teams/TeamFormation';
import TeamOverview from '../components/Teams/TeamOverview';
import { fetchTeams, getPbImageUrl } from '../api.tsx';
import { Team } from '../data/teams.ts';
import { clubConfig } from '../config/clubConfig.ts';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<string>('');
  const [loadingTeams, setLoadingTeams] = useState(true);


  useEffect(() => {
    const loadTeams = async () => {
      const data = await fetchTeams();
      if (data && data.length > 0) {
        const formattedTeams: Team[] = data.map((record: any) => ({
          id: record.id,
          name: record.name,
          category: record.category,
          coach: record.coach,
          description: record.description,
          image: getPbImageUrl(record, record.image) || '',
        }));
        
        setTeams(formattedTeams);
        setActiveTeam(formattedTeams[0].id as string); // Sélectionne la 1ère par défaut
      }
      setLoadingTeams(false);
    };
    loadTeams();
  }, []);

  const currentTeam = teams.find(t => t.id === activeTeam);

  if (loadingTeams) {
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