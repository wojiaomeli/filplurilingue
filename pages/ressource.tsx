/** @jsxImportSource @emotion/react */
import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../src/app/components/Layout';
import { css } from '@emotion/react';
import { Post } from '../lib/FetchPost';
import Pagination from '../src/app/components/Pagination';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// Chargement dynamique des composants
const BannerPage = dynamic(() => import('../src/app/components/BannerPage'), { ssr: false });
const Posts = dynamic(() => import('../src/app/components/Posts'), { ssr: false });
const BackButton = dynamic(() => import('../src/app/components/BackButton'), { ssr: false });

interface Props {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

const pageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const bannerContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(3, 112, 225, 1);
  color: white;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;

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
  z-index: 10;

  @media (max-width: 768px) {
    left: 0;
    top: auto;
    transform: none;
    margin-bottom: 1rem;
  }
`;

const containerStyles = css`
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1rem;
  }
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Ressources: React.FC<Props> = ({ posts, totalPages, currentPage }) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
    router.push(`/ressource?page=${newPage}`);
  };

  return (
    <div css={pageStyles}>
      <Layout>
        <div css={bannerContainerStyles}>
          <BackButton css={backButtonStyles} />
          <BannerPage 
            title="Toutes les ressources" 
            color="rgba(3, 112, 225, 1)"
          />
        </div>
        <div css={containerStyles}>
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

// Fonction pour récupérer les données côté serveur
export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const page = parseInt(context.query.page as string, 10) || 1; // Page actuelle
  const pageSize = 6; // Nombre d'articles par page

  try {
    // Faire la requête API pour récupérer les articles avec pagination
    const res = await fetch(`${API_URL}/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    
    if (!res.ok) {
      console.error(`Fetch failed with status ${res.status}`);
      const errorData = await res.json();
      console.error("API Error Response:", errorData);
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();
    const totalItems = data.meta.pagination.total;
    const totalPages = Math.ceil(totalItems / pageSize); // Calculer le nombre total de pages

    return {
      props: {
        posts: data.data, // Articles pour la page actuelle
        totalPages, // Nombre total de pages
        currentPage: page, // Page actuelle
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error.message);
    return {
      props: {
        posts: [], // Liste d'articles vide en cas d'erreur
        totalPages: 1, // Nombre de pages par défaut
        currentPage: 1, // Page par défaut en cas d'erreur
      },
    };
  }
};

export default Ressources;
