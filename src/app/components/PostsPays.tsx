import React from 'react';
import CardPostPays from './CardPostPays';
import { Grid, Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

const PostsPays = ({ posts, error }) => {
  const isLoading = !posts && !error;

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
        ) : error ? (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        ) : (
          posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <CardPostPays post={post.attributes} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/articles?categorie.nom=Classe&_sort=publishedAt:DESC`;
    const response = await axios.get(apiUrl);
    return {
      props: {
        posts: response.data.data,
      },
    };
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    return {
      props: {
        error: `Error fetching posts: ${err.message}`,
      },
    };
  }
};

export default PostsPays;