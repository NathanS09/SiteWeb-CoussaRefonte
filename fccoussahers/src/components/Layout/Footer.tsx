import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Club Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FC Coussa Hers</h3>
            <div className="flex items-center mb-3">
              <MapPin size={18} className="mr-2" />
              <span>17 Rue du Château, 09100 Les Pujols</span>
            </div>
            <div className="flex items-center mb-3">
              <Phone size={18} className="mr-2" />
              <span>05 61 68 71 44</span>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              <span>581747@footoccitanie.fr</span>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/club" className="hover:underline">
                  Le Club
                </Link>
              </li>
              <li>
                <Link to="/equipes" className="hover:underline">
                  Équipes
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className="hover:underline">
                  Partenaires
                </Link>
              </li>
              <li>
                <a href="https://example.com/boutique" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Boutique
                </a>
              </li>
            </ul>
          </div>
          {/* Social & Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Affiliations</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="https://ariege.fff.fr/" target="_blank" rel="noopener noreferrer" className="block">
                <img src="/district_ariege.webp" alt="District Ariège FFF" className="h-12 bg-white p-1 rounded" />
              </a>
              <a href="https://occitanie.fff.fr/" target="_blank" rel="noopener noreferrer" className="block">
                <img src="/Ligue_de_Football_dOccitanie.svg" alt="Ligue de Football d'Occitanie" className="h-12 bg-white p-1 rounded" />
              </a>
            </div>
            <h4 className="font-semibold mb-2">Suivez-nous</h4>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:underline mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </a>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} FC Coussa Hers. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;