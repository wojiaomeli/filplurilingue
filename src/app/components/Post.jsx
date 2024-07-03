// PostDetail.js
import React from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  let { slug } = useParams(); // Récupérer le paramètre slug de l'URL

  // Ici, vous feriez une requête API pour récupérer les détails de l'article avec le slug
  // Pour cet exemple, nous supposerons que vous avez déjà les données de l'article
  const article = {
    title: "Titre de l'article",
    content: "Contenu complet de l'article ici...",
    // D'autres données d'article
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {article.content}
      </Typography>
    </div>
  );
}
