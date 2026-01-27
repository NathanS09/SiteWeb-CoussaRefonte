import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Club from './pages/Club';
import Teams from './pages/Teams';
import Partners from './pages/Partners';
import Events from './pages/Events';
import Amicale from './pages/Amicale';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import { clubConfig } from './config/clubConfig';
import { useEffect } from 'react';
import { ClubProvider } from './context/ClubContext';
import ManagePartners from './pages/Admin/ManagePartners';
import ManageClub from './pages/Admin/ManageClub';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageTeams from './pages/Admin/ManageTeams';
import ManageAmicale from './pages/Admin/ManageAmicale';
import { Toaster } from 'react-hot-toast';
import { AdminRedirect, ProtectedRoute } from './components/Admin/AdminRoutes';
import AdminLayout from './components/Admin/AdminLayout'; 
import Stats from './pages/Admin/Stat';
import Legal from './pages/Legal';
import CookieBanner from './components/Utils/CookieBanner';

export function App() {

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', clubConfig.theme.primary);
    root.style.setProperty('--color-primary-dark', clubConfig.theme.primaryDark);
    root.style.setProperty('--color-primary-light', clubConfig.theme.primaryLight);
    root.style.setProperty('--color-secondary', clubConfig.theme.secondary);
    root.style.setProperty('--color-accent', clubConfig.theme.accent);
    root.style.setProperty('--color-accent-hover', clubConfig.theme.accentHover);
    root.style.setProperty('--color-surface', clubConfig.theme.surface);
  }, []);

  const NotFoundHandler = () => {
  const location = useLocation();
  // Si l'url commençait par /admin (ex: /admin/nimportequoi), on le garde dans l'admin
  if (location.pathname.startsWith('/admin')) {
    return <AdminRedirect />;
  }
  // Sinon, retour à l'accueil du site
  return <Navigate to="/" replace />;
};

  return <ClubProvider>
    <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <CookieBanner />
        <Routes>
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/club" element={<Club />} />
            <Route path="/equipes" element={<Teams />} />
            <Route path="/partenaires" element={<Partners />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/amicale" element={<Amicale />} />
            <Route path="/legal" element={<Legal />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/partenaires" element={<ManagePartners />} />
              <Route path="/admin/club" element={<ManageClub />} />
              <Route path="/admin/evenements" element={<ManageEvents />} />
              <Route path="/admin/amicale" element={<ManageAmicale />} /> 
              <Route path="/admin/equipes" element={<ManageTeams />} /> 
              <Route path="/admin/stats" element={<Stats />} />
            </Route>
          </Route>

          <Route path="/admin/login" element={<Login />} />
          <Route path="*" element={<NotFoundHandler />} />
        </Routes>
    </Router>
    </ClubProvider>
}
