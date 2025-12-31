import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchDonnees, fetchPartenaires, fetchTeams, fetchBoardMembers, fetchClubInfo, fetchEvents, fetchAmicale} from '../api';

interface ClubContextType {
  matches: any[];
  partners: any[];
  teams: any[];
  boardMembers: any[];
  clubInfo: any;
  events: any[];
  amicale: any[];
  loading: boolean;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ClubContextType>({
    matches: [],
    partners: [],
    teams: [],
    boardMembers: [],
    clubInfo: null,
    events: [],
    amicale: [],
    loading: true,
  });

  useEffect(() => {
    const loadAll = async () => {
      console.log("Chargement des données...");

      const [matches, partners, teams, boardMembers, clubInfo, events, amicale] = await Promise.all([
        fetchDonnees(),
        fetchPartenaires(),
        fetchTeams(),
        fetchBoardMembers(),
        fetchClubInfo('FCCH'),
        fetchEvents(),
        fetchAmicale()
      ]);

      setData({
        matches: matches || [],
        partners: partners || [],
        teams: teams || [],
        boardMembers: boardMembers || [],
        clubInfo: clubInfo,
        events: events || [],
        amicale: amicale || [],
        loading: false,
      });
    };

    loadAll();
  }, []);
  return (
    <ClubContext.Provider value={data}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClubData = () => {
  const context = useContext(ClubContext);
  if (context === undefined) {
    throw new Error('useClubData doit être utilisé dans ClubProvider');
  }
  return context;
};