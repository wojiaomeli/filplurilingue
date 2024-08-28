/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

// Styles pour le bouton
const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px; /* Largeur du bouton */
  height: 60px; /* Hauteur du bouton */
  background-color: #ffffff; /* Fond blanc */
  border: 3px solid #d3d3d3; /* Contour gris clair */
  border-radius: 8px; /* Coins légèrement arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre pour le relief */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333; /* Couleur de l'icône */
  margin-left: 20px; /* Décalage vers la droite */

  &:hover {
    background-color: #f7f7f7; /* Fond légèrement gris lors du survol */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Ombre plus marquée lors du survol */
  }

  &:active {
    transform: translateY(4px); /* Effet de pression plus prononcé */
  }
`;

// Styles pour l'icône SVG
const iconStyles = css`
  width: 28px; /* Largeur de l'icône */
  height: 28px; /* Hauteur de l'icône */
  stroke-width: 2.5; /* Épaisseur des traits de l'icône */
`;

// Composant BackButton
const BackButton: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button css={buttonStyles} onClick={handleBack}>
      <svg css={iconStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

export default BackButton;
