import React, { useEffect } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin: 40px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
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
`;

const FeedWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  min-width: 300px;
`;

const SocialFeedContainer = () => {
  useEffect(() => {
    // Charger le script du widget Twitter
    const twitterScript = document.createElement('script');
    twitterScript.src = 'https://platform.twitter.com/widgets.js';
    twitterScript.async = true;
    twitterScript.onload = () => {
      console.log('Twitter script loaded');
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    };
    twitterScript.onerror = () => {
      console.error('Failed to load Twitter script');
    };
    document.body.appendChild(twitterScript);

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

    // Cleanup scripts when component unmounts
    return () => {
      if (twitterScript) {
        document.body.removeChild(twitterScript);
      }
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
          <a 
            className="twitter-timeline"
            data-width="100%"
            data-height="600"
            href="https://twitter.com/FilPluri">
            Tweets by @FilPluri
          </a>
        </FeedWrapper>
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
