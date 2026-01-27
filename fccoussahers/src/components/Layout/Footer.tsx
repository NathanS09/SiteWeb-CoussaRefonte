import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, ShoppingBag, MapPin, Phone, Mail } from 'lucide-react';
import { clubConfig } from '../../config/clubConfig';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white border-t-4 border-secondary">
      <div className="container mx-auto px-4 py-8">
        
        {/* PARTIE HAUTE : Le contenu principal en une ligne sur Desktop */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* 1. IDENTITÉ (Gauche) : Logo + Nom + Slogan */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
             <Link to="/" className="group relative">
                <div className="absolute inset-0 bg-white rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src={clubConfig.identity.logoUrl} 
                  alt="Logo" 
                  className="h-20 w-20 object-contain relative z-10 transform group-hover:rotate-6 transition-transform duration-500" 
                />
             </Link>
             <div className="text-left">
                <h2 className="font-bold text-xl uppercase tracking-wide leading-none mb-1">{clubConfig.identity.shortName}</h2>
                <h3 className="text-xs font-medium text-secondary uppercase tracking-widest mb-1">Association Loi 1901</h3>
                <p className="text-xs text-gray-300 italic">"{clubConfig.identity.slogan}"</p>
             </div>
          </div>

          {/* 2. CONTACT (Centre) : Infos lisibles directement */}
          {/* 2. CENTRE : Contacts (Design "Clean" avec séparateurs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:px-8 md:border-x md:border-white/10 w-full md:w-auto">
             
             {/* Adresse */}
             <div className="flex items-center gap-3 group">
                <div className="bg-white/5 p-2 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                   <MapPin size={16} />
                </div>
                <div className="flex flex-col text-left">
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Siège</span>
                   <span className="text-sm font-medium">{clubConfig.contact.address.split(',')[0]}</span>
                </div>
             </div>

             {/* Téléphone */}
             <div className="flex items-center gap-3 group">
                <div className="bg-white/5 p-2 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                   <Phone size={16} />
                </div>
                <div className="flex flex-col text-left">
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Téléphone</span>
                   <span className="text-sm font-mono font-medium">{clubConfig.contact.phone}</span>
                </div>
             </div>

             {/* Email */}
             <div className="flex items-center gap-3 group">
                 <div className="bg-white/5 p-2 rounded-full text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                   <Mail size={16} />
                </div>
                <div className="flex flex-col text-left">
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</span>
                   <a href={`mailto:${clubConfig.contact.email}`} className="text-sm font-medium hover:text-secondary transition-colors">
                     Nous écrire
                   </a>
                </div>
             </div>
          </div>

          {/* 3. ACTIONS (Droite) : Boutons visibles */}
          <div className="flex gap-3 w-full md:w-auto justify-center">
             <a 
               href={clubConfig.contact.facebookUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-24 h-20 rounded-lg transition-all shadow-lg hover:-translate-y-1"
             >
               <Facebook size={24} className="mb-1" />
               <span className="text-[10px] font-bold uppercase">Facebook</span>
             </a>

             <a 
               href={clubConfig.contact.shopUrl || "#"} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex flex-col items-center justify-center bg-secondary hover:bg-green-600 text-white w-24 h-20 rounded-lg transition-all shadow-lg hover:-translate-y-1"
             >
               <ShoppingBag size={24} className="mb-1" />
               <span className="text-[10px] font-bold uppercase">Boutique</span>
             </a>
          </div>

        </div>

        {/* PARTIE BASSE : Copyright & Logos discrets */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            
            <div className="flex items-center gap-4">
               <p>© {new Date().getFullYear()} {clubConfig.identity.name}</p>
               <span className="hidden md:inline">•</span>
               <Link to="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
               <span className="hidden md:inline">•</span>
               <Link to="/admin/login" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Dirigeants</Link>
            </div>

            {/* Logos Affiliations (Tout petits) */}
            <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
               <span className="uppercase text-[10px] font-bold tracking-wider">Affilié FFF</span>
               <img src={clubConfig.partners.districtImgUrl} alt="District" className="h-6 bg-white rounded p-0.5" />
               <img src={clubConfig.partners.ligueImgUrl} alt="Ligue" className="h-6 bg-white rounded p-0.5" />
            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;