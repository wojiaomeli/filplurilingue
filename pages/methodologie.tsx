/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import BannerPage from '../src/app/components/BannerPage';
import FilterBar from '../src/app/components/FilterBar';
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
  background-color: #f9f9f9;
  min-height: 100vh;
  margin: 0; /* Assurez-vous qu'il n'y a pas de marge extérieure */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  flex: 1; /* Permet au contenu de prendre l'espace disponible */
`;

const containerStyles = css`
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const paginationStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 2rem 0;

  li {
    margin: 0 0.25rem;
  }

  a, span {
    padding: 0.5rem 1rem;
    background-color: #0070f3;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
    display: inline-block;

    &:hover {
      background-color: #005bb5;
    }
  }

  span.current-page {
    background-color: #333;
    color: white;
  }

  span.ellipsis {
    padding: 0 0.5rem;
    color: #999;
    font-weight: normal;
    pointer-events: none;
  }
`;

const filterBarContainerStyles = css`
  margin-bottom: 2rem; /* Ajustez la valeur pour augmenter l'espace */
`;

const Methodologie: React.FC<Props> = ({ posts, currentPage, totalPages }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const createPaginationLinks = () => {
    const links = [];
    const maxPagesToShow = 3;
    const isStart = currentPage <= maxPagesToShow;
    const isEnd = currentPage > totalPages - maxPagesToShow;

    if (currentPage > 1) {
      links.push(
        <li key="prev">
          <a href={`/methodologie?page=${currentPage - 1}`}>&laquo; Précédent</a>
        </li>
      );
    }

    if (!isStart) {
      links.push(
        <li key="1">
          <a href={`/methodologie?page=1`}>1</a>
        </li>
      );
      if (currentPage > maxPagesToShow + 1) {
        links.push(
          <li key="start-ellipsis">
            <span className="ellipsis">...</span>
          </li>
        );
      }
    }

    const startPage = isStart ? 1 : currentPage - 1;
    const endPage = isEnd ? totalPages : currentPage + 1;

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <li key={i}>
          {i === currentPage ? (
            <span className="current-page">{i}</span>
          ) : (
            <a href={`/methodologie?page=${i}`}>{i}</a>
          )}
        </li>
      );
    }

    if (!isEnd) {
      if (currentPage < totalPages - maxPagesToShow) {
        links.push(
          <li key="end-ellipsis">
            <span className="ellipsis">...</span>
          </li>
        );
      }
      links.push(
        <li key={totalPages}>
          <a href={`/methodologie?page=${totalPages}`}>{totalPages}</a>
        </li>
      );
    }

    if (currentPage < totalPages) {
      links.push(
        <li key="next">
          <a href={`/methodologie?page=${currentPage + 1}`}>Suivant &raquo;</a>
        </li>
      );
    }

    return links;
  };

  return (
    <div css={pageStyles}>
      <Layout>
        <BannerPage 
          title="Méthodologie" 
          color="rgba(229, 7, 73, 1)"
        />
        <div css={containerStyles}>
          <div css={filterBarContainerStyles}>
            <FilterBar onSelect={(filter) => console.log('Selected filter:', filter)} />
          </div>
          <div css={gridStyles}>
            <Posts posts={posts} />
          </div>
          <ul css={paginationStyles}>
            {createPaginationLinks()}
          </ul>
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
