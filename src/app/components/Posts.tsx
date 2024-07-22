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
  // Utiliser un état pour la gestion du loading
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simuler le chargement ou vérifier si les données sont déjà présentes
    if (posts.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <Container css={containerStyles}>
      <Grid container spacing={3}>
        {loading ? (
          // Affichage des Skeletons pendant le chargement
          Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box>
                <Skeleton variant="rectangular" width="100%" height={300} />
                <Skeleton width="60%" />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Box>
            </Grid>
          ))
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
