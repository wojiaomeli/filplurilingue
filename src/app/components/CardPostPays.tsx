import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const CardPostPays = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}?populate=image`);
      const data = await res.json();
      setPost(data);
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const firstParagraph = post.resume.find((item) => item.type === 'paragraph');
  const truncatedContent = firstParagraph ? `${firstParagraph.children[0].text.substring(0, 300)}...` : '';
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

  const imageUrl = post.image && post.image.data.length > 0
    ? `${process.env.NEXT_PUBLIC_API_URL}${post.image.data[0].attributes.url}`
    : null;

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%' }}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.image.data[0].attributes.alternativeText || 'Image'}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title || 'Titre non disponible'}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {truncatedContent}
        </Typography>
        <div style={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
          <Link href={`/article/${post.slug}`} passHref>
            <Button size="small" color="primary">
              Lire plus
            </Button>
          </Link>
        </div>
        {formattedDate && (
          <Typography color="text.secondary" variant="body2" style={{ marginTop: 8, fontSize: 12 }}>
            Publié le {formattedDate}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CardPostPays;