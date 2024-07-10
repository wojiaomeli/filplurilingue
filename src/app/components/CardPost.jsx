import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Link from 'next/link';
import Image from 'next/image';

const CardPost = ({ post }) => {
  const firstParagraph = post.resume.find((item) => item.type === "paragraph");
  const truncatedContent = firstParagraph ? `${firstParagraph.children[0].text.substring(0, 300)}...` : '';
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", width: "100%", height: 0, paddingTop: "56.25%" }}>
        {post.image && (
          <Image
            src={`${post.image.data[0].attributes.url}`} // Utilisation directe de l'URL sans le domaine complet
            alt={post.image.data[0].attributes.name}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title ? post.title : 'Titre non disponible'}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {truncatedContent}
        </Typography>
        <div style={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
          <Link href={`/article/${post.slug}`} passHref>
            <Button size="small" color="primary">
              Lire plus
            </Button>
          </Link>
        </div>
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
