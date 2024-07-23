import React from 'react';
import Image from 'next/image';

const ContainerJumelage = () => {
  return (
    <div style={containerStyles}>
      <div style={leftContainerStyles}>
        <Image 
          src="/assets/echange.png" 
          alt="glob" 
          layout="responsive" 
          width={500} 
          height={500} 
          style={globeStyles} 
        />
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
  padding: '20px', // Réduction du padding pour une taille plus petite
  borderRadius: '8px',
  color: '#ffffff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '100%', // Le conteneur prendra toute la largeur disponible
  marginBottom: '40px', // Ajout d'une marge en bas pour augmenter l'espace après le conteneur
};

// Styles pour le conteneur de l'image du globe à gauche
const leftContainerStyles = {
  flex: '1',
  maxWidth: '150px', // Limitation de la taille de l'image
};

// Styles pour l'image du globe
const globeStyles = {
  width: '100%',
  height: 'auto',
};

// Styles pour le conteneur du texte à droite
const rightContainerStyles = {
  flex: '2',
  marginLeft: '20px', // Réduction de l'espace entre l'image et le texte
};

// Styles pour le conteneur du texte
const textContainerStyles = {
  textAlign: 'left',
};

// Styles pour le titre
const titleStyles = {
  fontSize: '20px', // Réduction de la taille du titre
  fontWeight: 'bold',
  marginBottom: '10px', // Réduction de la marge en bas du titre
};

// Styles pour la description
const descriptionStyles = {
  fontSize: '14px', // Réduction de la taille de la police
  lineHeight: '1.5',
  marginBottom: '10px', // Réduction de la marge en bas de la description
};

// Styles pour le bouton
const buttonStyles = {
  display: 'inline-block',
  padding: '10px 20px', // Réduction du padding pour une taille plus petite
  backgroundColor: '#ffffff',
  color: 'rgba(3, 112, 225, 1)',
  textDecoration: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
};

export default ContainerJumelage;