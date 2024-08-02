import React, { useEffect, useState } from 'react';
import BannerPage from '../src/app/components/BannerPage';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import { GetServerSideProps } from 'next';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const page = parseInt(context.query.page as string, 10) || 1; // Page courante

  try {
    const res = await fetch(`${API_URL}/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=10`);
    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }
    const data = await res.json();

    console.log('Data from API:', data); // Debugging: Log data from API

    const postsPays = data.data?.filter((post: Post) =>
      post?.attributes?.category?.data?.attributes?.nom === 'Pays'
    );
    const totalPages = Math.ceil(data.meta.pagination.total / 10); // Total des pages en fonction du nombre d'éléments

    return {
      props: {
        posts: postsPays || [],
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

const pageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

const containerStyles = css`
  padding: 2rem;
  background-color: #e0e0e0;
  border: 2px solid #c0c0c0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;

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

const Pays: React.FC<Props> = ({ posts, currentPage, totalPages }) => {
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  // Construire l'URL pour la page suivante
  const nextPage = currentPage < totalPages ? `/pays?page=${currentPage + 1}` : null;
  const prevPage = currentPage > 1 ? `/pays?page=${currentPage - 1}` : null;

  console.log('Posts in Pays component:', posts); // Debugging: Log posts in component

  return (
    <div css={pageStyles}>
      <Layout>
        <BannerPage 
          title="Dispositif par pays" 
          color="rgba(55, 53, 152, 1)" 
          nextPageUrl={nextPage} // URL de la page suivante
        />
        <div css={containerStyles}>
          <Posts posts={posts} />
        </div>
      </Layout>
    </div>
  );
};

export default Pays;
