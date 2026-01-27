import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fcch_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fcch_cookie_consent', 'true');
    setIsVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('fcch_cookie_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 text-white p-4 z-50 backdrop-blur-sm border-t border-gray-700 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          <p>
            🍪 <strong>Cookies :</strong> Nous utilisons des cookies tiers (Google Analytics) pour analyser le trafic et améliorer l'expérience sur le site du club.
          </p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={handleAccept}
                className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap"
            >
                J'accepte
            </button>
            <button 
                onClick={handleRefuse}
                className="text-gray-400 hover:text-white px-2 py-2 text-sm underline decoration-gray-500"
            >
                Continuer sans accepter
            </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;