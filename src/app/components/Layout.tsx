import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;