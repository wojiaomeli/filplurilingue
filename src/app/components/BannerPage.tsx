import React from 'react';

interface BannerPageProps {
  title: string;
  color: string;
  children?: React.ReactNode;
}

const BannerPage: React.FC<BannerPageProps> = ({ title, color, children }) => {
  // Préparation du style pour le composant
  const bannerStyle = {
    backgroundColor: color, // Assurez-vous que la couleur est bien définie
  };

  return (
    <div className="banner" style={bannerStyle}>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-white text-4xl font-bold">{title}</h1>
        <div className="banner-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BannerPage;