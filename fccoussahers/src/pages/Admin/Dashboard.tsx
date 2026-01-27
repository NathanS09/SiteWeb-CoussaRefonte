import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, getCurrentUser } from '../../api';
import { 
  LogOut, 
  Calendar, 
  Users, 
  Image, 
  Shield, 
  Handshake, 
  Info
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const DashboardCard = ({ title, desc, icon: Icon, color, onClick }: any) => (
    <button 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-start text-left group h-full"
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenue !</h2>
            <p className="text-gray-600">Sélectionnez une section à gérer :</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* GESTION CLUB (Infos + Bureau) */}
            <DashboardCard 
                title="Infos & Bureau" 
                desc="Modifier l'histoire du club et les membres du bureau."
                icon={Info}
                color="bg-blue-600"
                onClick={() => navigate('/admin/club')}
            />

            {/* GESTION PARTENAIRES */}
            <DashboardCard 
                title="Partenaires" 
                desc="Ajouter ou modifier les sponsors."
                icon={Handshake}
                color="bg-emerald-600"
                onClick={() => navigate('/admin/partenaires')}
            />

            {/* GESTION ÉQUIPES */}
            <DashboardCard 
                title="Équipes" 
                desc="Gérer les noms d'équipes et les coachs."
                icon={Users}
                color="bg-indigo-600"
                onClick={() => navigate('/admin/equipes')}
            />

            {/* GESTION ÉVÉNEMENTS */}
            <DashboardCard 
                title="Agenda / Événements" 
                desc="Créer les futurs événements (Lotos, Tournois...)."
                icon={Calendar}
                color="bg-orange-500"
                onClick={() => navigate('/admin/evenements')}
            />

            {/* GESTION AMICALE */}
            <DashboardCard 
                title="Galerie Amicale" 
                desc="Ajouter des photos souvenirs."
                icon={Image}
                color="bg-pink-500"
                onClick={() => navigate('/admin/amicale')}
            />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;