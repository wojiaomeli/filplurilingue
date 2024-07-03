import React, { useEffect, useState } from "react";
import CardPost from "./CardPost";
import { Grid, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/posts?sort=createdAt:desc&pagination[limit]=3", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setPosts(res.data); // assurez-vous que res.data contient les données des posts
          setIsLoading(false);
        }, 1000); // délai ajouté pour voir le Skeleton
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="posts">
      <Grid container spacing={2}>
        {isLoading ? (
          <Box>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton width="60%" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        ) : (
          posts.map((post) => (
            <CardPost key={post.id} post={post.attributes} /> // assume CardPost expects the post data in 'attributes'
          ))
        )}
      </Grid>
    </div>
  );
}

