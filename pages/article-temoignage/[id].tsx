import React, { useState, useEffect } from 'react';
import Layout from '../../src/app/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { marked } from 'marked';

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

  useEffect(() => {
    const fetchRelatedItems = async () => {
      try {
        // Récupérer les articles connexes en excluant celui en cours
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temoignage-videos?filters[id][$ne]=${temoignage.id}&sort[createdAt]=desc&pagination[limit]=4&populate=*`);
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
  }, [temoignage.id]);

  // Fonction pour transformer le contenu Markdown en HTML
  const processContent = (content: string) => {
    return marked(content, { gfm: true, breaks: true });
  };

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
          <div className="text-content" dangerouslySetInnerHTML={{ __html: processContent(temoignage.article) }} />
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

      <div className="related-posts-section">
        <div className="related-posts">
          <h2 className="related-posts-title">
            <span className="title-first-letter">À</span>
            <span className="title-rest"> consulter aussi</span>
          </h2>
          <div className="cards-container">
            {relatedItems
              .filter((item: any) => item.id !== temoignage.id) // Assurez-vous que l'article en cours est exclu
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
                    <Link className="read-more-button" href={`/article-temoignage/${item.id}`}>
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
          max-width: 1000px;
          margin: 0 auto;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          background-color: #f8f9fa;
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
          text-align: center;
          border-radius: 12px 12px 0 0; /* Arrondi uniquement en haut */
          background: linear-gradient(135deg, rgba(229, 7, 73, 1), rgba(3, 112, 225, 1));
          height: 180px;
          width: 100%;
          max-width: 1000px;
          box-sizing: border-box;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .title {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 300; /* Police plus fine */
          text-align: center;
        }
        .date {
          position: absolute;
          bottom: 10px;
          right: 20px;
          font-size: 1.1rem;
        }
        .content-container {
          padding: 30px;
          background-color: #ffffff;
          border-radius: 0 0 12px 12px; /* Arrondi uniquement en bas */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: -10px; /* Ajustement pour coller les conteneurs */
          border-top: 4px solid #e6e6e6; /* Séparation subtile */
        }
        .text-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333;
        }
        .text-content h2,
        .text-content h3 {
          font-weight: bold;
          margin: 20px 0 10px 0;
          color: #222;
        }
        .text-content h2 {
          font-size: 1.75rem;
        }
        .text-content h3 {
          font-size: 1.5rem;
        }
        .text-content p {
          margin-bottom: 15px;
        }
        .text-content ul,
        .text-content ol {
          margin-bottom: 15px;
          padding-left: 20px;
        }
        .text-content li {
          margin-bottom: 5px;
        }
        .image-container, .video-container {
          margin-top: 20px;
        }
        .related-posts-section {
          padding: 40px;
          background-color: #ffffff; /* Suppression du fond gris */
        }
        .related-posts-title {
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: center;
        }
        .title-first-letter {
          color: rgba(229, 7, 73, 1);
          font-weight: bold;
          font-size: 2rem;
        }
        .title-rest {
          color: rgba(3, 112, 225, 1);
          font-weight: bold;
        }
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .card {
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 250px;
          text-align: center;
        }
        .card-image-container {
          position: relative;
          width: 100%;
          height: 150px;
          overflow: hidden;
        }
        .card-image {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .card-content {
          padding: 15px;
        }
        .card-title {
          font-size: 1.2rem;
          margin: 0;
          color: #333333;
        }
        .read-more-button {
          display: inline-block;
          margin-top: 10px;
          font-size: 1rem;
          color: #0068c8; /* Bleu */
          text-decoration: none;
          border: 1px solid #0068c8; /* Bleu */
          padding: 8px 12px;
          border-radius: 4px;
          background-color: #ffffff;
          transition: background-color 0.3s, color 0.3s;
        }
        .read-more-button:hover {
          background-color: #0068c8; /* Bleu */
          color: #ffffff;
        }
      `}</style>
    </Layout>
  );
};

export default TemoignageDetailPage;
