import React from 'react';
import { clubConfig } from '../../config/clubConfig';
interface Team {
  id: string;
  name: string;
  coach: string;
  category: string;
  description: string;
  image?: string;
}
interface TeamOverviewProps {
  team: Team;
}
const TeamOverview: React.FC<TeamOverviewProps> = ({
  team
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 md:h-64 bg-gray-300 relative">
        {team.image ? <img src={team.image} alt={`Équipe ${team.name}`} className="w-full h-full object-cover" /> : <div className={`w-full h-full flex items-center justify-center bg-color-accent`}>
            <span className={`text-primary font-bold text-xl`}>
              {team.name}
            </span>
          </div>}
      </div>
      <div className="p-6">
        <h2 className={`text-2xl font-bold text-primary mb-2`}>{team.name}</h2>
        <div className="mb-4">
          <span className={`inline-block bg-color-accent text-primary rounded-full px-3 py-1 text-sm font-semibold mr-2`}>
            {team.category}
          </span>
        </div>
        <div className="mb-4">
          <p className="font-medium">
            Entraîneur: <span className="font-normal">{team.coach}</span>
          </p>
        </div>
        <div className="prose max-w-none">
          <p>{team.description}</p>
        </div>
      </div>
    </div>;
};
export default TeamOverview;
