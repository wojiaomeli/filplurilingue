import React from 'react';

const ContainerJumelage = () => {
  return (
    <div style={containerStyles}>
      <div style={leftContainerStyles}>
        <img src="/assets/echange.png" alt="glob" style={globeStyles} />
      </div>
      <div style={rightContainerStyles}>
        <div style={textContainerStyles}>
          <h2 style={titleStyles}>Jumelage Scolaire</h2>
          <p style={descriptionStyles}>
            Le jumelage scolaire favorise la diversité culturelle et linguistique, en particulier pour l'apprentissage de la langue française. Les projets innovants permettent aux élèves d'explorer le français à travers des échanges virtuels, des collaborations créatives et des activités ludiques.
          </p>
          <a href="#" style={buttonStyles}>En savoir plus</a>
        </div>
      </div>
    </div>
  );
};

// Styles pour le conteneur principal
const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(3, 112, 225, 1)',
  padding: '40px',
  borderRadius: '8px',
  color: '#ffffff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '100%', // Le conteneur prendra toute la largeur disponible
};

// Styles pour le conteneur de l'image du globe à gauche
const leftContainerStyles = {
  flex: '1',
};

// Styles pour l'image du globe
const globeStyles = {
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
};

// Styles pour le conteneur du texte à droite
const rightContainerStyles = {
  flex: '2',
  marginLeft: '40px', // Espace entre l'image et le texte
};

// Styles pour le conteneur du texte
const textContainerStyles = {
  textAlign: 'left',
};

// Styles pour le titre
const titleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

// Styles pour la description
const descriptionStyles = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '20px',
};

// Styles pour le bouton
const buttonStyles = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#ffffff',
  color: 'rgba(3, 112, 225, 1)',
  textDecoration: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
};

export default ContainerJumelage;
