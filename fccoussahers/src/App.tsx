import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Club from './pages/Club';
import Teams from './pages/Teams';
import Partners from './pages/Partners';
import { clubConfig } from './config/clubConfig';
import { useEffect } from 'react';
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

  return <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<Club />} />
          <Route path="/equipes" element={<Teams />} />
          <Route path="/partenaires" element={<Partners />} />
        </Routes>
      </Layout>
    </Router>;
}