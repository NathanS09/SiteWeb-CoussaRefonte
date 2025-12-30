import React from 'react';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time?: string;
  venue?: string;
  isPast: boolean;
  homeTeamLogo?: string; // Nouveau prop
  awayTeamLogo?: string; // Nouveau prop
}

const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  venue,
  isPast,
  homeTeamLogo,
  awayTeamLogo
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`bg-secondary text-white py-2 px-4 text-center font-medium`}>
        {isPast ? 'Match terminé' : 'Match à venir'}
      </div>
      <div className="p-4">
        <div className="text-center text-sm text-gray-600 mb-3">
          {date} {time && `• ${time}`}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          
          {/* ÉQUIPE DOMICILE (Logo à gauche du nom) */}
          <div className="flex-1 flex items-center justify-end pr-2 gap-3">
             {/* Si le logo existe, on l'affiche */}
             {homeTeamLogo && (
               <img src={homeTeamLogo} alt={homeTeam} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
             )}
             <div className="font-bold text-lg text-right leading-tight">{homeTeam}</div>
          </div>

          {/* SCORE / VS (Centre) */}
          <div className="flex items-center justify-center min-w-[80px]">
            {isPast ? (
              <div className="flex items-center bg-gray-100 rounded-lg py-2 px-3">
                <span className="text-xl font-bold">{homeScore}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="text-xl font-bold">{awayScore}</span>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg py-2 px-4">
                <span className="text-lg font-medium">VS</span>
              </div>
            )}
          </div>

          {/* ÉQUIPE EXTÉRIEUR (Logo à droite du nom) */}
          <div className="flex-1 flex items-center justify-start pl-2 gap-3">
            <div className="font-bold text-lg text-left leading-tight">{awayTeam}</div>
            {awayTeamLogo && (
               <img src={awayTeamLogo} alt={awayTeam} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
             )}
          </div>

        </div>
        {venue && <div className="text-center text-xs text-gray-500 mt-2">{venue}</div>}
      </div>
    </div>
  );
};

export default MatchCard;