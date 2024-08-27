/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

// Styles du bouton de retour
const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #e03e3e; /* Couleur du bouton, vous pouvez ajuster */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 1rem; /* Marge en bas pour le séparer du contenu */
  &:hover {
    background-color: #c62828; /* Couleur au survol */
  }
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

// Composant BackButton
const BackButton = () => {
  return (
    <Link href="/">
      <a css={buttonStyles}>Retour</a>
    </Link>
  );
};

export default BackButton;
