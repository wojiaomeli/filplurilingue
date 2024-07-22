import React from 'react';
import Macaron from './Macaron'; // Assurez-vous d'avoir ce composant ou de le créer si nécessaire
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ContainerVideo = () => {
  return (
    <div style={containerStyles}>
      <div style={carouselContainerStyles}>
        {/* Carousel pour les photos des enseignants */}
        <Carousel showArrows={false} showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true} showStatus={false}>
          <div>
            <img src="/assets/teacher1.svg" alt="Enseignant 1" />
          </div>
          <div>
            <img src="/assets/teacher2.svg" alt="Enseignant 2" />
          </div>
          {/* Ajoutez d'autres éléments de la galerie ici */}
        </Carousel>
      </div>
      <div style={macaronContainerStyles}>
        <Macaron size={40} /> {/* Macaron placé au milieu */}
      </div>
      <div style={textContainerStyles}>
        <p>
          Découvrez nos vidéos et les témoignages d&apos;enseignants dans les sections bilingues francophones. Ces ressources offrent un aperçu précieux des méthodes pédagogiques et des expériences éducatives innovantes, vous permettant ainsi d&apos;explorer diverses approches éducatives, de découvrir les défis et les succès rencontrés par les enseignants, et de vous inspirer pour enrichir votre pratique pédagogique au quotidien.
        </p>
      </div>
    </div>
  );
};

// Styles pour le conteneur principal
const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between', // Espacer horizontalement les éléments
  alignItems: 'center', // Centrer verticalement
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '100%', // Modification de la largeur à 100%
  margin: '20px 0', // Espacement vertical
  boxSizing: 'border-box',
};

// Styles pour le conteneur du carousel
const carouselContainerStyles = {
  flex: '1', // Le carousel prendra autant d'espace que possible
  marginRight: '20px', // Espacement à droite pour séparer du macaron
};

// Styles pour le conteneur du texte
const textContainerStyles = {
  flex: '1', // Le texte prendra autant d'espace que possible
  marginLeft: '20px', // Espacement à gauche pour séparer du macaron
};

// Styles pour le conteneur du macaron
const macaronContainerStyles = {
  flex: '0 0 auto', // Le macaron prendra un espace fixe
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default ContainerVideo;