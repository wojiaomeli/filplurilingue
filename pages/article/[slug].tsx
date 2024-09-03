import React, { useState, useEffect } from 'react'; // Import React
import { useRouter } from 'next/router';
import Layout from '../../src/app/components/Layout';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
          setArticle(articleAttributes);
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
      <div style={styles.articlePage}>
        <div style={{ ...styles.banner, backgroundColor: getCategoryColor(category) }}>
          <h1 style={styles.title}>{article.title || 'Titre non disponible'}</h1>
          <p style={styles.date}>{new Date(article.Date).toLocaleDateString() || 'Date non disponible'}</p>
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.imageContainer}>
            <img
              style={styles.articleImage}
              src={`${process.env.NEXT_PUBLIC_API_URL}${article.image?.data[0]?.attributes?.url}` || '/default-image.jpg'}
              alt={article.image?.data[0]?.attributes?.alternativeText || 'Image de l\'article'}
            />
          </div>

          {/* Affichage du contenu de l'article en Markdown */}
          <div style={styles.content}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (props) => <Heading level={1} {...props} />,
                h2: (props) => <Heading level={2} {...props} />,
                h3: (props) => <Heading level={3} {...props} />,
                h4: (props) => <Heading level={4} {...props} />,
                h5: (props) => <Heading level={5} {...props} />,
                h6: (props) => <Heading level={6} {...props} />,
                // Ajouter d'autres composants si nécessaire pour le rendu Markdown
              }}
            >
              {article.article || ''}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div style={styles.relatedPosts}>
        <h2 style={styles.relatedPostsTitle}>
          <span style={styles.titleFirstLetter}>À</span>
          <span style={styles.titleRest}> consulter aussi</span>
        </h2>
        <div style={styles.cardsContainer}>
          {relatedPosts.map((post: any) => (
            <div key={post.id} style={styles.card}>
              <div style={styles.cardImageContainer}>
                <img
                  style={styles.cardImage}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${post.attributes.image?.data[0]?.attributes?.url}` || '/default-image.jpg'}
                  alt={post.attributes.image?.data[0]?.attributes?.alternativeText || 'Image de l\'article'}
                />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{post.attributes.title || 'Titre non disponible'}</h3>
                <Link href={`/article/${post.attributes.slug}`} legacyBehavior>
                  <a style={styles.readMoreButton}>Lire aussi</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  articlePage: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  banner: {
    position: 'relative',
    padding: '20px',
    color: 'white',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '200px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  date: {
    fontSize: '1rem',
    marginTop: '10px',
  },
  contentContainer: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    textAlign: 'center',
    margin: '20px 0',
  },
  articleImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  content: {
    lineHeight: 1.8,
    fontSize: '1.1rem',
    color: '#333',
  },
  relatedPosts: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginTop: '30px',
  },
  relatedPostsTitle: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFirstLetter: {
    color: '#e5054a',
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  titleRest: {
    color: '#0370e1',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    marginLeft: '8px',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '250px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: '100%',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  readMoreButton: {
    display: 'inline-block',
    padding: '8px 16px',
    fontSize: '0.9rem',
    color: '#fff',
    backgroundColor: '#0370e1',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default ArticlePage;
