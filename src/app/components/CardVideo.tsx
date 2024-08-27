/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link'; // Importation du composant Link

interface CardVideoProps {
  id: number; // Ajout de l'ID pour la navigation
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  summary: string;
  videoUrl: string;
  publicationDate: string; // Date au format ISO 8601
}

const cardStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer tous les éléments horizontalement */
  justify-content: space-between; /* Répartir les éléments verticalement */
  width: 100%;
  max-width: 320px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  margin: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  }
`;

const imageContainerStyles = css`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #e0e0e0;
  overflow: hidden;
`;

const imageStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligner les éléments à gauche */
  width: 100%; /* Assurer que le contenu prend toute la largeur */
  padding: 16px;
  box-sizing: border-box;
`;

const headerStyles = css`
  width: 100%; /* Assurer que le header prend toute la largeur */
  margin-bottom: 16px;
`;

const titleStyles = css`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 8px 0 0;
  color: #333;
  text-align: left;
`;

const dateTextStyles = css`
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
`;

const lineStyles = css`
  width: 60px;
  height: 3px;
  background-color: #e50914;
  margin: 8px 0;
`;

const summaryContainerStyles = css`
  flex: 1;
  width: 100%; /* Assurer que le résumé prend toute la largeur */
  margin-bottom: 24px; /* Plus d'espace entre le résumé et le bouton */
`;

const summaryTextStyles = css`
  color: #555;
  font-size: 0.9rem;
  text-align: justify;
`;

const buttonContainerStyles = css`
  display: flex;
  width: 100%; /* Assurer que le conteneur du bouton prend toute la largeur */
  justify-content: flex-end;
  margin-top: auto;
`;

const buttonStyles = css`
  border-radius: 8px;
  font-weight: 600;
  padding: 10px 16px;
  background-color: #0070f3;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 112, 243, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const CardVideo: React.FC<CardVideoProps> = ({ id, title, image, summary, videoUrl, publicationDate }) => {
  const truncatedSummary = summary.length > 300 ? `${summary.substring(0, 300)}...` : summary;
  const formattedDate = new Date(publicationDate).toLocaleDateString();

  return (
    <div css={cardStyles}>
      <div css={imageContainerStyles}>
        <Image
          src={image.url}
          alt={image.alt}
          layout="fill"
          css={imageStyles}
          placeholder="blur"
          blurDataURL="/default-image.png"
        />
      </div>
      <div css={contentStyles}>
        <div css={headerStyles}>
          <div css={dateTextStyles}>{formattedDate}</div>
          <div css={lineStyles}></div>
          <div css={titleStyles}>{title}</div>
        </div>
        <div css={summaryContainerStyles}>
          <div css={summaryTextStyles}>{truncatedSummary}</div>
        </div>
        <div css={buttonContainerStyles}>
          <Link css={buttonStyles} href={`/article-temoignage/${id}`} passHref>
            Lire plus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardVideo;
