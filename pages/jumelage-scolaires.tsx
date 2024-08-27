import { useEffect, useState } from 'react';  // Importation des hooks React
import Layout from '../src/app/components/Layout';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Styles
const Banner = styled.div`
  background-color: rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */
  color: white;
  padding: 20px 30px;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 15px 20px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 1rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  outline: none; /* Remove default focus outline */
  
  &:focus {
    outline: 2px solid rgba(3, 112, 225, 1); /* Custom focus style */
  }

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }

  &:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
`;

const MainContent = styled.div`
  padding: 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Subtitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

const HorizontalBanner = styled.div`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
`;

const BannerTitleSection = styled.h2`
  font-size: 2rem;
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    padding-bottom: 15px;
  }
`;

const RedText = styled.span`
  color: rgba(229, 7, 73, 1);
`;

const BlueText = styled.span`
  color: rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */
`;

const BannerContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start; /* Align cards to the top */
`;

const BannerCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  width: 280px; /* Smaller fixed width for more cards in a row */
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px; /* Adjusted height for more compact cards */
  background-color: #f5f5f5; /* Light background around the image */
  padding: 10px; /* Padding around the image */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the area */
`;

const BlueLine = styled.div`
  height: 2px; /* Thinner line */
  background-color: rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */
  width: 100%; /* Full width of the card */
  margin-top: 10px; /* Space between image and line */
  margin-bottom: 10px; /* Space between the line and title */
`;

const BannerContentWrapper = styled.div`
  padding: 15px 0;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BannerTitle = styled.h3`
  font-size: 0.875rem; /* Thinner and smaller font size */
  color: #333;
  margin: 0;
  font-weight: 400;
  margin-bottom: 10px;
`;

const BannerButton = styled.a`
  background-color: rgba(3, 112, 225, 1); /* Utilisation de la couleur bleu de la charte */
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block; /* Align to the start */
  margin-top: 10px; /* Add space between text and button */

  &:hover {
    background-color: rgba(2, 85, 179, 1); /* Slightly darker on hover */
  }
`;

export default function JumelagePost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jumelage-scolaires?populate=Image`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        const articles = result.data;

        setData(articles[0]); // Main article
        setRelatedArticles(articles.slice(1)); // Remaining articles as related
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const { titre, Texte, Image } = data.attributes || {};
  const imageUrls = Image?.data?.map(img => `${process.env.NEXT_PUBLIC_API_URL}${img.attributes.url}`) || [];

  return (
    <Layout>
      <Banner>
        <BackButton onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        {titre}
      </Banner>
      <PageContainer>
        <MainContent>
          <ReactMarkdown
            children={Texte || ""}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ node, ...props }) => <Subtitle {...props} />,
            }}
          />
          {imageUrls.length > 0 && (
            <ImageContainer>
              {imageUrls.map((url, index) => (
                <StyledImage
                  key={index}
                  src={url}
                  alt={`Image ${index}`}
                />
              ))}
            </ImageContainer>
          )}
        </MainContent>
        <HorizontalBanner>
          <BannerTitleSection>
            <RedText>À</RedText> <BlueText>consulter aussi</BlueText>
          </BannerTitleSection>
          <BannerContent>
            {relatedArticles.map((article) => {
              const articleImageUrl = article.attributes.Image?.data?.[0]
                ? `${process.env.NEXT_PUBLIC_API_URL}${article.attributes.Image.data[0].attributes.url}`
                : null;

              return (
                <BannerCard key={article.id}>
                  <ImageWrapper>
                    {articleImageUrl && <BannerImage src={articleImageUrl} alt={`Image de ${article.attributes.titre}`} />}
                  </ImageWrapper>
                  <BlueLine />
                  <BannerContentWrapper>
                    <BannerTitle>{article.attributes.titre}</BannerTitle>
                    <BannerButton href={`/article-jumelage/${article.id}`}>
                      Lire plus
                    </BannerButton>
                  </BannerContentWrapper>
                </BannerCard>
              );
            })}
          </BannerContent>
        </HorizontalBanner>
      </PageContainer>
    </Layout>
  );
}
