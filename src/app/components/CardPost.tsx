/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';
import { PostAttributes } from '../../../lib/FetchPost'; // Assurez-vous que le chemin est correct

const CardPost: React.FC<{ post: PostAttributes }> = ({ post }) => {
  // Vérifier que post.contenent est défini et obtenir le premier paragraphe
  const firstParagraph = post.contenent ? post.contenent.find((item) => item.type === 'paragraph') : null;
  const truncatedContent = firstParagraph
    ? `${firstParagraph.children[0].text.substring(0, 300)}...`
    : 'Résumé non disponible';
  
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

  // Récupération des données de l'image
  const image = post.image?.data?.[0]?.attributes;
  const imageUrl = image ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}` : null;
  const imageAlt = image ? image.alternativeText || 'Image non disponible' : 'Image non disponible';

  // Styles CSS
  const cardStyles = css`
    display: flex;
    flex-direction: column;
    height: 600px; /* Hauteur fixe pour uniformiser les cartes */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 16px auto;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
  `;

  const imageContainerStyles = css`
    position: relative;
    width: 100%;
    height: 300px; /* Hauteur fixe pour les images */
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
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px;
    background-color: #ffffff;
    box-sizing: border-box;
  `;

  const titleStyles = css`
    font-size: 1.2rem; /* Ajuste la taille du titre pour plus d'uniformité */
    font-weight: 600;
    margin-bottom: 16px;
    line-height: 1.2; /* Augmente l'interligne pour une meilleure lisibilité */
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limite à deux lignes pour plus de cohérence */
    -webkit-box-orient: vertical;
  `;

  const summaryContainerStyles = css`
    flex: 1; /* Utilise l'espace restant pour le résumé */
    padding: 16px 0;
    border-top: 1px solid #eee;
    margin-bottom: 16px; /* Ajoute de l'espace sous le résumé */
    display: flex;
    align-items: flex-start; /* Aligne le résumé en haut */
  `;

  const buttonContainerStyles = css`
    display: flex;
    justify-content: flex-end;
    margin-top: auto; /* Positionne le bouton en bas */
  `;

  const buttonStyles = css`
    border-radius: 4px;
    font-weight: 500;
  `;

  const dateWrapperStyles = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 16px;
  `;

  const dateTextStyles = css`
    color: #333;
    font-size: 12px;
    margin-bottom: 0;
    padding-bottom: 4px;
  `;

  const lineStyles = css`
    width: 60px;
    height: 2px;
    background-color: red;
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
