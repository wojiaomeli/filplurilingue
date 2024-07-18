import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CardPostPays = ({ post }) => {
  const { title, resume, image, publishedAt } = post;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image.url} // Assurez-vous que votre modèle de données contient une propriété "url" pour l'image
        alt={image.alternativeText} // Assurez-vous que votre modèle de données contient une propriété "alternativeText" pour l'image
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{resume}</Typography>
        <Typography variant="caption">{new Date(publishedAt).toLocaleDateString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardPostPays;
