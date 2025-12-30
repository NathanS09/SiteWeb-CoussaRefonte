import React from 'react';
import MatchCard from './MatchCard';
import {clubConfig} from '../../config/clubConfig';
import { Match } from '../../data/matches';
interface MatchesListProps {
  title: string;
  isPast: boolean;
  matches: Array<Match>;
}
const MatchesList: React.FC<MatchesListProps> = ({
  title,
  isPast,
  matches
}) => {
  return <div>
      <h2 className={`text-2xl font-bold text-primary mb-4`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map(match => <MatchCard key={match.id} homeTeam={match.homeTeam} awayTeam={match.awayTeam} homeScore={match.homeScore} awayScore={match.awayScore} date={match.date} time={match.time} venue={match.venue} isPast={isPast} homeTeamLogo={match.homeTeamLogo} awayTeamLogo={match.awayTeamLogo} />)}
      </div>
    </div>;
};
export default MatchesList;
