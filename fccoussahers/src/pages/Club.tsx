import React, { lazy } from 'react';
const Club: React.FC = () => {
  return <div className="w-full bg-gray-50">
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Notre Club</h1>
          <p className="text-lg max-w-3xl">
            Découvrez l'histoire et les valeurs qui font du FC Coussa Hers bien
            plus qu'un simple club de football.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex justify-center mb-8">
              <img src="/logo.webp" alt="Logo FC Coussa Hers" className="h-48 w-48 object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Historique du club
            </h2>
            <div className="prose max-w-none">
              <p>
                Le <b>Football Club Coussa Hers</b> est né en 2018 de la fusion
                de 3 entités : le <b>FC Coussa</b> (créé en 1987), l'
                <b>Entente Football Club de l'Hers</b> (créé en 1999) et l'école
                de foot créée en commun en 2005, l'<b>Entente Hers Coussa</b>.
              </p>
              <p className="mt-4">
                Notre club véhicule un esprit familial et convivial autour des
                valeurs de respect, engagement, tolérance et solidarité.
              </p>
              <p className="mt-4">
                La formation des jeunes est notre fer de lance depuis 2005, le
                foot pour TOUS avec comme objectif l'épanouissement de nos
                jeunes dans une structure à taille humaine.
              </p>
              <p className="mt-4">La notion de plaisir reste primordiale.</p>
              <p className="mt-4">
                Quelques jeunes issus de notre formation restent des exemples :
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Yannis SALMI (Centre de formation du RC LENS de 2015 à 2019)
                </li>
                <li>
                  Logan DELAURIER CHAUBET (Centre de formation des Girondins de
                  Bordeaux, joueur professionnel en Ligue 2 depuis 2022)
                </li>
                <li>
                  Tom DELAURIER CHAUBET (Centre de formation de Montpellier
                  Hérault, U17/U19 Nationaux 2022-2024)
                </li>
                <li>
                  Christian MAWISSA ELEBI (Centre de formation du TFC, premier
                  contrat professionnel en 2023)
                </li>
              </ul>
              <p className="mt-4 font-bold text-green-800">Allez le FCCH !!!</p>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mt-10 mb-4">
              Bureau du club
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-2 md:border-b-0 md:border-r md:pr-4">
                  <h3 className="font-bold text-lg mb-1">Co-Président</h3>
                  <p>Nicolas SANCHEZ</p>
                </div>
                <div className="border-b pb-2 md:border-b-0">
                  <h3 className="font-bold text-lg mb-1">Co-Président</h3>
                  <p>Sébastien PEDOUSSAUT</p>
                </div>
                <div className="border-b pb-2 md:border-b-0 md:border-r md:pr-4">
                  <h3 className="font-bold text-lg mb-1">Secrétaire</h3>
                  <p>William MACIEL</p>
                </div>
                <div className="border-b pb-2 md:border-b-0">
                  <h3 className="font-bold text-lg mb-1">Secrétaire</h3>
                  <p>Mélanie CAYLET</p>
                </div>
                <div className="border-b pb-2 md:border-b-0 md:border-r md:pr-4">
                  <h3 className="font-bold text-lg mb-1">
                    Trésorière
                  </h3>
                  <p>Anick ARTUSO</p>
                </div>
                <div className="border-b pb-2 md:border-b-0">
                  <h3 className="font-bold text-lg mb-1">
                    Trésorière adjointe
                  </h3>
                  <p>Anaïs IRANZO</p>
                </div>
                <div className="border-b pb-2 md:border-b-0 md:border-r md:pr-4">
                  <h3 className="font-bold text-lg mb-1">
                    Responsable de l'école de foot
                  </h3>
                  <p>Loïc PAANEN</p>
                </div>
                <div className="border-b pb-2 md:border-b-0">
                  <h3 className="font-bold text-lg mb-1">
                    Intendant
                  </h3>
                  <p>Gilles REDONDO</p>
                </div>
                <div className="md:border-r md:pr-4">
                  <h3 className="font-bold text-lg mb-1">
                    Intendante
                  </h3>
                  <p>Véronique FERRIEZ</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Nos Stades
              </h2>
              {/* Site de Coussa */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
                <div className="p-4 bg-green-700 text-white">
                  <h3 className="text-xl font-bold">Site de Coussa</h3>
                  <p>Chem. de la Prade, 09120 Coussa</p>
                </div>
                <div className="h-64 w-full">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.3626860452095!2d1.6838347761059198!3d43.51517517110707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aed39a7c37e9ef%3A0x2e43f94df1b0f7c5!2sChem.%20de%20la%20Prade%2C%2009120%20Coussa!5e0!3m2!1sfr!2sfr!4v1699967068932!5m2!1sfr!2sfr" width="100%" height="100%" style={{
                  border: 0
                }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Stade de Coussa"></iframe>
                </div>
              </div>
              {/* Site des Pujols */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
                <div className="p-4 bg-green-700 text-white">
                  <h3 className="text-xl font-bold">Site des Pujols</h3>
                  <p>1 Chemin du Payroulie, 09100 Les Pujols</p>
                </div>
                <div className="h-64 w-full">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.0891746651673!2d1.6714841761054128!3d43.50094797112871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aed33d7e20a7a3%3A0xd7c9e8e0e8e9e8e0!2s1%20Chemin%20du%20Payroulie%2C%2009100%20Les%20Pujols!5e0!3m2!1sfr!2sfr!4v1699967068932!5m2!1sfr!2sfr" width="100%" height="100%" style={{
                  border: 0
                }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Stade des Pujols"></iframe>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 mt-8">
                <h3 className="font-bold text-lg text-green-800 mb-3">
                  Nous rendre visite
                </h3>
                <p>
                  Les matchs de l'équipe première se jouent généralement au
                  stade de Coussa.
                </p>
                <p className="mt-2">
                  Pour toute information sur les lieux des rencontres, consultez
                  notre calendrier des matchs ou contactez-nous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Club;