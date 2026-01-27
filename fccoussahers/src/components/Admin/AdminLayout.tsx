import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Image, 
  Handshake, 
  Info, 
  LogOut, 
  BarChart3,
  Globe
} from 'lucide-react';
import { logout } from '../../api';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin/dashboard' },
    { icon: BarChart3, label: 'Statistiques', path: '/admin/stats' }, // Nouvel onglet
    { icon: Users, label: 'Équipes', path: '/admin/equipes' },
    { icon: Calendar, label: 'Événements', path: '/admin/evenements' },
    { icon: Image, label: 'Galerie Amicale', path: '/admin/amicale' },
    { icon: Handshake, label: 'Partenaires', path: '/admin/partenaires' },
    { icon: Info, label: 'Infos Club', path: '/admin/club' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR GAUCHE (Fixe) */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <LayoutDashboard className="text-primary" size={24} />
          </div>
          <span className="font-bold text-gray-800 text-lg">Admin FCCH</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          
          {/* Bouton Retour au Site */}
          <Link 
            to="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 w-full text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
          >
            <Globe size={20} />
            Retour au site
          </Link>

          {/* Bouton Déconnexion */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL (Décalé vers la droite) */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;