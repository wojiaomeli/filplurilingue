import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/app/components/Layout';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<any>(null);
  const [category, setCategory] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      const fetchArticle = async () => {
        try {
          const articleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`);
          if (!articleResponse.ok) throw new Error('Erreur réseau');
          const articleData = await articleResponse.json();
          const articleAttributes = articleData.data[0]?.attributes;
          
          // Assurez-vous que `article.article` est une chaîne de caractères
          setArticle({
            ...articleAttributes,
            article: typeof articleAttributes.article === 'string' ? articleAttributes.article : ''
          });

          const currentCategory = articleAttributes.category?.data?.attributes?.nom || '';
          setCategory(currentCategory);

          const relatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[category][nom][$eq]=${currentCategory}&filters[slug][$ne]=${slug}&sort[createdAt]=desc&pagination[limit]=4&populate=*`);
          if (!relatedResponse.ok) throw new Error('Erreur réseau');
          const relatedData = await relatedResponse.json();
          setRelatedPosts(relatedData.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      };
      fetchArticle();
    }
  }, [slug]);

  if (!article) return <div>Chargement...</div>;

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Méthodologie': return '#e5054a';
      case 'Promotion': return '#7eb301';
      case 'Classe': return '#fdcd00';
      case 'Pays': return '#5d0073';
      default: return '#e5054a';
    }
  };

  return (
    <Layout>
      <div className="article-page">
        <div className="banner" style={{ backgroundColor: getCategoryColor(category) }}>
          <h1 className="title">{article.title}</h1>
          <p className="date">{new Date(article.Date).toLocaleDateString()}</p>
        </div>
        <div className="content-container">
          <div className="image-container">
            <img
              className="article-image"
              src={`${process.env.NEXT_PUBLIC_API_URL}${article.image?.data[0]?.attributes?.url}`}
              alt={article.image?.data[0]?.attributes?.alternativeText || 'Image de l\'article'}
            />
          </div>
          {/* Affichage du contenu Markdown */}
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="content">
            {article.article}
          </ReactMarkdown>
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
                <h3 className="card-title">{post.attributes.title}</h3>
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
          height: 200px;
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
        }

        .date {
          font-size: 1rem;
          margin-top: 10px;
        }

        .content-container {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .image-container {
          text-align: center;
          margin: 20px 0;
        }

        .article-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333;
        }

        .content h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0370e1;
        }

        .content h2 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0370e1;
        }

        .content h3 {
          font-size: 1.75rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0370e1;
        }

        .content h4 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0370e1;
        }

        .content h5 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0370e1;
        }

        .content h6 {
          font-size: 1rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0370e1;
        }

        .content p {
          margin: 0.5rem 0;
        }

        .content ul, .content ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .content li {
          margin-bottom: 0.5rem;
        }

        .related-posts {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          margin-top: 30px;
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

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .card-image-container {
          width: 100%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
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

export default ArticlePage;
