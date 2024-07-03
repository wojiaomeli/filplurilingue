import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13+
import styled from 'styled-components';

const MacaronContainer = styled.div`
  position: fixed;
  bottom: 20px; // Position en bas de la page
  right: 20px; // Position à droite de la page
  width: 80px; // Largeur réduite du macaron
  height: 80px; // Hauteur réduite du macaron
  perspective: 1000px;
  margin: 20px;
`;

const MacaronWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(229, 7, 73, 1);
  color: #ffffff;
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const FrontFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(229, 7, 73, 1);
`;

const BackFace = styled(FrontFace)`
  transform: rotateY(180deg);
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem; // Taille de l'icône réduite
`;

const Text = styled.div`
  font-size: 0.5rem; // Taille de la police réduite
  font-weight: bold;
`;

const Macaron = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    router.push('http://localhost:3000/videoTemoignages');
  };

  return (
    <MacaronContainer>
      <MacaronWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ transform: hovered ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
      >
        <FrontFace>
          {hovered ? (
            <Text>Témoignages en vidéo</Text>
          ) : (
            <Icon icon={faPlay} />
          )}
        </FrontFace>
        <BackFace>
          <Icon icon={faPlay} />
        </BackFace>
      </MacaronWrapper>
    </MacaronContainer>
  );
};

export default Macaron;
