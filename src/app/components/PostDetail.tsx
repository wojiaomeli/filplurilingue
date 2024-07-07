// PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material"; // Utilisez les composants de Material-UI ou ceux de votre choix
import Skeleton from "@mui/material/Skeleton";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null); // État pour stocker les détails de l'article
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si le chargement est en cours

  useEffect(() => {
    fetch(`http://localhost:1337/api/posts?sort=createdAt:desc&pagination[limit]=3&_populate=*`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res.data[0]); // Récupérez le premier article correspondant au slug (suppose que le slug est unique)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <Container>
        <Skeleton variant="rectangular" width={800} height={400} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        {post.attributes.title}
      </Typography>
      {post.attributes.contenent &&
        post.attributes.contenent.map((content: any, index: number) => (
          <Typography key={index} variant="body1" paragraph>
            {content.children.map((child: any, index: number) => (
              <span key={index}>{child.text}</span>
            ))}
          </Typography>
        ))}
    </Container>
  );
};

export default PostDetail;
