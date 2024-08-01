import React from 'react';
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

    // Filtrer les posts par catégorie "Méthodologie" et trier par date
    const postsMethodologie = data.data
      .filter((post: Post) => post.attributes.categorie.data.attributes.nom === 'Methodologie')
      .sort((a: Post, b: Post) => {
        return new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime();
      });

    return {
      props: {
        posts: postsMethodologie || [],
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
  background-color: #f5f5f5; /* Fond gris clair pour toute la page */
  min-height: 100vh; /* Hauteur minimale pour couvrir l'écran */
  padding: 0 1rem; /* Espacement horizontal */
`;

// Styles pour le conteneur des posts
const containerStyles = css`
  margin-top: 6rem; /* Augmente l'espace au-dessus du conteneur pour une séparation plus nette */
  padding: 2rem; /* Espacement intérieur */
  background-color: #e0e0e0; /* Fond gris clair pour le conteneur des posts */
  border: 2px solid #c0c0c0; /* Bordure subtile */
  border-radius: 12px; /* Coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre légère */
  max-width: 1200px; /* Largeur maximale du conteneur */
  width: 100%; /* Largeur pleine */
  margin: 6rem auto; /* Centrage et marge automatique, avec plus d'espace en haut */
  
  /* Media Queries */
  @media (max-width: 1200px) {
    padding: 1.5rem; /* Réduit le padding sur les écrans plus petits */
  }

  @media (max-width: 768px) {
    padding: 1rem; /* Réduit encore le padding pour les petits écrans */
  }

  @media (max-width: 480px) {
    padding: 0.5rem; /* Réduit le padding pour les très petits écrans */
  }
`;

const titleStyles = css`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem; /* Ajuste la taille du titre pour les petits écrans */
  }

  @media (max-width: 480px) {
    font-size: 1.5rem; /* Ajuste encore pour les très petits écrans */
  }
`;

const Methodologie: React.FC<Props> = ({ posts }) => {
  return (
    <div css={pageStyles}>
      <Layout>
        <BannerPage title="Méthodologie" color="rgba(229, 7, 73, 1)" />
        
        <div css={containerStyles}>
          <Posts posts={posts} />
        </div>
      </Layout>
    </div>
  );
};

export default Methodologie;