import { useEffect, useState } from "react";
import Layout from "../src/app/components/Layout";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Définir l'animation de fondu
const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  20% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
`;

// Conteneur principal
const MainContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
  }
`;

// Bannière stylisée
const Banner = styled.div`
  background-color: rgba(229, 7, 73, 1); /* Couleur de fond rouge */
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 15px;
  }
`;

// Bouton de retour stylisé
const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 1rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  transition: box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

// Sous-titre
const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-top: 15px;
    margin-bottom: 8px;
  }
`;

// Conteneur des logos
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
  }
`;

// Logo individuel
const Logo = styled.img`
  width: 150px;
  height: auto;
  animation: ${fadeInOut} 10s linear infinite;
  object-fit: contain;
  margin: 10px;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

export default function ComiteScientifique() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comites?populate=*`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        setData(result.data[0]); // Supposons que vous voulez le premier article
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

  const { titre, Presentation } = data.attributes;

  // Extraire les URLs des logos depuis la présentation et supprimer les balises d'image
  const extractImageUrlsAndRemoveFromText = (text) => {
    const regex = /!\[.*?\]\((.*?)\)/g;
    let match;
    const urls = [];
    let updatedText = text;
    while ((match = regex.exec(text)) !== null) {
      urls.push(match[1]);
      updatedText = updatedText.replace(match[0], ''); // Remplacer les balises d'image par une chaîne vide
    }
    return { urls, updatedText };
  };

  const { urls: logoUrls, updatedText: updatedPresentation } = extractImageUrlsAndRemoveFromText(Presentation);

  return (
    <Layout>
      <Banner>
        <BackButton onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        {titre}
      </Banner>
      <MainContainer>
        <div>
          <ReactMarkdown 
            children={updatedPresentation}
            rehypePlugins={[rehypeRaw]} 
            components={{
              h2: ({node, ...props}) => <Subtitle {...props} />, 
            }}
          />
        </div>
        <ImageContainer>
          {logoUrls.map((url, index) => (
            <Logo 
              key={index}
              src={url} 
              alt={`Logo ${index}`} 
            />
          ))}
        </ImageContainer>
      </MainContainer>
    </Layout>
  );
}
