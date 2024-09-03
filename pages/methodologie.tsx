/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import Posts from '../src/app/components/Posts';
import BannerPage from '../src/app/components/BannerPage';
import FilterBar from '../src/app/components/FilterBar';
import BackButton from '../src/app/components/BackButton';
import Pagination from '../src/app/components/Pagination';
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
  background-color: #ffffff;
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
  background-color: rgba(229, 7, 73, 1);
  color: white;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
`;

const backButtonStyles = css`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
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
`;

const filterBarContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const buttonStyles = css`
  background-color: rgba(229, 7, 73, 1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Methodologie: React.FC<Props> = ({ posts, currentPage, totalPages }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      window.location.href = `/methodologie?page=${page}`;
    }
  };

  const handleButtonClick = () => {
    window.location.href = '/Temoignages-videos';
  };

  return (
    <div css={pageStyles}>
      <Layout>
        <div css={bannerContainerStyles}>
          <BackButton css={backButtonStyles} />
          <BannerPage title="Méthodologie" color="rgba(229, 7, 73, 1)" />
        </div>
        <div css={containerStyles}>
          <div css={filterBarContainerStyles}>
            <FilterBar onSelect={(filter) => console.log('Selected filter:', filter)} />
            <button css={buttonStyles} onClick={handleButtonClick}>
              Témoignages & Vidéos
            </button>
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
