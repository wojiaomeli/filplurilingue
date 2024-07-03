import React from 'react';
import styled, { keyframes } from 'styled-components';
import TextEffect from './TextEffect'; // Assurez-vous de corriger le chemin si nécessaire

const BannerContainer = styled.div`
  width: 100%;
  padding: 0; /* Retirer le padding */
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
`;

const moveUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  perspective: 1000px;
  width: 100%; /* Prendre toute la largeur */
  height: 40vh; /* Prendre toute la hauteur de la vue */
  margin: 0; /* Pas de marge */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Remplir le conteneur tout en conservant les proportions */
  transition: transform 0.3s ease, opacity 0.3s ease;
  backface-visibility: hidden;
  opacity: 0.7; /* Réduire l'opacité */

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  mix-blend-mode: overlay;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5em;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  z-index: 1;
  text-align: center;
  white-space: pre-line;
`;

const PhotoMosaic = () => {
  const image = { src: '/assets/image8.png', alt: 'Image' };

  return (
    <BannerContainer>
      <ImageContainer>
        <TextOverlay>
          <TextEffect />
        </TextOverlay>
        <Image src={image.src} alt={image.alt} />
        <GradientOverlay />
      </ImageContainer>
    </BannerContainer>
  );
};

export default PhotoMosaic;