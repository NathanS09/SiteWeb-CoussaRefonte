export interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website?: string;
  isFeatured: boolean;
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: 1,
    name: 'Mairie de Coussa',
    description: 'La mairie de Coussa soutient le club depuis sa création et met à disposition les infrastructures sportives.',
    logo: "/mairie_coussa.webp",
    website: 'https://example.com/mairie',
    isFeatured: true
  },
  {
    id: 2,
    name: 'District Ariège FFF',
    description: "Le District de Football de l'Ariège organise les compétitions départementales auxquelles participe le FC Coussa Hers.",
    logo: "/district_ariege.webp",
    website: 'https://ariege.fff.fr/',
    isFeatured: true
  },
  {
    id: 3,
    name: "Ligue d'Occitanie",
    description: "La Ligue de Football d'Occitanie supervise les compétitions régionales et soutient le développement du football amateur.",
    logo: "/Ligue_de_Football_dOccitanie.svg",
    website: 'https://occitanie.fff.fr/',
    isFeatured: false
  },
  {
    id: 4,
    name: 'Mairie de Pujols',
    description: 'La commune voisine de Pujols est un partenaire important qui soutient les projets du club.',
    logo: "/mairie_pujol.webp",
    website: 'https://example.com/pujols',
    isFeatured: false
  },
  {
    id: 5,
    name: 'Intermarché',
    description: 'Intermarché fournit les ravitaillements lors des tournois organisés par le club.',
    logo: 'https://via.placeholder.com/200x100?text=Intermarche',
    website: 'https://example.com/intermarche',
    isFeatured: false
  },
  {
    id: 6,
    name: 'Restaurant Le Petit Coussa',
    description: "Le restaurant accueille les repas d'après-match et les événements du club.",
    logo: 'https://via.placeholder.com/200x100?text=Le+Petit+Coussa',
    website: 'https://example.com/restaurant',
    isFeatured: false
  }
];