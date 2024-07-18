// src/app/components/PostsPays.tsx

import React from 'react';
import { Grid, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import CardPostPays from './CardPostPays';
import axios from 'axios';

const PostsPays = ({ posts }) => {
  return (
    <div className="posts">
      <Grid container spacing={3}>
        {posts.length === 0 ? (
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles?categorie.nom=Classe&_sort=publishedAt:DESC`);
    return {
      props: {
        posts: response.data.data,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default PostsPays;