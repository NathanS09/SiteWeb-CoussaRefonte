export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time?: string;
  venue?: string;
  isPast: boolean; // J'ai fusionné tes deux listes avec ce flag
}

export const MATCHES_DATA: Match[] = [
  // Anciens matchs
  {
    id: 1,
    homeTeam: 'FC Coussa Hers',
    awayTeam: 'Equipe A',
    homeScore: 2,
    awayScore: 1,
    date: '12/11/2023',
    venue: 'Stade Municipal, Coussa',
    isPast: true
  },
  {
    id: 2,
    homeTeam: 'Equipe B',
    awayTeam: 'FC Coussa Hers',
    homeScore: 0,
    awayScore: 3,
    date: '05/11/2023',
    venue: 'Stade de Toulouse',
    isPast: true
  },
  {
    id: 3,
    homeTeam: 'FC Coussa Hers',
    awayTeam: 'Equipe C',
    homeScore: 1,
    awayScore: 1,
    date: '29/10/2023',
    venue: 'Stade Municipal, Coussa',
    isPast: true
  },
  // Matchs à venir
  {
    id: 4,
    homeTeam: 'Equipe D',
    awayTeam: 'FC Coussa Hers',
    date: '19/11/2023',
    time: '15:00',
    venue: 'Stade Vélodrome, Marseille',
    isPast: false
  },
  {
    id: 5,
    homeTeam: 'FC Coussa Hers',
    awayTeam: 'Equipe E',
    date: '26/11/2023',
    time: '15:00',
    venue: 'Stade Municipal, Coussa',
    isPast: false
  },
  {
    id: 6,
    homeTeam: 'Equipe F',
    awayTeam: 'FC Coussa Hers',
    date: '03/12/2023',
    time: '15:00',
    venue: 'Allianz Riviera, Nice',
    isPast: false
  }
];