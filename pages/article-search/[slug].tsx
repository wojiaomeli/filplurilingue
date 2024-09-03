import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/app/components/Layout';
import Link from 'next/link';

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
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

          const endpoints = [
            `${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
            `${process.env.NEXT_PUBLIC_API_URL}/api/jumelage-scolaires?filters[slug][$eq]=${slug}&populate=*`,
            `${process.env.NEXT_PUBLIC_API_URL}/api/temoignage-videos?filters[slug][$eq]=${slug}&populate=*`
          ];

          for (const endpoint of endpoints) {
            const response = await fetch(endpoint);
            const data = await response.json();

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

          const relatedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/${articleType}?filters[category][nom][$eq]=${currentCategory}&filters[slug][$ne]=${slug}&sort[createdAt]=desc&pagination[limit]=4&populate=*`;
          const relatedResponse = await fetch(relatedEndpoint);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
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
        return '#e5054a'; // red
      case 'Promotion':
        return '#7eb301'; // green
      case 'Classe':
        return '#fdcd00'; // yellow
      case 'Pays':
        return '#5d0073'; // purple
      default:
        return '#e5054a'; // default color
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
          justify-content: center;
          align-items: flex-start;
          height: 200px;
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
        }

        .date {
          font-size: 1rem;
          margin: 0;
        }

        .content-container {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: -10px;
          border-top: 4px solid #e6e6e6;
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
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
          max-width: 300px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card-image-container {
          position: relative;
          width: 100%;
          height: 180px;
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
