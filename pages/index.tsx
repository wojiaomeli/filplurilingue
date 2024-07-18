import React from "react";
import 'tailwindcss/tailwind.css';
import Posts from "../src/app/components/Posts";
import PushUpContainer from "../src/app/components/PushUpContainer";
import ContainerJumelage from "../src/app/components/ContainerJumelage";
import Banner from "../src/app/components/Banner";
import SocialMediaContainer from "../src/app/components/SocialMediaContainer";
import Container from "@mui/material/Container";
import { useRouter } from 'next/router'; // Utilisation de useRouter pour la gestion des routes Next.js
import Navbar from "../src/app/components/Navbar";
import Footer from "../src/app/components/Footer";

const Home = ({ posts }) => {
  // Fonction pour convertir la chaîne de date en millisecondes depuis Epoch
  const parseDate = (dateString) => {
    const parts = dateString.split("-");
    return Date.parse(`${parts[0]}-${parts[1]}-${parts[2]}`);
  };

  // Tri des posts par date de publication décroissante
  const sortedPosts = posts.sort((a, b) => {
    return parseDate(b.attributes.publishedAt) - parseDate(a.attributes.publishedAt);
  });

  // Récupération des trois derniers posts triés
  const latestPosts = sortedPosts.slice(0, 3);

  const router = useRouter();

  return (
    <div className="App">
       <Navbar/>
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
        <Posts posts={latestPosts} />
      </Container>
       
      <SocialMediaContainer />
      <Footer/>
    </div>
  );
};

export async function getServerSideProps() {
  const API_URL = process.env.REACT_APP_API_URL;
  
  try {
    const res = await fetch(`${API_URL}/api/posts?populate=*`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch a échoué avec le statut ${res.status}`);
    }

    const data = await res.json();

    return {
      props: {
        posts: data.data || [], // Assurez-vous que posts est initialisé avec un tableau vide par défaut
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    return {
      props: {
        posts: [], // Retourne un tableau vide en cas d'erreur
      },
    };
  }
}


export default Home;
