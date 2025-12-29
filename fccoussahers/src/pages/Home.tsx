import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import MatchesList from '../components/Home/MatchesList';
import { MATCHES_DATA } from '../data/matches';
const Home: React.FC = () => {
  const pastMatches = MATCHES_DATA.filter(match => match.isPast);
  const upcomingMatches = MATCHES_DATA.filter(match => !match.isPast);

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