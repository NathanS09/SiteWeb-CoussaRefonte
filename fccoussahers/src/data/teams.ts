export interface Player {
  id: number;
  name: string;
  number: number;
  position: 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant';
  image?: string;
}

export interface Team {
  id: string;
  name: string;
  coach: string;
  category: string;
  description: string;
  image: string;
  players?: Player[]; // On lie les joueurs directement à l'équipe
}

