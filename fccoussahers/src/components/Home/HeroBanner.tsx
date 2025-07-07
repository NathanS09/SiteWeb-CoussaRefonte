import React from 'react';
const HeroBanner: React.FC = () => {
  return <div className="relative h-[500px] md:h-[600px] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      opacity: 0.7
    }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-70"></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
        <div className="bg-white/90 rounded-full p-6 mb-6">
          <img src="/logo.webp" alt="FC Coussa Hers" className="h-24 w-24 object-contain" />
        </div>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          FC Coussa Hers
        </h1>
        <p className="text-white text-xl md:text-2xl italic">
          Plus qu'un club, une famille
        </p>
        <div className="mt-10">
          <a href="#matches" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-md shadow-lg transition-all transform hover:scale-105">
            Voir les matchs
          </a>
        </div>
      </div>
    </div>;
};
export default HeroBanner;