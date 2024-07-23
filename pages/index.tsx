import React from "react";
import 'tailwindcss/tailwind.css';
import Posts from "../src/app/components/Posts";
import PushUpContainer from "../src/app/components/PushUpContainer";
import ContainerJumelage from "../src/app/components/ContainerJumelage";
import Banner from "../src/app/components/Banner";
import SocialMediaContainer from "../src/app/components/SocialMediaContainer";
import Navbar from "../src/app/components/Navbar";
import Footer from "../src/app/components/Footer";
import Macaron from "../src/app/components/Macaron"; // Importer le composant Macaron

// Définition du type pour les props
type PostType = {
  id: number;
  attributes: {
    title: string;
    resume: any[];
    publishedAt: string;
    image?: {
      data?: {
        attributes?: {
          formats?: {
            small?: {
              url: string;
            };
          };
          url?: string;
          alternativeText?: string;
        };
      };
    };
    slug: string;
  };
};

type Props = {
  posts: PostType[];
};

const Home: React.FC<Props> = ({ posts }) => {
  const parseDate = (dateString: string) => {
    const parts = dateString.split("-");
    return Date.parse(`${parts[0]}-${parts[1]}-${parts[2]}`);
  };

  const sortedPosts = posts.sort((a, b) => {
    return parseDate(b.attributes.publishedAt) - parseDate(a.attributes.publishedAt);
  });

  const latestPosts = sortedPosts.slice(0, 3);

  return (
    <div className="App">
      <Navbar />

      <div className="w-full h-100 bg-banner-bg mb-20">
        <div className="flex flex-wrap gap-10 justify-center mb-10 mx- mt-5">
          <Banner />
        </div>
        <div className="flex flex-wrap gap-10 justify-center mb-5 mx-6 mt-5">
          <PushUpContainer />
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-center mb-10 mx-4 mt-5">
        <ContainerJumelage />
      </div>

      {/* Conteneur des Posts */}
      <div className="mx-auto px-6 py-8 max-w-4xl bg-white border border-gray-300 shadow-md rounded-lg mb-16">
        <h1 className="text-4xl font-normal mb-8 text-BluFil text-center">
          <span className="text-redF">L</span>es derniers articles
        </h1>
        <div className="mt-8 flex flex-col gap-8">
          <Posts posts={latestPosts} />
        </div>
      </div>

      {/* Conteneur des Réseaux Sociaux */}
      <div className="flex justify-center mb-16">
        <div>
          <SocialMediaContainer />
        </div>
      </div>

      <Footer />

      {/* Ajouter le Macaron */}
      <Macaron />
    </div>
  );
};

export async function getServerSideProps() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Utilisez NEXT_PUBLIC_API_URL

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
        posts: data.data || [],
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default Home;
