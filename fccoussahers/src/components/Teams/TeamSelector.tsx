import React from 'react';
interface TeamSelectorProps {
  teams: Array<{
    id: string;
    name: string;
  }>;
  activeTeam: string;
  onSelectTeam: (teamId: string) => void;
}
const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  activeTeam,
  onSelectTeam
}) => {
  return <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-800 mb-4">Nos Équipes</h2>
      <div className="flex flex-wrap gap-2">
        {teams.map(team => <button key={team.id} className={`px-4 py-2 rounded-md transition-colors ${activeTeam === team.id ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => onSelectTeam(team.id)}>
            {team.name}
          </button>)}
      </div>
    </div>;
};
export default TeamSelector;