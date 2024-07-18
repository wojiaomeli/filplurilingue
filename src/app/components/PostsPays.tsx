import React, { useState, useEffect } from 'react';
import CardPostPays from './CardPostPays';
import { Grid, Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

const PostsPays = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles?categorie.nom=Classe&_sort=publishedAt:DESC`);
        if (response.data && response.data.data) {
          setPosts(response.data.data);
        } else {
          setError('Invalid response structure');
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Error fetching posts');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

export default PostsPays;