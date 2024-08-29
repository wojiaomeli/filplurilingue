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
      setScrollDirection(currentScrollY > previousScrollY.current ? 'down' : 'up');
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
          <div style={dynamicImageContainerStyles(scrollDirection, isVisible)}>
            <Image
              src="/assets/echange.png" // Image du globe
              alt="globe-icon"
              layout="intrinsic"
              width={200} // Base width
              height={200} // Base height
              style={dynamicImageStyles(scrollDirection, isVisible)}
            />
          </div>
          <Link href="/formulaire-jumelage" style={linkStyles}>
            <div style={pillButtonContainerStyles}>
              <div style={pillButtonStyles}>Demande de Jumelage</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Fonction pour les styles dynamiques du conteneur de l'image
const dynamicImageContainerStyles = (scrollDirection: 'up' | 'down', isVisible: boolean) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Occupe toute la hauteur disponible
  transition: 'transform 0.5s ease-out', // Transition pour le redimensionnement de l'image
  transform: scrollDirection === 'down' && isVisible ? 'scale(1.2)' : 'scale(1)', // Agrandissement de l'image quand le conteneur bleu se déplace vers le bas
  zIndex: 1, // Assure que l'image est derrière le bouton
});

// Fonction pour les styles dynamiques de l'image
const dynamicImageStyles = (scrollDirection: 'up' | 'down', isVisible: boolean) => ({
  maxWidth: '80%',
  height: 'auto',
  objectFit: 'contain',
  transition: 'transform 0.5s ease-out',
  transform: scrollDirection === 'down' && isVisible ? 'scale(1.2)' : 'scale(1)',
});

// Styles pour le conteneur extérieur avec arrière-plan blanc
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
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  maxWidth: '800px',
  width: '100%',
};

// Conteneur bleu (avant le défilement)
const blueContainerStyles = {
  backgroundColor: '#036FE1',
  borderRadius: '12px', // Bordure arrondie plus marquée
  color: '#ffffff',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)', // Ombre portée plus douce
  overflow: 'hidden',
  position: 'relative',
  width: '80%', // Largeur augmentée pour un design plus spacieux
  padding: '30px',
  marginTop: '-30px',
  zIndex: 0,
  transition: 'transform 0.5s ease-out, height 0.5s ease-out',
  background: 'linear-gradient(135deg, #036FE1 0%, #2A3D6F 100%)', // Dégradé pour un effet moderne
};

// Conteneur bleu ouvert (déroulé)
const expandedBlueContainerStyles = {
  height: '300px',
};

// Conteneur bleu fermé (réduit)
const collapsedBlueContainerStyles = {
  height: '150px',
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
  fontSize: '30px', // Augmenté pour plus d'impact
  fontWeight: '700',
  marginBottom: '20px',
  textTransform: 'uppercase',
  color: '#036FE1', // Couleur du texte du titre
};

// Styles pour la description
const descriptionStyles = {
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '30px',
};

// Styles pour le bouton "En savoir plus"
const buttonStyles = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#ffffff',
  color: '#036FE1',
  textDecoration: 'none',
  borderRadius: '30px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
  marginTop: '20px',
  textAlign: 'center',
  border: '2px solid #036FE1', // Bordure du bouton
};

buttonStyles[':hover'] = {
  backgroundColor: '#036FE1',
  color: '#ffffff',
  transform: 'scale(1.05)',
};

// Styles pour le lien (optionnel)
const linkStyles = {
  textDecoration: 'none',
};

// Styles pour le conteneur du bouton du formulaire de demande de jumelage
const pillButtonContainerStyles = {
  position: 'absolute',
  bottom: '10px', // Positionné plus bas
  right: '10px', // Positionné plus à droite
  zIndex: 2,
};

// Styles pour le bouton du formulaire de demande de jumelage
const pillButtonStyles = {
  display: 'inline-block',
  padding: '8px 16px', // Réduit la taille du bouton
  backgroundColor: 'rgba(229, 7, 73, 1)',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '30px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
  textAlign: 'center',
  fontSize: '14px', // Réduit la taille du texte
};

pillButtonStyles[':hover'] = {
  backgroundColor: '#ffffff',
  color: 'rgba(229, 7, 73, 1)',
  transform: 'scale(1.05)',
};

export default ContainerJumelage;
