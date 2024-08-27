import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/app/components/Layout';
import Link from 'next/link';

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query; // Utiliser slug comme identifiant
  const [article, setArticle] = useState<any>(null);
  const [category, setCategory] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchArticle = async () => {
        setLoading(true);
        try {
          let foundArticle = null;
          let articleType = '';

          // Liste des endpoints à tester avec slug comme paramètre
          const endpoints = [
            `${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
            `${process.env.NEXT_PUBLIC_API_URL}/api/jumelage-scolaires?filters[slug][$eq]=${slug}&populate=*`,
            `${process.env.NEXT_PUBLIC_API_URL}/api/temoignage-videos?filters[slug][$eq]=${slug}&populate=*`
          ];

          // Tentative de récupération de l'article depuis chaque endpoint
          for (const endpoint of endpoints) {
            const response = await fetch(endpoint);
            console.log('Endpoint:', endpoint); // Affiche l'URL
            console.log('Response status:', response.status); // Affiche le code de statut
            const data = await response.json();
            console.log('Data:', data); // Affiche les données retournées par l'API

            if (data.data && data.data.length > 0) {
              foundArticle = data.data[0];
              articleType = endpoint.split('/')[3];
              break;
            }
          }

          if (!foundArticle) {
            throw new Error('Article non trouvé');
          }

          const articleAttributes = foundArticle.attributes;
          setArticle({ ...articleAttributes, type: articleType });
          const currentCategory = articleAttributes.category?.data?.attributes?.nom || '';
          setCategory(currentCategory);

          // Récupération des articles connexes
          const relatedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/${articleType}?filters[category][nom][$eq]=${currentCategory}&filters[slug][$ne]=${slug}&sort[createdAt]=desc&pagination[limit]=4&populate=*`;
          const relatedResponse = await fetch(relatedEndpoint);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            console.log('Related Data:', relatedData); // Affiche les données connexes
            setRelatedPosts(relatedData.data);
          } else {
            throw new Error('Erreur lors de la récupération des articles connexes');
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [slug]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>Article non trouvé</div>;

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Méthodologie':
        return '#e5054a'; // redFil
      case 'Promotion':
        return '#7eb301'; // greenF
      case 'Classe':
        return '#fdcd00'; // yellowF
      case 'Pays':
        return '#5d0073'; // purplF
      default:
        return '#e5054a'; // Couleur par défaut
    }
  };

  return (
    <Layout>
      <div className="article-page">
        <div className="banner" style={{ backgroundColor: getCategoryColor(category) }}>
          <h1 className="title">{article.titre}</h1>
          <p className="date">{new Date(article.date).toLocaleDateString()}</p>
        </div>
        <div className="content-container">
          <div className="image-container">
            <img
              className="article-image"
              src={`${process.env.NEXT_PUBLIC_API_URL}${article.image?.data[0]?.attributes?.url}`}
              alt={article.image?.data[0]?.attributes?.alternativeText || 'Image de l\'article'}
            />
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: article.Texte }} />
        </div>
      </div>

      <div className="related-posts">
        <h2 className="related-posts-title">
          <span className="title-first-letter">À</span>
          <span className="title-rest"> consulter aussi</span>
        </h2>
        <div className="cards-container">
          {relatedPosts.map((post: any) => (
            <div key={post.id} className="card">
              <div className="card-image-container">
                <img
                  className="card-image"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${post.attributes.image?.data[0]?.attributes?.url}`}
                  alt={post.attributes.image?.data[0]?.attributes?.alternativeText || 'Image de l\'article'}
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{post.attributes.titre}</h3>
                <Link className="read-more-button" href={`/article/${post.attributes.slug}`}>
                  Lire aussi
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .article-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f4f4f4;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .banner {
          position: relative;
          padding: 20px;
          color: white;
          border-radius: 8px 8px 0 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 200px; /* Hauteur ajustée pour contenir le titre et la date */
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
          position: absolute;
          bottom: 40px; /* Positionné au bas avec un espace ajusté */
          left: 20px; /* Aligné à gauche avec un espace ajusté */
        }

        .date {
          font-size: 1rem;
          color: #ffffff;
          margin: 0;
          position: absolute;
          bottom: 20px; /* Positionné au bas avec un espace ajusté */
          right: 20px; /* Aligné à droite avec un espace ajusté */
        }

        .content-container {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .image-container {
          text-align: center;
        }

        .article-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .content {
          font-size: 1rem;
          line-height: 1.6;
          margin-top: 20px;
        }

        .related-posts {
          margin-top: 40px;
        }

        .related-posts-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .title-first-letter {
          color: #0070f3;
        }

        .title-rest {
          color: #000;
        }

        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
          max-width: 300px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card-image-container {
          position: relative;
          width: 100%;
          height: 180px;
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
          margin-bottom: 10px;
        }

        .read-more-button {
          display: inline-block;
          font-size: 0.9rem;
          color: #0070f3;
          text-decoration: none;
          border: 1px solid #0070f3;
          border-radius: 4px;
          padding: 5px 10px;
          transition: background-color 0.3s, color 0.3s;
        }

        .read-more-button:hover {
          background-color: #0070f3;
          color: white;
        }
      `}</style>
    </Layout>
  );
};

export default ArticlePage;
