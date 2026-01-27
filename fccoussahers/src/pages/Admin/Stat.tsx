import React, { useEffect, useState } from 'react';
import { fetchTeams, fetchEvents, fetchPartenaires, fetchDonnees } from '../../api';
import { Users, Calendar, Trophy, Handshake, TrendingUp } from 'lucide-react';

const Stats: React.FC = () => {
  const [stats, setStats] = useState({ teams: 0, events: 0, partners: 0, matches: 0 });

  useEffect(() => {
    const load = async () => {
      const [t, e, p, m] = await Promise.all([fetchTeams(), fetchEvents(), fetchPartenaires(), fetchDonnees()]);
      setStats({
        teams: t?.length || 0,
        events: e?.length || 0,
        partners: p?.length || 0,
        matches: m?.length || 0
      });
    };
    load();
  }, []);

  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-full ${color} text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Statistiques du Club</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Équipes" value={stats.teams} icon={Users} color="bg-blue-500" />
        <StatCard label="Matchs joués" value={stats.matches} icon={Trophy} color="bg-green-500" />
        <StatCard label="Événements" value={stats.events} icon={Calendar} color="bg-orange-500" />
        <StatCard label="Partenaires" value={stats.partners} icon={Handshake} color="bg-purple-500" />
      </div>

      {/* Section "Visiteurs" (Placeholder pour l'instant) */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Suivi des visiteurs</h3>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
           Pour voir le nombre de visites sur le site, connectez votre compte 
           <strong> Google Analytics</strong> ou <strong>Plausible</strong>.
        </p>
        <button className="mt-4 text-primary font-bold hover:underline">
            Comment installer Google Analytics ?
        </button>
      </div>
    </div>
  );
};

export default Stats;