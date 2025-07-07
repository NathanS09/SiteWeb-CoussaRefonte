import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.webp" alt="FC Coussa Hers" className="h-16 w-16 object-contain" />
            <div className="ml-2">
              <h1 className="font-bold text-green-800 text-lg md:text-xl">
                FC Coussa Hers
              </h1>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-800 hover:text-green-700 transition-colors">
              Accueil
            </Link>
            <Link to="/club" className="font-medium text-gray-800 hover:text-green-700 transition-colors">
              Le Club
            </Link>
            <Link to="/equipes" className="font-medium text-gray-800 hover:text-green-700 transition-colors">
              Équipes
            </Link>
            <a href="https://example.com/competitions" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:text-green-700 transition-colors">
              Compétitions
            </a>
            <Link to="/partenaires" className="font-medium text-gray-800 hover:text-green-700 transition-colors">
              Partenaires
            </Link>
            <a href="https://team.jako.com/fr-fr/team/f_c_coussa_hers/" target="_blank" rel="noopener noreferrer" className="font-medium text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition-colors">
              Boutique
            </a>
            <a href="https://www.facebook.com/fc.c.hers/?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </nav>
          {/* Mobile menu button */}
          <button className="md:hidden rounded-md p-2 text-gray-800 hover:bg-gray-100" onClick={toggleMenu}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden pt-4 pb-3 space-y-3">
            <Link to="/" className="block font-medium text-gray-800 hover:text-green-700 py-2">
              Accueil
            </Link>
            <Link to="/club" className="block font-medium text-gray-800 hover:text-green-700 py-2">
              Le Club
            </Link>
            <Link to="/equipes" className="block font-medium text-gray-800 hover:text-green-700 py-2">
              Équipes
            </Link>
            <a href="https://example.com/competitions" target="_blank" rel="noopener noreferrer" className="block font-medium text-gray-800 hover:text-green-700 py-2">
              Compétitions
            </a>
            <Link to="/partenaires" className="block font-medium text-gray-800 hover:text-green-700 py-2">
              Partenaires
            </Link>
            <a href="https://example.com/boutique" target="_blank" rel="noopener noreferrer" className="block font-medium text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md text-center">
              Boutique
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800 py-2">
              Facebook
            </a>
          </nav>}
      </div>
    </header>;
};
export default Header;