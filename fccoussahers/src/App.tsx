import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Club from './pages/Club';
import Teams from './pages/Teams';
import Partners from './pages/Partners';
export function App() {
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