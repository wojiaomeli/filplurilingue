/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';

const CardPost = ({ post }) => {
  // Extraction et formatage des données
  const firstParagraph = post.resume.find((item) => item.type === 'paragraph');
  const truncatedContent = firstParagraph ? `${firstParagraph.children[0].text.substring(0, 300)}...` : '';
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

  // Récupération des données de l'image
  const image = post.image?.data?.[0]?.attributes;
  const imageUrl = image ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}` : null;
  const imageAlt = image ? image.alternativeText || 'Image non disponible' : 'Image non disponible';

  // Styles CSS
  const cardStyles = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 600px; /* Largeur maximale ajustée */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 16px auto;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      max-width: 100%; /* Largeur maximale pour les écrans plus petits */
      margin: 16px;
    }

    @media (max-width: 480px) {
      margin: 8px;
      box-shadow: none;
      border-radius: 8px;
    }
  `;

  const imageContainerStyles = css`
    position: relative;
    width: 100%;
    padding-top: 60%; /* Augmenter le ratio d'aspect pour une image plus grande */
    background-color: #e0e0e0;
  `;

  const imageStyles = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const placeholderStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    color: #9e9e9e;
    font-size: 1rem;
    text-align: center;
  `;

  const contentStyles = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 18px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
  `;

  const titleStyles = css`
    font-size: 1.4rem; /* Taille du titre ajustée */
    font-weight: 600;
    margin-bottom: 16px;
    line-height: 1.4; /* Augmenter l'interligne pour une meilleure lisibilité */
    color: #333; /* Couleur du titre adoucie */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* Permet le retour à la ligne */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limiter à trois lignes */
    -webkit-box-orient: vertical;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  `;

  const summaryContainerStyles = css`
    padding: 16px 0;
    border-top: 1px solid #eee;
    margin-bottom: 0px; /* Réduit l'espace sous le résumé */
  `;

  const buttonContainerStyles = css`
    display: flex;
    justify-content: flex-end;
    margin-top: 8px; /* Ajuste l'espace au-dessus du bouton */
  `;

  const buttonStyles = css`
    border-radius: 4px;
    font-weight: 500;
  `;

  const dateWrapperStyles = css`
    margin-top: auto; /* Force le positionnement en bas */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  `;

  const dateTextStyles = css`
    color: #333;
    font-size: 12px;
    margin-bottom: 0; /* Réduit l'espace sous le texte */
    position: relative;
    padding-bottom: 4px; /* Espacement pour la ligne rouge */
  `;

  const lineStyles = css`
    width: 60px; /* Réduit la largeur de la ligne rouge */
    height: 2px;
    background-color: red;
    position: absolute;
    bottom: 0; /* Positionné juste en dessous du texte */
    left: 0;
  `;

  return (
    <Card css={cardStyles}>
      <div css={imageContainerStyles}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="fill"
            css={imageStyles}
            placeholder="blur"
            blurDataURL="/default-image.png"
          />
        ) : (
          <div css={placeholderStyles}>
            <Typography>Pas d'image disponible</Typography>
          </div>
        )}
      </div>
      <CardContent css={contentStyles}>
        <Typography variant="h5" component="h2" css={titleStyles}>
          {post.title || 'Titre non disponible'}
        </Typography>
        <div css={summaryContainerStyles}>
          <Typography color="text.secondary">
            {truncatedContent}
          </Typography>
        </div>
        <div css={buttonContainerStyles}>
          <Link href={`/article/${post.slug}`} passHref>
            <Button size="small" color="primary" css={buttonStyles}>
              Lire plus
            </Button>
          </Link>
        </div>
        {formattedDate && (
          <div css={dateWrapperStyles}>
            <Typography css={dateTextStyles}>
              Publié le {formattedDate}
              <div css={lineStyles} />
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardPost;
