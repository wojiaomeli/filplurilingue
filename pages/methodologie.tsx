/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import BannerPage from '../src/app/components/BannerPage';
import FilterBar from '../src/app/components/FilterBar';
import BackButton from '../src/app/components/BackButton'; // Import du bouton de retour
import Pagination from '../src/app/components/Pagination'; // Import du composant de pagination
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
    category: {
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
  currentPage: number;
  totalPages: number;
}

const pageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff; /* Fond blanc pour la page entière */
  min-height: 100vh;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  flex: 1;
`;

const bannerContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(229, 7, 73, 1); /* Couleur de fond rouge du bandeau */
  color: white;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem; /* Espace entre le bandeau et le conteneur des articles */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const backButtonStyles = css`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10; /* Assurez-vous que le bouton est au-dessus du contenu */

  @media (max-width: 768px) {
    left: 0;
    top: auto;
    transform: none; /* Supprimer la transformation sur les petits écrans */
    margin-bottom: 1rem; /* Ajouter de l'espace en bas sur les petits écrans */
  }
`;

const containerStyles = css`
  padding: 2rem;
  background-color: #ffffff; /* Fond blanc pour le conteneur des articles */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 100%;
  width: 100%;
  margin: 0 auto; /* Centrage horizontal */
  box-sizing: border-box;
  margin-top: 1rem; /* Espace entre le bandeau et le conteneur des articles */

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1rem; /* Ajuster l'espace au-dessus du conteneur sur les petits écrans */
  }
`;

const filterBarContainerStyles = css`
  margin-bottom: 2rem;
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Une colonne sur les petits écrans */
    gap: 1rem; /* Réduire l'espace entre les cartes sur les petits écrans */
  }
`;

const Methodologie: React.FC<Props> = ({ posts, currentPage, totalPages }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const handlePageChange = (page: number) => {
    // Assurez-vous que la page est dans les limites
    if (page >= 1 && page <= totalPages) {
      window.location.href = `/methodologie?page=${page}`;
    }
  };

  return (
    <div css={pageStyles}>
      <Layout>
        <div css={bannerContainerStyles}>
          <BackButton css={backButtonStyles} /> {/* Ajout du bouton de retour */}
          <BannerPage 
            title="Méthodologie" 
            color="rgba(229, 7, 73, 1)"
          />
        </div>
        <div css={containerStyles}>
          <div css={filterBarContainerStyles}>
            <FilterBar onSelect={(filter) => console.log('Selected filter:', filter)} />
          </div>
          <div css={gridStyles}>
            <Posts posts={posts} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const page = parseInt(context.query.page as string, 10) || 1;
  const pageSize = 13;

  try {
    const res = await fetch(`${API_URL}/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }
    const data = await res.json();

    const postsMethodologie = data.data.filter((post: Post) =>
      post?.attributes?.category?.data?.attributes?.nom === 'Methodologie'
    );

    const totalPages = Math.ceil(data.meta.pagination.total / pageSize);

    return {
      props: {
        posts: postsMethodologie,
        currentPage: page,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        posts: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};

export default Methodologie;
