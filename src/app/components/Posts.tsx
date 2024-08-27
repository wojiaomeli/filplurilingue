import React from 'react';
import CardPost from './CardPost';
import { Grid, Box, Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { css } from '@emotion/react';

const containerStyles = css`
  padding: 2rem;
  margin-top: 2rem;
  border: 2px solid #f5a623;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const postBoxStyles = css`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

interface Post {
  id: number;
  attributes: {
    title: string;
    resume: any[];
    publishedAt: string;
    slug: string;
    image?: {
      data?: {
        attributes?: {
          url?: string;
          alternativeText?: string;
        };
      };
    };
    categorie: {
      data: {
        attributes: {
          nom: string;
        };
      };
    };
  };
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (posts && posts.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <Container css={containerStyles}>
      <Grid container spacing={3}>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box css={postBoxStyles}>
                <Skeleton variant="rectangular" width="100%" height={200} />
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
              <Box css={postBoxStyles}>
                <CardPost post={post.attributes} />
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Posts;
