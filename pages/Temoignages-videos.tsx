/** @jsxImportSource @emotion/react */
import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../src/app/components/Layout';
import { GetServerSideProps } from 'next';
import { css } from '@emotion/react';
import BackButton from '../src/app/components/BackButton'; // Importez le composant BackButton

// Chargement dynamique des composants pour éviter une hydratation inutile
const BannerPage = dynamic(() => import('../src/app/components/BannerPage'), { ssr: false });
const CardVideo = dynamic(() => import('../src/app/components/CardVideo'), { ssr: false });

interface TemoignagesVideosProps {
  temoignages: Array<{
    id: number;
    attributes: {
      Nom: string;
      resume: Array<{ type: string; children: Array<{ type: string; text: string }> }>;
      image: {
        data: Array<{
          attributes: {
            url: string;
            width: number;
            height: number;
            alternativeText: string | null;
          };
        }>;
      };
      publishedAt: string;
    };
  }>;
}

const pageStyles = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const mainContentStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
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

const bannerContainerStyles = css`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: rgba(229, 7, 73, 1); /* Couleur du bandeau rouge */
`;

const TemoignagesVideosPage = ({ temoignages }: TemoignagesVideosProps) => {
  return (
    <div css={pageStyles}>
      <Layout>
        <div css={bannerContainerStyles}>
          <BackButton /> {/* Le bouton "Retour" est maintenant à gauche du bandeau rouge */}
          <BannerPage title="Témoignages et Vidéos" color="rgba(229, 7, 73, 1)" />
        </div>
        <div css={mainContentStyles}>
          <div css={containerStyles}>
            <div css={gridStyles}>
              {temoignages.map((temoignage) => {
                const { id, attributes } = temoignage;
                const { Nom, image, resume, publishedAt } = attributes;
                const summary = resume.map(paragraph => paragraph.children.map(child => child.text).join(' ')).join(' ');

                const imageUrl = image.data && image.data.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${image.data[0].attributes.url}` : '';

                return (
                  <CardVideo
                    key={id}
                    id={id}
                    title={Nom}
                    image={{
                      url: imageUrl,
                      width: image.data && image.data.length > 0 ? image.data[0].attributes.width : 0,
                      height: image.data && image.data.length > 0 ? image.data[0].attributes.height : 0,
                      alt: image.data && image.data.length > 0 ? image.data[0].attributes.alternativeText || '' : '',
                    }}
                    summary={summary}
                    videoUrl=""
                    publicationDate={publishedAt}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temoignage-videos?populate=*`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();

    return {
      props: {
        temoignages: data.data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        temoignages: [],
      },
    };
  }
};

export default TemoignagesVideosPage;
