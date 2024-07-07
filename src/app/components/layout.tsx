import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Faire en sorte que le contenu occupe au minimum toute la hauteur de la vue */
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      {children}
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
