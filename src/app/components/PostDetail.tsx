// PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null); // État pour stocker les détails de l'article
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si le chargement est en cours

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        const res = await fetch(`${API_URL}/posts?slug=${slug}&populate=*`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Fetch a échoué avec le statut ${res.status}`);
        }

        const data = await res.json();

        if (data && data.data && data.data.length > 0) {
          setPost(data.data[0]);
        } else {
          throw new Error("Aucun article trouvé avec ce slug");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setIsLoading(false);
      }
    };

    fetchPost();
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
        {post && post.attributes.title}
      </Typography>
      {post &&
        post.attributes.content.map((content: any, index: number) => (
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
