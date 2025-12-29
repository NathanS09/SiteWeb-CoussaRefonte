import React from 'react';
import {clubConfig} from '../../config/clubConfig';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time?: string;
  venue?: string;
  isPast: boolean;
}
const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  venue,
  isPast
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`bg-secondary text-white py-2 px-4 text-center font-medium`}>
        {isPast ? 'Match terminé' : 'Match à venir'}
      </div>
      <div className="p-4">
        <div className="text-center text-sm text-gray-600 mb-3">
          {date} {time && `• ${time}`}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 text-right pr-3">
            <div className="font-bold text-lg">{homeTeam}</div>
          </div>
          <div className="flex items-center justify-center">
            {isPast ? <div className="flex items-center bg-gray-100 rounded-lg py-2 px-4">
                <span className="text-xl font-bold">{homeScore}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="text-xl font-bold">{awayScore}</span>
              </div> : <div className="bg-gray-100 rounded-lg py-2 px-4">
                <span className="text-lg font-medium">VS</span>
              </div>}
          </div>
          <div className="flex-1 text-left pl-3">
            <div className="font-bold text-lg">{awayTeam}</div>
          </div>
        </div>
        {venue && <div className="text-center text-sm text-gray-600">{venue}</div>}
      </div>
    </div>;
};
export default MatchCard;
