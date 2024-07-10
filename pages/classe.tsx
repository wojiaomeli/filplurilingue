import React from 'react';
import Layout from '../src/app/components/Layout';
import BannerPage from '../src/app/components/BannerPage';

const Classe = () => {
  return (
    <Layout>
      <div>
        <BannerPage title="Pour la classe" color="rgba(253, 205, 0, 1)">

        </BannerPage>
      </div>
      <h1>Classe hello !</h1>
    </Layout>
  );
};

export default Classe;
