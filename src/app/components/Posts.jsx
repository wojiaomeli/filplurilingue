import React, { useEffect, useState } from "react";
import CardPost from "./CardPost";
import { Grid, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://pplefilstrapi:1337/api/posts?populate=*", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // Assurez-vous que res.data contient les données des posts
        const sortedPosts = res.data.sort((a, b) => {
          // Trier par date de publication décroissante
          return new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt);
        });
        
        // Limiter aux trois derniers articles
        const latestPosts = sortedPosts.slice(0, 3);

        setTimeout(() => {
          setPosts(latestPosts);
          setIsLoading(false);
        }, 1000); // Délai ajouté pour voir le Skeleton
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="posts">
      <Grid container spacing={3}>
        {isLoading ? (
          // Affichage du Skeleton pendant le chargement
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Skeleton variant="rectangular" width="100%" height={300} />
              <Skeleton width="60%" />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Box>
          </Grid>
        ) : (
          // Affichage des trois derniers articles
          posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <CardPost post={post.attributes} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
