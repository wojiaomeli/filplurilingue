import React from "react";
import CardPost from "./CardPost";
import { Grid, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const Posts = ({ posts }) => {
  const isLoading = !posts.length;

  return (
    <div className="posts">
      <Grid container spacing={3}>
        {isLoading ? (
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
          posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <CardPost post={post.attributes} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Posts;