import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BannerPageProps {
  title: string;
  color: string;
}

const BannerPage: React.FC<BannerPageProps> = ({ title, color }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Retourne à la page précédente
  };

  return (
    <div className="banner" style={{ backgroundColor: color, margin: 0, padding: 0 }}>
      <div className="max-w-screen-xl mx-auto px-4 py-8 flex items-center relative">
        <button 
          onClick={handleGoBack} 
          className="text-gray-800 bg-white border border-gray-400 rounded-md shadow-md hover:shadow-lg active:shadow-sm transition-shadow duration-150 ease-in-out"
          aria-label="Retour"
          style={{
            position: 'absolute',
            top: '50%',
            left: '1rem',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-50%)', // Centrer verticalement le bouton
            fontSize: '1.5rem'
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} color="#333" />
        </button>
        <h1 className="text-white text-4xl font-bold mx-auto text-center" style={{ flex: 1 }}>
          {title}
        </h1>
      </div>
      <div className="banner-content mt-4">
        {/* Contenu de la bannière ici */}
      </div>
    </div>
  );
};

export default BannerPage;
