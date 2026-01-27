import React from 'react';
import { clubConfig } from '../config/clubConfig';

const Legal: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-8">Mentions Légales</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">1. Éditeur du site</h2>
          <p className="text-gray-600">
            Le site <strong>fccoussahers.fr</strong> est édité par l'association <strong>{clubConfig.identity.name}</strong>.<br />
            <strong>Statut :</strong> Association Loi 1901<br />
            <strong>Adresse :</strong> {clubConfig.contact.address}<br />
            <strong>Email :</strong> {clubConfig.contact.email}<br />
            <strong>Téléphone :</strong> {clubConfig.contact.phone}<br />
          </p>
        </section>

        <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">2. Hébergement</h2>
        <p className="text-gray-600">
            Le site est hébergé par :<br />
            <strong>OVH SAS</strong><br />
            2 rue Kellermann<br />
            59100 Roubaix - France<br />
            <a href="https://www.ovhcloud.com" target="_blank" rel="nofollow" className="text-primary hover:underline">www.ovhcloud.com</a>
        </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">3. Propriété intellectuelle</h2>
          <p className="text-gray-600">
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">4. Données personnelles</h2>
          <p className="text-gray-600">
            Les informations recueillies via les formulaires de contact ou lors de la navigation (statistiques) sont destinées à l'usage exclusif du FC Coussa Hers. Conformément à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de modification et de suppression des données vous concernant.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;