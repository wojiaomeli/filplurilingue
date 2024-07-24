/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { css } from '@emotion/react';
import Link from 'next/link';
import { PostAttributes } from '../../../lib/FetchPost';

interface PostDetailProps {
  post: PostAttributes;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const image = post.image?.data?.[0]?.attributes;
  const imageUrl = image ? `${process.env.NEXT_PUBLIC_API_URL}${image.url}` : null;
  const imageAlt = image ? image.alternativeText || 'Image non disponible' : 'Image non disponible';

  const cardStyles = css`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
  `;

  const imageContainerStyles = css`
    position: relative;
    width: 100%;
    height: 400px;
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
    padding: 16px;
    background-color: #ffffff;
  `;

  const titleStyles = css`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
  `;

  const textStyles = css`
    font-size: 1rem;
    color: #555;
    margin-bottom: 16px;
  `;

  const buttonContainerStyles = css`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  `;

  const buttonStyles = css`
    border-radius: 4px;
    font-weight: 500;
  `;

  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

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
        <Typography variant="h4" component="h1" css={titleStyles}>
          {post.title || 'Titre non disponible'}
        </Typography>
        <Typography variant="body1" css={textStyles}>
          {post.content || 'Contenu non disponible'}
        </Typography>
        {formattedDate && (
          <Typography variant="body2" color="textSecondary">
            Publié le {formattedDate}
          </Typography>
        )}
        <div css={buttonContainerStyles}>
          <Link href="/posts" passHref>
            <Button size="small" color="primary" css={buttonStyles}>
              Retour aux articles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostDetail;