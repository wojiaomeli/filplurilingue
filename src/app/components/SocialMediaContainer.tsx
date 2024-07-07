import React, { useEffect } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin: 40px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;

  /* Media query pour rendre le contenu responsive */
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: rgba(3, 112, 225, 1);
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  &::first-letter {
    color: red;
    font-size: 3rem;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;

  /* Media query pour rendre le contenu responsive */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeedWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  min-width: 300px;

  /* Media query pour rendre le contenu responsive */
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FacebookContainer = styled.div`
  background-color: #3b5998; /* Couleur de Facebook */
  color: white;
  padding: 10px 0; /* Ajuster le padding */
  display: flex;
  align-items: center;
  overflow-x: auto; /* Permet le scroll horizontal */
  margin-bottom: 20px;
  max-width: 100%; /* Occupe toute la largeur */

  /* Media query pour rendre le contenu responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const FacebookEmbed = styled.iframe`
  border: none;
  width: 500px; /* Largeur fixe des publications */
  height: 600px;
  margin-right: 20px; /* Espacement entre les publications */

  /* Media query pour rendre le contenu responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

const SocialFeedContainer = () => {
  useEffect(() => {
    // Charger le script du SDK Facebook
    const facebookScript = document.createElement('script');
    facebookScript.src = 'https://connect.facebook.net/en_US/sdk.js';
    facebookScript.async = true;
    facebookScript.defer = true;
    facebookScript.crossOrigin = 'anonymous';
    facebookScript.onload = () => {
      console.log('Facebook script loaded');
      if (window.FB) {
        window.FB.init({
          appId: 'YOUR_APP_ID', // Remplacer par votre App ID Facebook
          xfbml: true,
          version: 'v10.0'
        });
        window.FB.XFBML.parse();
      } else {
        console.error('Failed to initialize Facebook SDK');
      }
    };
    facebookScript.onerror = () => {
      console.error('Failed to load Facebook script');
    };
    document.body.appendChild(facebookScript);

    // Cleanup script when component unmounts
    return () => {
      if (facebookScript) {
        document.body.removeChild(facebookScript);
      }
    };
  }, []);

  return (
    <MainContainer>
      <Title>Le fil plurilingue sur les réseaux sociaux</Title>
      <SocialContainer>
        <FeedWrapper>
          <div
            className="fb-page"
            data-href="https://www.facebook.com/lefilplurilingue"
            data-tabs="timeline"
            data-width="500"
            data-height="600"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true">
            <blockquote
              cite="https://www.facebook.com/lefilplurilingue"
              className="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/lefilplurilingue">Le Fil Plurilingue</a>
            </blockquote>
          </div>
        </FeedWrapper>
      </SocialContainer>
    </MainContainer>
  );
};

export default SocialFeedContainer;
