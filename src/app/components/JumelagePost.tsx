import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface ImageAttributes {
  url: string;
  alternativeText?: string;
}

interface DataAttributes {
  titre: string;
  date: string;
  Texte: string;
  Image: {
    data: Array<{
      attributes: ImageAttributes;
    }>;
  };
}

interface ApiResponse {
  data: Array<{
    id: number;
    attributes: DataAttributes;
  }>;
}

// Styles
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Banner = styled.div`
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  color: #333;
  font-size: 1.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 10px;
`;

const Date = styled.p`
  color: #888;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin: 20px 0;
`;

const TextContent = styled.div`
  line-height: 1.6;
`;

const RelatedArticles = styled.div`
  margin-top: 40px;
`;

const RelatedTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const ArticleCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 4px solid #4a90e2;
`;

const ArticleContent = styled.div`
  padding: 15px;
`;

const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ReadMoreButton = styled.a`
  display: block;
  text-align: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Composant principal
const JumelagePost: React.FC = () => {
  const [data, setData] = useState<DataAttributes | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<DataAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError('URL de l\'API non définie');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${apiUrl}/jumelage-scolaires?populate=Image`);
        setData(response.data.data[0].attributes); // Adaptez selon la structure des données de votre API
        setRelatedArticles(response.data.data); // Mettre à jour les articles recommandés
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue : {error}</p>;

  return (
    <Container>
      <Banner>
        <BackButton onClick={() => window.history.back()}>‹</BackButton>
        {data?.titre}
      </Banner>
      <Content>
        <Title>{data?.titre}</Title>
        <Date>Date : {data?.date}</Date>
        {data?.Image.data.length > 0 && (
          <Image 
            src={`${process.env.NEXT_PUBLIC_API_URL}${data.Image.data[0].attributes.url}`} 
            alt={data.Image.data[0].attributes.alternativeText || 'Image'} 
          />
        )}
        <TextContent dangerouslySetInnerHTML={{ __html: data?.Texte || '' }} />
      </Content>
      <RelatedArticles>
        <RelatedTitle>À consulter aussi</RelatedTitle>
        <ArticlesContainer>
          {relatedArticles
            .filter(article => article.attributes.titre !== data?.titre) // Exclure l'article actuel
            .map(article => {
              const articleImage = article.attributes.Image.data[0]?.attributes.url
                ? `${process.env.NEXT_PUBLIC_API_URL}${article.attributes.Image.data[0].attributes.url}`
                : '';

              return (
                <ArticleCard key={article.id}>
                  {articleImage && <ArticleImage src={articleImage} alt={article.attributes.titre} />}
                  <ArticleContent>
                    <ArticleTitle>{article.attributes.titre}</ArticleTitle>
                    <BannerButton href={`/articles/${article.attributes.slug}`}>
  Lire plus
</BannerButton>
                  </ArticleContent>
                </ArticleCard>
              );
            })}
        </ArticlesContainer>
      </RelatedArticles>
    </Container>
  );
};

export default JumelagePost;
