import React, { useState } from 'react';
import TeamSelector from '../components/Teams/TeamSelector';
import TeamFormation from '../components/Teams/TeamFormation';
import TeamOverview from '../components/Teams/TeamOverview';
// Sample data - in a real app, this would come from an API or backend
const teamsData = [{
  id: 'seniors',
  name: 'Séniors',
  coach: 'Jean Dupont',
  category: 'Départemental 2',
  description: 'Notre équipe première évolue en Départemental 2. Composée de joueurs expérimentés et de jeunes talents, elle vise la montée en D1 cette saison.',
  image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
}, {
  id: 'u17',
  name: 'U17',
  coach: 'Pierre Martin',
  category: 'Départemental',
  description: "Notre équipe U17 est en pleine progression. Ces jeunes joueurs représentent l'avenir du club et s'entraînent dur pour développer leurs compétences.",
  image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80'
}, {
  id: 'u13',
  name: 'U13',
  coach: 'Marie Leroy',
  category: 'Départemental',
  description: "Notre équipe U13 apprend les fondamentaux du football dans un environnement ludique et formateur. L'accent est mis sur le développement technique et le plaisir de jouer.",
  image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
}];
// Sample player data
const playersData = {
  seniors: [{
    id: 1,
    name: 'Hugo Bernard',
    number: 1,
    position: 'Gardien'
  }, {
    id: 2,
    name: 'Lucas Petit',
    number: 2,
    position: 'Défenseur'
  }, {
    id: 3,
    name: 'Thomas Durand',
    number: 4,
    position: 'Défenseur'
  }, {
    id: 4,
    name: 'Maxime Lefevre',
    number: 5,
    position: 'Défenseur'
  }, {
    id: 5,
    name: 'Alexandre Moreau',
    number: 3,
    position: 'Défenseur'
  }, {
    id: 6,
    name: 'Nicolas Robert',
    number: 6,
    position: 'Milieu'
  }, {
    id: 7,
    name: 'Antoine Richard',
    number: 8,
    position: 'Milieu'
  }, {
    id: 8,
    name: 'Julien Simon',
    number: 10,
    position: 'Milieu'
  }, {
    id: 9,
    name: 'Romain Laurent',
    number: 7,
    position: 'Attaquant'
  }, {
    id: 10,
    name: 'Mathieu Michel',
    number: 9,
    position: 'Attaquant'
  }, {
    id: 11,
    name: 'David Lefebvre',
    number: 11,
    position: 'Attaquant'
  }],
  u17: [{
    id: 12,
    name: 'Léo Garcia',
    number: 1,
    position: 'Gardien'
  }, {
    id: 13,
    name: 'Enzo Martinez',
    number: 2,
    position: 'Défenseur'
  }, {
    id: 14,
    name: 'Nathan Lopez',
    number: 4,
    position: 'Défenseur'
  }, {
    id: 15,
    name: 'Théo Martin',
    number: 5,
    position: 'Défenseur'
  }, {
    id: 16,
    name: 'Lucas Rodriguez',
    number: 3,
    position: 'Défenseur'
  }, {
    id: 17,
    name: 'Hugo Fernandez',
    number: 6,
    position: 'Milieu'
  }, {
    id: 18,
    name: 'Jules Gonzalez',
    number: 8,
    position: 'Milieu'
  }, {
    id: 19,
    name: 'Adam Perez',
    number: 10,
    position: 'Milieu'
  }, {
    id: 20,
    name: 'Louis Sanchez',
    number: 7,
    position: 'Attaquant'
  }, {
    id: 21,
    name: 'Noah Ramirez',
    number: 9,
    position: 'Attaquant'
  }, {
    id: 22,
    name: 'Gabriel Torres',
    number: 11,
    position: 'Attaquant'
  }],
  u13: [{
    id: 23,
    name: 'Raphaël Jimenez',
    number: 1,
    position: 'Gardien'
  }, {
    id: 24,
    name: 'Maxime Moreno',
    number: 2,
    position: 'Défenseur'
  }, {
    id: 25,
    name: 'Ethan Ortega',
    number: 4,
    position: 'Défenseur'
  }, {
    id: 26,
    name: 'Sacha Navarro',
    number: 5,
    position: 'Défenseur'
  }, {
    id: 27,
    name: 'Tom Molina',
    number: 3,
    position: 'Défenseur'
  }, {
    id: 28,
    name: 'Victor Ortiz',
    number: 6,
    position: 'Milieu'
  }, {
    id: 29,
    name: 'Nolan Delgado',
    number: 8,
    position: 'Milieu'
  }, {
    id: 30,
    name: 'Mathis Castro',
    number: 10,
    position: 'Milieu'
  }, {
    id: 31,
    name: 'Liam Suarez',
    number: 7,
    position: 'Attaquant'
  }, {
    id: 32,
    name: 'Timéo Herrera',
    number: 9,
    position: 'Attaquant'
  }, {
    id: 33,
    name: 'Evan Medina',
    number: 11,
    position: 'Attaquant'
  }]
};

let teamsNames = ["Senior D3", "Senior D1", "U14 Territoire", "U13", "U12", "U11/U10", "U9/U8", "U7/U6"];

const Teams: React.FC = () => {
  const [activeTeam, setActiveTeam] = useState('seniors');
  const currentTeam = teamsData.find(team => team.id === activeTeam);
  const currentPlayers = playersData[activeTeam as keyof typeof playersData];
  return <div className="w-full bg-gray-50">
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Équipes</h1>
          <p className="text-lg max-w-3xl">
            Découvrez les différentes équipes du FC Coussa Hers et leurs
            compositions.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <TeamSelector teams={teamsNames.map(team => ({
          id: team,
          name: team
        }))} activeTeam={activeTeam} onSelectTeam={setActiveTeam} />
        </div>
        {currentTeam && <div className="mb-12">
            <TeamOverview team={currentTeam} />
          </div>}
        {/*<h2 className="text-2xl font-bold text-green-800 mb-6">
          Composition de l'équipe
        </h2>
         <TeamFormation players={currentPlayers} /> */}
      </div>
    </div>;
};
export default Teams;