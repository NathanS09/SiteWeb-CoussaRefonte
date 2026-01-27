import React, { useEffect, useState } from 'react';
import { fetchTeams, fetchEvents, fetchPartenaires, fetchDonnees } from '../../api';
import { Users, Calendar, Trophy, Handshake, BarChart3, ExternalLink, ArrowRight } from 'lucide-react';

const Stats: React.FC = () => {
  const [stats, setStats] = useState({ teams: 0, events: 0, partners: 0, matches: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, e, p, m] = await Promise.all([
             fetchTeams(), 
             fetchEvents(), 
             fetchPartenaires(), 
             fetchDonnees()
        ]);
        setStats({
            teams: t?.length || 0,
            events: e?.length || 0,
            partners: p?.length || 0,
            matches: m?.length || 0
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-full ${color} text-white shadow-lg shadow-${color}/30`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-extrabold text-gray-800">{loading ? '-' : value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Statistiques du Club</h1>
      
      {/* 1. KPIs Internes (Tes données à toi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Équipes" value={stats.teams} icon={Users} color="bg-blue-600" />
        <StatCard label="Matchs gérés" value={stats.matches} icon={Trophy} color="bg-green-600" />
        <StatCard label="Événements" value={stats.events} icon={Calendar} color="bg-orange-500" />
        <StatCard label="Partenaires" value={stats.partners} icon={Handshake} color="bg-purple-600" />
      </div>

      {/* 2. Section Audience Externe (Le lien propre vers Google) */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        
        {/* Carte Google Analytics */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                        <BarChart3 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Suivi d'audience</h3>
                </div>
                <p className="text-gray-600 mb-6">
                    Accédez aux données détaillées : nombre de visiteurs, pages les plus vues, localisation des supporters...
                </p>
                
                <a 
                    href="https://analytics.google.com/analytics/web/#/a382100256p521756089/realtime/overview?params=_u..nav%3Dmaui" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all hover:gap-3"
                >
                    Ouvrir Google Analytics <ExternalLink size={16} />
                </a>
            </div>
            
            {/* Décoration d'arrière plan */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                <BarChart3 size={200} />
            </div>
        </div>


      </div>
    </div>
  );
};

export default Stats;