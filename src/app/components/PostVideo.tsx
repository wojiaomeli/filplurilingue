// pages/postvideo.tsx

import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { css } from '@emotion/react';

interface PostVideoProps {
  data: {
    id: number;
    attributes: {
      Nom: string;
      article: string;
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
      video: {
        data: Array<{
          attributes: {
            url: string;
          };
        }>;
      };
    };
  };
}

const containerStyles = css`
  padding: 2rem;
  margin-top: 2rem;
  border: 2px solid #f5a623;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const postBoxStyles = css`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PostVideo = ({ data }: PostVideoProps) => {
  const { Nom, article, resume, image, video } = data.attributes;
  const summary = resume.map(paragraph => paragraph.children.map(child => child.text).join(' ')).join(' ');

  return (
    <div css={containerStyles}>
      <h1>{Nom}</h1>
      <div css={postBoxStyles}>
        {image.data.length > 0 && (
          <div className="image">
            <Image
              src={image.data[0].attributes.url}
              alt={image.data[0].attributes.alternativeText || 'Image'}
              width={image.data[0].attributes.width}
              height={image.data[0].attributes.height}
              layout="responsive"
            />
          </div>
        )}
        <div className="summary">
          <h2>Résumé</h2>
          <p>{summary}</p>
        </div>
        <div className="article">
          <h2>Article Complet</h2>
          <p>{article}</p>
        </div>
        {video.data.length > 0 && (
          <div className="video">
            <video controls>
              <source src={video.data[0].attributes.url} type="video/mp4" />
              Votre navigateur ne prend pas en charge la balise vidéo.
            </video>
          </div>
        )}
      </div>
      <style jsx>{`
        .image, .video {
          margin: 20px 0;
        }
        h1, h2 {
          font-size: 2em;
        }
        p {
          font-size: 1em;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.API_URL}/temoignage-videos/${id}?populate=*`);
  const data = await res.json();

  return {
    props: {
      data: data.data,
    },
  };
};

export default PostVideo;
