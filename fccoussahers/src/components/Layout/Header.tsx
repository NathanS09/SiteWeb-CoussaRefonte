import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, Facebook, ChevronDown } from 'lucide-react'; 
import { clubConfig } from '../../config/clubConfig';

const NAV_ITEMS = [
  { label: 'Accueil', path: '/', type: 'internal' },
  { label: 'Le Club', path: '/club', type: 'internal' },
  { label: 'Équipes', path: '/equipes', type: 'internal' },

  { 
    label: 'Compétitions', 
    type: 'dropdown', 
    subItems: [
      { label: 'U14 / U15 / U16', path: clubConfig.contact.competitionsUrl2, type: 'external' },
      { label: 'Seniors / Autres', path: clubConfig.contact.competitionsUrl, type: 'external' }
    ]
  },
  
  { label: 'Partenaires', path: '/partenaires', type: 'internal' },
  { label: 'Boutique', path: clubConfig.contact.shopUrl, type: 'external', isButton: true },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderNavLink = (item: any, isMobile: boolean) => {

    if (item.type === 'dropdown') {
      if (isMobile) {

        return (
          <div key={item.label} className="flex flex-col items-start space-y-2">
            <span className="font-bold text-gray-900 py-2">{item.label}</span>
            {item.subItems.map((sub: any) => (
              <a 
                key={sub.label}
                href={sub.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block pl-4 py-2 text-sm text-gray-600 hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                — {sub.label}
              </a>
            ))}
          </div>
        );
      } else {
        return (
          <div key={item.label} className="relative group cursor-pointer h-full flex items-center">
            <button className="flex items-center text-sm md:text-base font-medium text-gray-800 group-hover:text-secondary transition-colors">
              {item.label}
              <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
            </button>
            
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-gray-100 rounded-md shadow-xl overflow-hidden min-w-[200px]">
                {item.subItems.map((sub: any) => (
                  <a
                    key={sub.label}
                    href={sub.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary border-b last:border-0"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }

    const baseClass = "font-medium transition-colors duration-200";
    const mobileClass = "block py-2 text-base";
    const desktopClass = "text-sm md:text-base";
    
    let colorClass = "text-gray-800 hover:text-secondary";
    if (item.isButton) {
        colorClass = isMobile 
            ? `text-white bg-secondary hover:bg-primary px-4 py-2 rounded-md text-center mt-2`
            : `text-white bg-secondary hover:bg-primary px-4 py-2 rounded-md`;
    }

    const isActive = location.pathname === item.path && !item.isButton;
    const activeClass = isActive ? `text-primary font-bold` : "";
    const finalClass = `${baseClass} ${isMobile ? mobileClass : desktopClass} ${colorClass} ${activeClass}`;

    if (item.type === 'external') {
      return (
        <a 
          key={item.label}
          href={item.path} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={finalClass}
          onClick={() => isMobile && setIsMenuOpen(false)}
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
              <h1 className={`font-bold text-primary text-lg md:text-xl`}>
                {clubConfig.identity.name}
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map(item => renderNavLink(item, false))}
            
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
          <nav className="md:hidden pt-4 pb-3 space-y-2 border-t mt-2 h-screen overflow-y-auto">
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