/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import BannerPage from '../src/app/components/BannerPage';
import { GetServerSideProps } from 'next';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import BackButton from '../src/app/components/BackButton'; // Import du bouton de retour
import Pagination from '../src/app/components/Pagination'; // Import du composant de pagination

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

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const bannerContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: rgba(253, 205, 0, 1); /* Couleur jaune pour le bandeau */
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  position: relative; /* Position relative pour le bouton */
  margin-bottom: 0; /* Supprimer l'espace sous le bandeau */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
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
  margin-top: -2rem; /* Supprimer l'espace entre le bandeau et le conteneur des articles */

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 0; /* Ajuster le margin-top pour les petits écrans */
  }
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem; /* Espace entre les cartes */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Une colonne sur les petits écrans */
    gap: 1rem; /* Réduire l'espace entre les cartes sur les petits écrans */
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

const PaginationWrapper = css`
  margin-top: 2rem; /* Espace au-dessus de la pagination */

  @media (max-width: 768px) {
    margin-top: 1rem; /* Réduire l'espace au-dessus de la pagination sur les petits écrans */
  }
`;

const Classe: React.FC<Props> = ({ posts, currentPage, totalPages }) => {
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const handleBack = () => {
    router.back();
  };

  return (
    <div css={pageStyles}>
      <Layout>
        <div css={bannerContainerStyles}>
          <BackButton css={backButtonStyles} onClick={handleBack} />
          <BannerPage 
            title="Pour la classe" 
            color="rgba(253, 205, 0, 1)" /* Couleur jaune pour le bandeau */ 
          />
        </div>
        <div css={containerStyles}>
          <div css={gridStyles}>
            <Posts posts={posts} />
          </div>
          {posts.length > 6 && ( /* Afficher la pagination uniquement si plus de 6 articles */
            <div css={PaginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => router.push(`/classe?page=${page}`)}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const page = parseInt(context.query.page as string, 10) || 1;
  const pageSize = 9;

  try {
    const res = await fetch(`${API_URL}/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    if (!res.ok) {
      throw new Error(`Fetch échoué avec le statut ${res.status}`);
    }
    const data = await res.json();

    const postsClasse = data.data.filter((post: Post) =>
      post?.attributes?.category?.data?.attributes?.nom === 'Classe'
    );

    const totalPages = Math.ceil(data.meta.pagination.total / pageSize);

    return {
      props: {
        posts: postsClasse,
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

export default Classe;
