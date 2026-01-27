import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../api';

/**
 * Composant 1 : Redirection intelligente pour "/admin"
 * Si connecté -> Dashboard
 * Si pas connecté -> Login
 */
export const AdminRedirect: React.FC = () => {
  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/admin/login" replace />;
};

/**
 * Composant 2 : Protection des routes (Le "Vigile")
 * Empêche d'accéder aux pages si pas connecté
 */
export const ProtectedRoute: React.FC = () => {
  if (!isAuthenticated()) {
    // On redirige vers le login si le token n'est pas bon
    return <Navigate to="/admin/login" replace />;
  }
  // Sinon, on laisse passer (Outlet affiche la page demandée)
  return <Outlet />;
};