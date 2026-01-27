import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const siteTitle = "FC Coussa Hers";
  return (
    <Helmet>
      <title>{title} | {siteTitle}</title>
      <meta name="description" content={description || "Site officiel du FC Coussa Hers, club de football en Ariège."} />
    </Helmet>
  );
};
export default SEO;