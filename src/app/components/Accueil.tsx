// layout.tsx

import React from "react";
import 'tailwindcss/tailwind.css';
import Posts from "./Posts";
import Post from "./Post";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PushUpContainer from "./PushUpContainer";
import ContainerJumelage from "./ContainerJumelage";
import Banner from "./Banner";
import SocialMediaContainer from "./SocialMediaContainer"; // Mise à jour de l'importation

const Layout = () => {
  return (
    <div className="App">
      <div className="w-full h-100 bg-banner-bg mb-20">
        <div className="flex flex-wrap gap-10 justify-center mb-10 mx- mt-5">
          <Banner/>
        </div>
        <div className="flex flex-wrap gap-10 justify-center mb-5 mx-6 mt-5">
          <PushUpContainer/>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-center mb-10 mx-4 mt-5">
        <ContainerJumelage />
      </div>

      <Container className="border border-100 p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-normal mb-4 text-BluFil text-center p-4">
          <span className="text-redFil">L</span>es derniers articles
        </h1>
        <Router>
          <Routes>
            <Route path="/" exact component={Posts}></Route>
            <Route path="/Post/:id" component={Post}></Route>
          </Routes>
        </Router>
      </Container>
       
      <SocialMediaContainer /> {/* Ajout du composant SocialFeedContainer */}

    </div>
  );
}

export default Layout;
