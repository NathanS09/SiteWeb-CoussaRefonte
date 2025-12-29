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
  players: Player[]; // On lie les joueurs directement à l'équipe
}

export const TEAMS_DATA: Team[] = [
  {
    id: 'seniors',
    name: 'Séniors',
    coach: 'Jean Dupont',
    category: 'Départemental 2',
    description: 'Notre équipe première évolue en Départemental 2...',
    image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=2071&q=80',
    players: [
       { id: 1, name: 'Hugo Bernard', number: 1, position: 'Gardien' },
       { id: 2, name: 'Lucas Petit', number: 2, position: 'Défenseur' },
       // ... tu peux remettre le reste de tes joueurs ici
    ]
  },
  {
    id: 'u17',
    name: 'U17',
    coach: 'Pierre Martin',
    category: 'Départemental',
    description: "Notre équipe U17 est en pleine progression...",
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1936&q=80',
    players: [] // Remplis avec tes données
  },
  {
    id: 'u13',
    name: 'U13',
    coach: 'Marie Leroy',
    category: 'Départemental',
    description: "Notre équipe U13 apprend les fondamentaux...",
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=2070&q=80',
    players: [] // Remplis avec tes données
  }
];