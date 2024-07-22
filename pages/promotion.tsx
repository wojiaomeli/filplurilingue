import React, { useEffect, useState } from 'react';
import BannerPage from '../src/app/components/BannerPage';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import { GetServerSideProps } from 'next';
import { css } from '@emotion/react';

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

interface Props {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/posts?populate=*`);
    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }
    const data = await res.json();
    
    // Filtrer les posts par catégorie "Promotion"
    const postsPromotion = data.data.filter((post: Post) => post.attributes.categorie.data.attributes.nom === 'Promotion');
    
    return {
      props: {
        posts: postsPromotion || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        posts: [],
      },
    };
  }
};

// Styles généraux pour la page
const pageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0 1rem;
`;

// Styles pour le conteneur des posts
const containerStyles = css`
  margin-top: 6rem;
  padding: 2rem;
  background-color: #e0e0e0;
  border: 2px solid #c0c0c0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  margin: 6rem auto;
  
  @media (max-width: 1200px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Promotion: React.FC<Props> = ({ posts }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div css={pageStyles}>
      <Layout>
        <BannerPage title="Promotion" color="rgba(126, 179, 1, 1)" /> {/* Couleur personnalisée */}
        <div css={containerStyles}>
          <Posts posts={posts} />
        </div>
      </Layout>
    </div>
  );
};

export default Promotion;
