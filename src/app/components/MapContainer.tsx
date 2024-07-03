import React from 'react';
import Map from './Map'; // Importez le composant Map

const MapContainer = () => {
  return (
    <div style={containerStyles}>
      <Map />
    </div>
  );
};

// Styles pour le conteneur
const containerStyles = {
    position: 'absolute',
    top: '1100px', // Ajustez la position verticale selon vos besoins
    left: '40px', // Ajustez la position horizontale selon vos besoins
    width: '500px', // Ajustez la largeur selon vos besoins
    height: '400px', // Ajustez la hauteur selon vos besoins
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    margin: '20px' // Ajoutez une marge pour l'espacement entre les éléments adjacents
  };

export default MapContainer;
