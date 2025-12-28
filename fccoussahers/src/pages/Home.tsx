import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import MatchesList from '../components/Home/MatchesList';
const Home: React.FC = () => {
  // Sample data - in a real app, this would come from an API or backend
  const pastMatches = [{
    id: 1,
    homeTeam: 'FC Coussa Hers',
    awayTeam: 'Equipe',
    homeScore: 2,
    awayScore: 1,
    date: '12/11/2023',
    venue: 'Stade Municipal, Coussa'
  }, {
    id: 2,
    homeTeam: 'Equipe',
    awayTeam: 'FC Coussa Hers',
    homeScore: 0,
    awayScore: 3,
    date: '05/11/2023',
    venue: 'Stade de Toulouse'
  }, {
    id: 3,
    homeTeam: 'FC Coussa Hers',
    awayTeam: 'Equipe',
    homeScore: 1,
    awayScore: 1,
    date: '29/10/2023',
    venue: 'Stade Municipal, Coussa'
  }];
  const upcomingMatches = [{
    id: 4,
    homeTeam: 'Equipe',
    awayTeam: 'FC Coussa Hers',
    date: '19/11/2023',
    time: '15:00',
    venue: 'Stade Vélodrome, Marseille'
  }, {
    id: 5,
    homeTeam: 'FC Coussa Hers',
    awayTeam: 'Equipe',
    date: '26/11/2023',
    time: '15:00',
    venue: 'Stade Municipal, Coussa'
  }, {
    id: 6,
    homeTeam: 'Equipe',
    awayTeam: 'FC Coussa Hers',
    date: '03/12/2023',
    time: '15:00',
    venue: 'Allianz Riviera, Nice'
  }];
  return <div className="w-full">
      <HeroBanner />
      <div className="container mx-auto px-4 py-12">
        <div id="matches" className="space-y-12">
          <MatchesList title="Derniers Matchs" isPast={true} matches={pastMatches} />
          <MatchesList title="Prochains Matchs" isPast={false} matches={upcomingMatches} />
        </div>
      </div>
    </div>;
};
export default Home;