import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContainerJumelage: React.FC = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isVisible, setIsVisible] = useState(false);
  const previousScrollY = useRef<number>(0);
  const blueContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > previousScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      previousScrollY.current = currentScrollY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Déclenche l'observer quand 10% de l'élément est visible
    );

    if (blueContainerRef.current) {
      observer.observe(blueContainerRef.current);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (blueContainerRef.current) {
        observer.unobserve(blueContainerRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={outerContainerStyles}>
      <div style={containerWrapperStyles}>
        <div style={contentContainerStyles}>
          <h2 style={titleStyles}>Jumelage Scolaire</h2>
          <p style={descriptionStyles}>
            Le jumelage scolaire favorise la diversité culturelle et linguistique, en particulier pour l'apprentissage de la langue française. Les projets innovants permettent aux élèves d'explorer le français à travers des échanges virtuels, des collaborations créatives et des activités ludiques.
          </p>
          <Link href="/jumelage-scolaires" style={linkStyles}>
            <div style={buttonStyles}>En savoir plus</div>
          </Link>
        </div>
        <div
          ref={blueContainerRef}
          style={{
            ...blueContainerStyles,
            ...(isVisible ? (scrollDirection === 'down' ? expandedBlueContainerStyles : collapsedBlueContainerStyles) : collapsedBlueContainerStyles)
          }}
        >
          <div style={imageContainerStyles}>
            <Image
              src="/assets/echange.png" // Image du globe
              alt="globe-icon"
              layout="intrinsic"
              width={180} // Ajustez la taille de l'image pour qu'elle soit moyenne
              height={180} // Ajustez la taille de l'image pour qu'elle soit moyenne
              style={globeImageStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Conteneur extérieur avec arrière-plan blanc
const outerContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 20px',
  background: '#FFFFFF', // Arrière-plan blanc
};

// Conteneur pour les éléments décalés
const containerWrapperStyles = {
  display: 'flex',
  flexDirection: 'column', // Dispose les éléments en colonne
  alignItems: 'center',
  position: 'relative',
  maxWidth: '800px',
  width: '100%',
};

// Conteneur bleu (avant le défilement)
const blueContainerStyles = {
  backgroundColor: '#036FE1',
  borderRadius: '8px',
  color: '#ffffff',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
  position: 'relative',
  width: '60%', // Réduit la largeur du conteneur bleu
  padding: '20px', // Ajustez le padding pour un meilleur ajustement
  marginTop: '-20px',
  zIndex: 0,
  transform: 'translateY(0)', // Position de départ
  transition: 'transform 0.5s ease-out, height 0.5s ease-out', // Transition pour l'effet tiroir
};

// Conteneur bleu ouvert (déroulé)
const expandedBlueContainerStyles = {
  transform: 'translateY(0)', // Assurez-vous qu'il est visible
  height: '300px', // Ajustez la hauteur pour simuler l'ouverture
};

// Conteneur bleu fermé (réduit)
const collapsedBlueContainerStyles = {
  transform: 'translateY(20px)', // Déplacement vers le bas pour simuler la fermeture
  height: '150px', // Ajustez la hauteur pour simuler la fermeture
};

// Styles pour le conteneur de l'image
const imageContainerStyles = {
  display: 'flex',
  justifyContent: 'center', // Centre l'image horizontalement
  alignItems: 'center', // Centre l'image verticalement
  height: '100%', // Assure que le conteneur occupe toute la hauteur du conteneur bleu
};

// Styles pour l'image du globe
const globeImageStyles = {
  maxWidth: '90%', // Augmentez la taille de l'image tout en la gardant dans le conteneur
  height: 'auto',
  objectFit: 'contain', // Conserve les proportions de l'image
  imageRendering: 'auto', // Utilisez 'auto' pour une qualité d'image optimale
};

// Styles pour le conteneur du texte
const contentContainerStyles = {
  position: 'relative',
  flex: '1',
  padding: '40px 30px',
  backgroundColor: '#ffffff',
  color: '#000000',
  textAlign: 'left',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  zIndex: 1,
};

// Styles pour le titre avec une typographie audacieuse
const titleStyles = {
  fontSize: '28px',
  fontWeight: '900',
  marginBottom: '20px',
  textTransform: 'uppercase',
  color: '#036FE1', // Titre en bleu
};

// Styles pour la description
const descriptionStyles = {
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '30px',
};

// Styles pour le bouton
const buttonStyles = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#036FE1',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '30px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
  marginTop: '20px',
  textAlign: 'center',
};

buttonStyles[':hover'] = {
  backgroundColor: '#ffffff',
  color: '#036FE1',
  transform: 'scale(1.05)',
};

// Styles pour le lien (optionnel)
const linkStyles = {
  textDecoration: 'none',
};

export default ContainerJumelage;
