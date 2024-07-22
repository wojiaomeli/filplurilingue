import React from 'react';
import CardPost from './CardPost';
import { Grid, Box, Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { css } from '@emotion/react';

const containerStyles = css`
  padding: 2rem;
  margin-top: 2rem;
  border: 2px solid #f5a623; /* Bordure ambre */
  border-radius: 12px; /* Coins arrondis */
  background-color: #ffffff; /* Fond blanc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre légère */
`;

const Posts = ({ posts }) => {
  const isLoading = !posts.length;

  return (
    <Container css={containerStyles}>
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
    </Container>
  );
};

export default Posts;
