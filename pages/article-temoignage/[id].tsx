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

  const processContent = (content: string) => {
    return marked(content);
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
      </Layout>
    );
  }

  return (
    <Layout>
      <button className="back-button" onClick={() => window.history.back()}>
        &#8592;
      </button>
      <div className="temoignage-detail-page">
        <div className="banner-container">
          <div className="banner">
            <h1 className="title">{temoignage.Nom}</h1>
            <p className="date">{new Date(temoignage.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="content-container">
          <div className="text-content">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: processContent(temoignage.article) }} />
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
                  Your browser does not support the video tag.
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
            {relatedItems.map((item: any) => (
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
          position: relative;
          margin: 0;
        }
        .banner {
          position: relative;
          padding: 30px;
          color: white;
          text-align: left;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(229, 7, 73, 1), rgba(3, 112, 225, 1));
          height: 250px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .title {
          margin: 0;
          font-size: 2.5rem;
          font-weight: bold;
        }
        .date {
          position: absolute;
          bottom: 10px;
          right: 20px;
          font-size: 1.1rem;
          color: #ffffff;
        }
        .content-container {
          padding: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: -10px;
          z-index: 0;
          position: relative;
        }
        .text-content {
          margin-bottom: 30px;
        }
        .article-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333333;
        }
        .article-content h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-top: 40px;
          margin-bottom: 20px;
          color: #111;
        }
        .article-content h2 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 15px;
          color: #444;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 10px;
        }
        .article-content h3 {
          font-size: 1.75rem;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 15px;
          color: #555;
        }
        .article-content h4 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 25px;
          margin-bottom: 10px;
          color: #666;
        }
        .article-content h5 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 10px;
          color: #777;
        }
        .article-content h6 {
          font-size: 1rem;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 10px;
          color: #888;
        }
        .image-container {
          margin: 40px 0;
          text-align: center;
        }
        .image-wrapper {
          border-radius: 8px;
          overflow: hidden;
        }
        .video-container {
          margin: 40px 0;
        }
        .video-wrapper {
          border-radius: 8px;
          overflow: hidden;
        }
        .back-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 20px;
          width: 50px;
          height: 50px;
          background-color: white;
          color: #333;
          border: 2px solid #ccc;
          border-radius: 8px;
          text-align: center;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .back-button:hover {
          background-color: #f0f0f0;
          border-color: #999;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .related-posts-section {
          padding: 20px;
          background-color: #f1f1f1;
          border-radius: 8px;
          margin-top: 40px;
        }
        .related-posts-title {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title-first-letter {
          color: rgba(229, 7, 73, 1);
          font-weight: bold;
          font-size: 2rem;
        }
        .title-rest {
          color: rgba(3, 112, 225, 1);
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
          max-width: 320px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .card-image-container {
          width: 100%;
          height: 180px;
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
          padding: 20px;
          text-align: center;
          background: #fff;
        }
        .card-title {
          font-size: 1.4rem;
          margin: 0;
          color: #333;
          font-weight: 600;
        }
        .read-more-button {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 20px;
          font-size: 1rem;
          color: #fff;
          background-color: rgba(229, 7, 73, 1);
          border-radius: 5px;
          text-decoration: none;
          transition: background-color 0.3s, transform 0.2s;
        }
        .read-more-button:hover {
          background-color: rgba(229, 7, 73, 0.8);
          transform: scale(1.05);
        }
        .error-page {
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default TemoignageDetailPage;
