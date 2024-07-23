import React from 'react';

// Styles pour le composant Banner
const styles = {
  container: {
    position: 'relative', // Position relative pour le positionnement absolu de l'overlay
    width: '100%',
    height: '300px', // Hauteur fixe de la bannière
    overflow: 'hidden', // Masquer les débordements
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(3, 112, 225, 0.5)', // Couleur bleue semi-transparente
    transition: 'opacity 0.5s ease', // Effet de transition
    opacity: 0, // Masquer l'overlay par défaut
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlayVisible: {
    opacity: 1, // Afficher l'overlay lorsqu'il est visible
  },
  textEffect: {
    animation: 'fadeIn 2s ease-out', // Animation de texte
  },
};

// Keyframes pour l'animation de texte
const textKeyframes = `
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Composant de la bannière
const Banner: React.FC = () => {
  return (
    <div style={styles.container}>
      <img
        src="/assets/image8.png"
        alt="Image de la bannière"
        style={styles.image}
      />
      <div style={{ ...styles.overlay, ...styles.overlayVisible }}>
        <div style={styles.textEffect}>
          Des ressources pour l’enseignement des disciplines dans les sections bilingues francophones
        </div>
      </div>
      <style>
        {textKeyframes}
      </style>
    </div>
  );
};

export default Banner;
