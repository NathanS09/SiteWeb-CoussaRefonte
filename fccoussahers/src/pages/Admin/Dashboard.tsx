import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, getCurrentUser } from '../../api';
import { clubConfig } from '../../config/clubConfig';
import { 
  LogOut, 
  Calendar, 
  Trophy, 
  Users, 
  Image, 
  Shield, 
  PlusCircle 
} from 'lucide-react'; // Installez lucide-react si besoin

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Protection de la route : Si pas connecté, ouste !
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Composant pour les Cartes du menu (pour éviter de répéter le code)
  const DashboardCard = ({ title, desc, icon: Icon, color, onClick }: any) => (
    <button 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-start text-left group"
    >
      <div className={`p-3 rounded-lg ${color} text-white mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-primary/10 p-2 rounded-full">
                <Shield className="text-primary" size={20} />
             </div>
             <div>
                <h1 className="text-xl font-bold text-gray-800">Espace Dirigeant</h1>
                <p className="text-xs text-gray-500">Connecté en tant que {user?.email}</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue au club !</h2>
            <p className="text-gray-600">Que souhaitez-vous faire aujourd'hui ?</p>
        </div>

        {/* Grille d'actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* GESTION MATCHS */}
            <DashboardCard 
                title="Résultats & Matchs" 
                desc="Saisir les scores du week-end ou ajouter des matchs."
                icon={Trophy}
                color="bg-blue-600"
                onClick={() => console.log("Vers page matchs...") /* navigate('/admin/matchs') */}
            />

            {/* GESTION ÉVÉNEMENTS */}
            <DashboardCard 
                title="Agenda & Événements" 
                desc="Créer un loto, un tournoi ou une réunion."
                icon={Calendar}
                color="bg-purple-600"
                onClick={() => console.log("Vers page events...")}
            />

            {/* GESTION ÉQUIPES */}
            <DashboardCard 
                title="Équipes & Joueurs" 
                desc="Modifier les effectifs et les photos d'équipe."
                icon={Users}
                color="bg-green-600"
                onClick={() => console.log("Vers page teams...")}
            />

            {/* GALERIE PHOTO */}
            <DashboardCard 
                title="Galerie Photo (Amicale)" 
                desc="Ajouter des souvenirs de la vie du club."
                icon={Image}
                color="bg-orange-500"
                onClick={() => console.log("Vers page amicale...")}
            />

            {/* RACCOURCI RAPIDE */}
            <button className="col-span-1 md:col-span-2 lg:col-span-1 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <PlusCircle size={32} className="mb-2" />
                <span className="font-medium">Action Rapide</span>
            </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
