import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin: 10px auto;
`;

const Round = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RoundPhotoContainer = () => {
  const radius = 90; // Garder le même rayon pour le cercle
  const centerX = 100;
  const centerY = 200;

  const getRoundPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <Container>
      {[0, 1, 2].map((index) => {
        const { x, y } = getRoundPosition(index, 3);
        return (
          <Round key={index} style={{ left: `${x - 60}px`, top: `${y - 60}px` }}>
            <Image src={`/assets/image${index + 1}.jpg`} alt={`Image ${index + 1}`} />
          </Round>
        );
      })}
    </Container>
  );
};

export default RoundPhotoContainer;
