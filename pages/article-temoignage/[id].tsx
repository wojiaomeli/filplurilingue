import React, { useState, useEffect } from 'react';
import Layout from '../../src/app/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRouter } from 'next/router';

// Composant pour les titres
const Heading = ({ level, children }: { level: number; children: React.ReactNode }) => {
  const headingStyle = {
    fontSize: `${2.5 - level * 0.5}rem`,
    fontWeight: 'bold',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
  };

  return React.createElement(`h${level}`, { style: headingStyle }, children);
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temoignage-videos/${id}?populate=*`);
    if (!response.ok) {
      throw new Error('Erreur de récupération des données');
    }
    const data = await response.json();

    if (!data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        temoignage: data.data.attributes,
      },
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      notFound: true,
    };
  }
};

const TemoignageDetailPage = ({ temoignage }: { temoignage: any }) => {
  const [relatedItems, setRelatedItems] = useState<any[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchRelatedItems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temoignage-videos?filters[id][$ne]=${id}&sort[createdAt]=desc&pagination[limit]=4&populate=*`);
        if (!response.ok) {
          throw new Error('Erreur de récupération des éléments connexes');
        }
        const data = await response.json();
        setRelatedItems(data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des éléments connexes :', error);
      }
    };
    fetchRelatedItems();
  }, [id]);

  if (!temoignage) {
    return (
      <Layout>
        <div className="error-page">
          <h1>Cette page n'a pas pu être trouvée.</h1>
          <p>Nous n'avons pas pu trouver le témoignage que vous cherchez.</p>
          <Link href="/temoignages-videos">
            <a>Retour à la liste des témoignages</a>
          </Link>
        </div>
        <style jsx>{`
          .error-page {
            text-align: center;
            padding: 20px;
          }
          .error-page a {
            color: #0068c8;
            text-decoration: underline;
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="temoignage-detail-page">
        <div className="banner-container">
          <div className="banner">
            <h1 className="title">{temoignage.Nom}</h1>
            <p className="date">{new Date(temoignage.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="content-container">
          <div className="text-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (props) => <Heading level={1} {...props} />,
                h2: (props) => <Heading level={2} {...props} />,
                h3: (props) => <Heading level={3} {...props} />,
                h4: (props) => <Heading level={4} {...props} />,
                h5: (props) => <Heading level={5} {...props} />,
                h6: (props) => <Heading level={6} {...props} />,
              }}
            >
              {temoignage.article || ''}
            </ReactMarkdown>
          </div>
          <div className="image-container">
            {temoignage.image?.data?.[0] && (
              <div className="image-wrapper">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${temoignage.image.data[0].attributes.url}`}
                  alt={temoignage.image.data[0].attributes.alternativeText || 'Image du témoignage'}
                  layout="responsive"
                  width={1200}
                  height={800}
                  objectFit="cover"
                />
              </div>
            )}
          </div>
          <div className="video-container">
            {temoignage.video?.data?.length > 0 && (
              <div className="video-wrapper">
                <video controls width="100%">
                  <source
                    src={`${process.env.NEXT_PUBLIC_API_URL}${temoignage.video.data[0].attributes.url}`}
                    type="video/mp4"
                  />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section À consulter aussi en dehors du conteneur principal */}
      <div className="related-posts-section">
        <div className="related-posts">
          <h2 className="related-posts-title">
            <span className="title-first-letter">À</span>
            <span className="title-rest"> consulter aussi</span>
          </h2>
          <div className="cards-container">
            {relatedItems
              .filter((item: any) => item.id !== temoignage.id)
              .map((item: any) => (
                <div key={item.id} className="card">
                  <div className="card-image-container">
                    <Image
                      className="card-image"
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.attributes.image?.data[0]?.attributes?.url}`}
                      alt={item.attributes.image?.data[0]?.attributes?.alternativeText || 'Image de témoignage'}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{item.attributes.Nom}</h3>
                    <Link className="read-more-button" href={`/temoignage-videos/${item.id}`}>
                      Lire aussi
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .temoignage-detail-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f4f4f4;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .banner-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .banner {
          position: relative;
          padding: 20px;
          color: white;
          border-radius: 8px 8px 0 0;
          background: linear-gradient(135deg, rgba(229, 7, 73, 1), rgba(3, 112, 225, 1));
          height: 200px;
          width: 100%;
          max-width: 900px;
          box-sizing: border-box;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .title {
          margin: 0;
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
        }
        .date {
          position: absolute;
          bottom: 10px;
          right: 20px;
          font-size: 1.1rem;
        }
        .content-container {
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: -10px;
          border-top: 4px solid #e6e6e6;
        }
        .text-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333;
        }
        .text-content h1, .text-content h2, .text-content h3, .text-content h4, .text-content h5, .text-content h6 {
          margin: 0.5rem 0;
        }
        .image-container {
          text-align: center;
          margin: 20px 0;
        }
        .image-wrapper {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .video-container {
          margin: 20px 0;
        }
        .video-wrapper {
          max-width: 100%;
        }
        .related-posts-section {
          margin: 30px auto; /* Ajouté un espace au-dessus pour la séparation */
          max-width: 900px; /* Assurez-vous que la largeur est cohérente avec le conteneur principal */
        }
        .related-posts-title {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title-first-letter {
          color: #e5054a;
          font-weight: bold;
          font-size: 2rem;
        }
        .title-rest {
          color: #0370e1;
          font-weight: bold;
          font-size: 1.8rem;
          margin-left: 8px;
        }
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
          max-width: 250px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .card-image-container {
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }
        .card-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .card-content {
          padding: 15px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        .card-title {
          font-size: 1rem;
          font-weight: bold;
          margin: 10px 0;
        }
        .read-more-button {
          display: inline-block;
          padding: 8px 16px;
          font-size: 0.9rem;
          color: #fff;
          background-color: #0370e1;
          border-radius: 4px;
          text-decoration: none;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default TemoignageDetailPage;
