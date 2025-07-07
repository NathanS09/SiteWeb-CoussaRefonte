import React from 'react';
interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  image?: string;
}
interface PlayerCardProps {
  player: Player;
}
const PlayerCard: React.FC<PlayerCardProps> = ({
  player
}) => {
  return <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-green-800 overflow-hidden flex items-center justify-center relative">
        {player.image ? <img src={player.image} alt={player.name} className="w-full h-full object-cover" /> : <span className="text-green-800 font-bold text-xl">
            {player.number}
          </span>}
      </div>
      <div className="mt-1 bg-white/80 px-2 py-1 rounded text-center">
        <p className="font-bold text-xs md:text-sm">{player.name}</p>
        <p className="text-xs text-gray-600">{player.position}</p>
      </div>
    </div>;
};
export default PlayerCard;