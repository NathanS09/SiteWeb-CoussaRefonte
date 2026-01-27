import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import MatchesList from '../components/Home/MatchesList';
import { useMemo } from 'react';
import { Match } from '../data/matches.ts';
import { useClubData } from '../context/ClubContext.tsx';
import SEO from '../components/Utils/SEO.tsx';

interface ExtendedMatch extends Match {
  rawDate: Date;
}

const Home: React.FC =  () => {
  const { matches: rawMatches, loading } = useClubData();

const { pastMatches, upcomingMatches } = useMemo(() => {
    if (!rawMatches) return { pastMatches: [], upcomingMatches: [] };

    const now = new Date();
    
    const formattedMatches = rawMatches.map((record: any) => {
      const matchDate = new Date(record.date);
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

    return {
      pastMatches: formattedMatches
        .filter(m => m.isPast)
        .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
        .slice(0, 3),
      upcomingMatches: formattedMatches
        .filter(m => !m.isPast)
        .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
        .slice(0, 3)
    };
  }, [rawMatches]);

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