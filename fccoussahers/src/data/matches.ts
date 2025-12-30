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
  homeTeamLogo?: string;
  awayTeamLogo?: string;
}
