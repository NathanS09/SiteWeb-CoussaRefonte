import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, Facebook } from 'lucide-react'; // J'utilise l'icone Lucide pour Facebook c'est plus propre
import { clubConfig } from '../../config/clubConfig';

// 1. On définit la structure de nos liens
const NAV_ITEMS = [
  { label: 'Accueil', path: '/', type: 'internal' },
  { label: 'Le Club', path: '/club', type: 'internal' },
  { label: 'Équipes', path: '/equipes', type: 'internal' },
  { label: 'Compétitions', path: 'https://example.com/competitions', type: 'external' },
  { label: 'Partenaires', path: '/partenaires', type: 'internal' },
  // Le bouton Boutique est spécial, on le gère via une propriété isButton
  { label: 'Boutique', path: clubConfig.contact.shopUrl, type: 'external', isButton: true },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Pour savoir sur quelle page on est (optionnel)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 2. Fonction utilitaire pour générer un lien
  const renderNavLink = (item: typeof NAV_ITEMS[0], isMobile: boolean) => {
    // Styles de base
    const baseClass = "font-medium transition-colors duration-200";
    
    // Styles spécifiques Desktop vs Mobile
    const mobileClass = "block py-2 text-base";
    const desktopClass = "text-sm md:text-base";
    
    // Styles spécifiques Bouton vs Lien texte
    let colorClass = "text-gray-800 hover:text-" + clubConfig.colors.secondary;
    if (item.isButton) {
        colorClass = isMobile 
            ? `text-white bg-${clubConfig.colors.secondary} hover:bg-${clubConfig.colors.primary} px-4 py-2 rounded-md text-center mt-2`
            : `text-white bg-${clubConfig.colors.secondary} hover:bg-${clubConfig.colors.primary} px-4 py-2 rounded-md`;
    }

    // Gestion de l'état "Actif" (si on est sur la page)
    const isActive = location.pathname === item.path && !item.isButton;
    const activeClass = isActive ? `text-${clubConfig.colors.primary} font-bold` : "";

    const finalClass = `${baseClass} ${isMobile ? mobileClass : desktopClass} ${colorClass} ${activeClass}`;

    // Rendu conditionnel (Lien Interne ou Externe)
    if (item.type === 'external') {
      return (
        <a 
          key={item.label}
          href={item.path} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={finalClass}
          onClick={() => isMobile && setIsMenuOpen(false)} // Ferme le menu au clic en mobile
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link 
        key={item.label}
        to={item.path} 
        className={finalClass}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={clubConfig.identity.logoUrl} 
              alt={clubConfig.identity.name} 
              className="h-16 w-16 object-contain transition-transform group-hover:scale-105" 
            />
            <div className="ml-2">
              <h1 className={`font-bold text-${clubConfig.colors.primary} text-lg md:text-xl`}>
                {clubConfig.identity.name}
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* On boucle sur notre tableau */}
            {NAV_ITEMS.map(item => renderNavLink(item, false))}
            
            {/* L'icône Facebook reste à part car ce n'est pas du texte */}
            <a href={clubConfig.contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
              <Facebook size={24} />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-800 hover:bg-gray-100 focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 space-y-2 border-t mt-2">
            {NAV_ITEMS.map(item => renderNavLink(item, true))}
            
            <a 
                href={clubConfig.contact.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-600 hover:text-blue-800 py-2 font-medium"
            >
              <Facebook size={20} className="mr-2" /> Facebook
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
