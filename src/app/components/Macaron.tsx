import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Utilisation correcte pour Next.js
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const MacaronContainer = styled.div`
  position: fixed;
  bottom: 20px; /* Position en bas de la page */
  right: 20px; /* Position à droite de la page */
  width: 80px; /* Largeur fixe du macaron */
  height: 80px; /* Hauteur fixe du macaron */
  background-color: #e60549; /* Couleur du fond */
  color: #ffffff; /* Couleur du texte */
  border-radius: 50%; /* Rendre le macaron rond */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem; /* Taille du texte / icône */
  cursor: pointer; /* Curseur en forme de main */
  z-index: 1000; /* Assurer que le macaron est au-dessus des autres éléments */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Ombre pour profondeur */
  transition: background-color 0.3s ease, opacity 0.3s ease; /* Transition pour changement de couleur et opacité */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)}; /* Modifier la visibilité */
  
  &:hover {
    background-color: #c40034; /* Couleur de fond plus sombre au survol */
  }
`;

const Macaron = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Détecter le défilement
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Ajouter un écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    router.push('/Temoignages-videos'); // Navigation vers la page des témoignages vidéos
  };

  return (
    <MacaronContainer isVisible={isVisible} onClick={handleClick}>
      <FontAwesomeIcon icon={faPlay} />
    </MacaronContainer>
  );
};

export default Macaron;
