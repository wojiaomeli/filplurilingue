/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface BannerPageProps {
  title: string;
  color: string;
}

const bannerStyles = (color: string) => css`
  width: 100%;
  background-color: ${color};
  padding: 2rem 0; /* Augmentez la hauteur de la bande */
  color: white;
  text-align: center;
  font-size: 2.5rem; /* Augmentez la taille du titre */
  font-weight: bold; /* Rendre le titre plus épais pour plus d'impact */
`;

const BannerPage: React.FC<BannerPageProps> = ({ title, color }) => {
  return (
    <div css={bannerStyles(color)}>
      {title}
    </div>
  );
};

export default BannerPage;
