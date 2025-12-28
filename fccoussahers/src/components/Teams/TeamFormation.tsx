import React from 'react';
import PlayerCard from './PlayerCard';
import { clubConfig } from '../../config/clubConfig';
interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  image?: string;
}
interface TeamFormationProps {
  players: Player[];
}
const TeamFormation: React.FC<TeamFormationProps> = ({
  players
}) => {
  // Group players by position
  const goalkeeper = players.filter(p => p.position === 'Gardien');
  const defenders = players.filter(p => p.position === 'Défenseur');
  const midfielders = players.filter(p => p.position === 'Milieu');
  const forwards = players.filter(p => p.position === 'Attaquant');
  return <div className="py-8">
      <div className={`relative bg-${clubConfig.colors.color600} rounded-lg overflow-hidden`}>
        {/* Football field background */}
        <div className={`w-full h-[600px] md:h-[700px] bg-${clubConfig.colors.color600} relative`}>
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
          {/* Center line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white"></div>
          {/* Penalty areas */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-16 border-b-2 border-l-2 border-r-2 border-white"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-16 border-t-2 border-l-2 border-r-2 border-white"></div>
          {/* Players positioning */}
          <div className="absolute inset-0 flex flex-col">
            {/* Forwards */}
            <div className="flex-1 flex justify-center items-center">
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {forwards.map(player => <PlayerCard key={player.id} player={player} />)}
              </div>
            </div>
            {/* Midfielders */}
            <div className="flex-1 flex justify-center items-center">
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {midfielders.map(player => <PlayerCard key={player.id} player={player} />)}
              </div>
            </div>
            {/* Defenders */}
            <div className="flex-1 flex justify-center items-center">
              <div className="grid grid-cols-4 gap-4 md:gap-8">
                {defenders.map(player => <PlayerCard key={player.id} player={player} />)}
              </div>
            </div>
            {/* Goalkeeper */}
            <div className="flex-1 flex justify-center items-start pt-8">
              {goalkeeper.map(player => <PlayerCard key={player.id} player={player} />)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TeamFormation;
