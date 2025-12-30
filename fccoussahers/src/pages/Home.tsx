import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import MatchesList from '../components/Home/MatchesList';
import { fetchDonnees } from '../api.tsx';
import { useEffect, useState } from 'react';
import { Match } from '../data/matches.ts';

interface ExtendedMatch extends Match {
  rawDate: Date;
}

const Home: React.FC =  () => {
  const [pastMatches, setPastMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const loadData = async () => {
      const data = await fetchDonnees();

      if (data) {
        const allMatches: ExtendedMatch[] = data.map((record: any) => {
          const matchDate = new Date(record.date); 
          const now = new Date();
          
          return {
            id: record.id,
            homeTeam: record.home_team, 
            awayTeam: record.away_team,
            homeScore: record.home_score,
            awayScore: record.away_score,
            date: matchDate.toLocaleDateString('fr-FR'), 
            time: record.time,
            venue: record.venue,
            isPast: matchDate < now,
            homeTeamLogo: record.home_logo,
            awayTeamLogo: record.away_logo,  
            rawDate: matchDate
          };
        });

        const past = allMatches
          .filter(m => m.isPast)
          .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
          .slice(0, 3); // On garde les 3 premiers

        const upcoming = allMatches
          .filter(m => !m.isPast)
          .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
          .slice(0, 3); // On garde les 3 premiers

        setPastMatches(past);
        setUpcomingMatches(upcoming);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);


  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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