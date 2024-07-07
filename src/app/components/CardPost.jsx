import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Link from 'next/link';

const CardPost = ({ post }) => {
  // Récupère le résumé du contenu (premier paragraphe ou autre logique de résumé)
  const firstParagraph = post.resume.find((item) => item.type === "paragraph");

  // Gère le résumé du contenu (les 300 premiers caractères)
  const truncatedContent = firstParagraph ? `${firstParagraph.children[0].text.substring(0, 300)}...` : '';

  // Formatte la date de publication si elle est disponible
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Conteneur pour l'image avec une taille fixe */}
      <div style={{ width: "100%", paddingTop: "75%", position: "relative" }}>
        {post.image && (
          <img 
            src={`http://localhost:1337${post.image.data[0].attributes.url}`} 
            alt={post.image.data[0].attributes.name} 
            style={{ 
              position: "absolute", 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              top: 0, 
              left: 0 
            }} 
          />
        )}
      </div>
      <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Vérifiez si post.title est défini avant de l'afficher */}
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title ? post.title : 'Titre non disponible'}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {truncatedContent} {/* Affichez le résumé ici */}
        </Typography>
        {/* Bouton "Lire plus" pour voir l'article complet */}
        <div style={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
          <Link href={`/article/${post.slug}`} passHref>
            <Button size="small" color="primary">
              Lire plus
            </Button>
          </Link>
        </div>
        {/* Affichage de la date de publication si disponible */}
        {formattedDate && (
          <Typography color="text.secondary" variant="body2" style={{ marginTop: 8, fontSize: 12 }}>
            Publié le {formattedDate}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CardPost;
