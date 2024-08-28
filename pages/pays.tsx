/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import BannerPage from '../src/app/components/BannerPage';
import Pagination from '../src/app/components/Pagination';
import BackButton from '../src/app/components/BackButton';
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
  min-height: 100vh; /* Assure que la page occupe au moins la hauteur de la fenêtre */
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const mainContentStyles = css`
  flex: 1; /* Assure que le contenu principal occupe tout l'espace disponible */
`;

const bannerStyles = css`
  width: 100%;
  background-color: rgba(55, 53, 152, 1);
  color: white;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Aligne les éléments à gauche et à droite */
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem 0;
    text-align: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Une colonne sur les petits écrans */
    gap: 1rem;
  }
`;

const buttonWrapperStyles = css`
  margin-left: 1rem; /* Espace entre le bouton et le bord gauche */

  @media (max-width: 768px) {
    margin-left: 0; /* Pas d'espace sur les petits écrans */
    margin-bottom: 1rem; /* Espace en bas sur les petits écrans */
  }
`;

const Pays: React.FC<Props> = ({ posts, currentPage, totalPages }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div css={pageStyles}>
      <Layout>
        <div css={bannerStyles}>
          <div css={buttonWrapperStyles}>
            <BackButton />
          </div>
          <BannerPage 
            title="Dispositif par pays" 
            color="rgba(55, 53, 152, 1)" 
          />
        </div>
        <div css={mainContentStyles}>
          <div css={containerStyles}>
            <div css={gridStyles}>
              <Posts posts={posts} />
            </div>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => window.location.href = `/pays?page=${page}`}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const page = parseInt(context.query.page as string, 10) || 1;
  const pageSize = 6; // Nombre d'articles par page

  try {
    // Effectuer la requête API pour récupérer tous les articles
    const res = await fetch(`${API_URL}/api/posts?populate=*&sort[0]=publishedAt:desc`);
    if (!res.ok) {
      throw new Error(`Fetch échoué avec le statut ${res.status}`);
    }
    const data = await res.json();

    // Filtrer les articles pour la catégorie 'Pays'
    const postsPays = data.data.filter((post: Post) =>
      post?.attributes?.category?.data?.attributes?.nom === 'Pays'
    );

    // Calculer le nombre total de pages
    const totalPosts = postsPays.length; // Total des articles filtrés
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Calculer les articles à afficher pour la page actuelle
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = postsPays.slice(startIndex, endIndex);

    return {
      props: {
        posts: paginatedPosts,
        currentPage: page,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error.message);
    return {
      props: {
        posts: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};

export default Pays;
