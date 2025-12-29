import React, { useState } from 'react';
import TeamSelector from '../components/Teams/TeamSelector';
import TeamFormation from '../components/Teams/TeamFormation';
import TeamOverview from '../components/Teams/TeamOverview';
import {TEAMS_DATA} from '../data/teams.ts';

const Teams: React.FC = () => {
  const [activeTeam, setActiveTeam] = useState(TEAMS_DATA[0].id);
  const currentTeam = TEAMS_DATA.find(team => team.id === activeTeam) || TEAMS_DATA[0];
  const currentPlayers = currentTeam.players;
  return <div className="w-full bg-gray-50">
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Équipes</h1>
          <p className="text-lg max-w-3xl">
            Découvrez les différentes équipes du FC Coussa Hers et leurs
            compositions.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <TeamSelector teams={TEAMS_DATA.map(team => ({ id: team.id, name: team.name }))} activeTeam={activeTeam} onSelectTeam={setActiveTeam} />
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