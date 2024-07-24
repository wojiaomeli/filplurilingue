import { GetServerSideProps, NextPage } from 'next';
import { fetchPostBySlug } from '../Api';
import Image from 'next/image';
import Layout from '../../src/app/components/Layout'; // Assurez-vous que le chemin est correct
import React from 'react';

interface PostAttributes {
  title: string;
  contenent?: {
    type: string;
    children: { type: string; text: string }[];
    level?: number; // Niveau des titres, si disponible
  }[];
  image?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
        caption?: string;
        formats?: {
          thumbnail?: { url: string };
          small?: { url: string };
        };
      };
    }[];
  };
  categorie?: {
    data: {
      attributes: {
        nom: string;
      };
    };
  };
  slug: string;
  publishedAt?: string;
}

interface Props {
  post: PostAttributes | null;
}

const PostPage: NextPage<Props> = ({ post }) => {
  if (!post) {
    return <div>Article non trouvé</div>;
  }

  // Récupération des données de l'image
  const image = post.image?.data?.[0]?.attributes;
  const imageUrl = image ? `${process.env.NEXT_PUBLIC_API_URL}${image.formats?.small?.url || image.url}` : null;
  const imageAlt = image ? image.alternativeText || 'Image non disponible' : 'Image non disponible';

  // Définir la couleur du bandeau en fonction de la catégorie
  const getCategoryColor = (categoryName: string) => {
    const cleanCategoryName = categoryName.trim();
    switch (cleanCategoryName) {
      case 'Pays':
        return 'rgba(55, 53, 152, 1)';
      case 'Classe':
        return 'rgba(253, 205, 0, 1)';
      case 'Promotion':
        return 'rgba(126, 179, 1, 1)';
      case 'Méthodologie':
        return 'rgba(228, 0, 1, 1)';
      default:
        return 'rgba(228, 0, 1, 1)';
    }
  };

  const categoryName = post.categorie?.data?.attributes?.nom || 'Autre';
  const titleBackgroundColor = getCategoryColor(categoryName);

  // Styles CSS en ligne
  const titleContainerStyle = {
    backgroundColor: titleBackgroundColor,
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '20px',
    position: 'relative'
  };

  const imageContainerStyle = {
    width: '60%', // Réduit encore plus la largeur du conteneur de l'image
    maxWidth: '600px', // Ajuste la largeur maximale pour une image plus petite
    margin: '20px auto', // Centre l'image horizontalement
    position: 'relative',
    height: 'auto', // Hauteur automatique pour garder les proportions de l'image
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  const contentStyle = {
    width: '90%', // Augmente la largeur du conteneur de texte
    maxWidth: '1000px',
    margin: '0 auto',
    lineHeight: '1.6',
    padding: '0 20px' // Ajoute du padding autour du texte
  };

  const paragraphStyle = {
    marginBottom: '20px' // Ajoute un espace entre chaque paragraphe
  };

  const headingStyle = {
    marginTop: '30px', // Ajoute de l'espace avant les sous-titres
    marginBottom: '15px', // Ajoute de l'espace après les sous-titres
    fontSize: '1.5rem', // Ajuste la taille du texte pour les sous-titres
    fontWeight: 'bold'
  };

  const titleTextStyle = {
    fontSize: '2rem', // Réduit la taille du titre pour qu'il soit moins grand
    fontWeight: 'bold',
    margin: '0'
  };

  // Fonction pour parser le contenu HTML et le convertir en éléments React
  const parseContent = (contenent: any) => {
    return contenent?.map((section, index) => {
      if (section.type === 'paragraph') {
        return <p key={index} style={paragraphStyle}>{section.children.map(child => child.text).join('')}</p>;
      } else if (section.type === 'heading' && section.level === 2) {
        // Titre de niveau 2 (sous-titre)
        return <h2 key={index} style={headingStyle}>{section.children.map(child => child.text).join('')}</h2>;
      }
      return null;
    });
  };

  return (
    <Layout>
      <div style={titleContainerStyle}>
        <h1 style={titleTextStyle}>{post.title}</h1>
      </div>
      {imageUrl && (
        <div style={imageContainerStyle}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout="responsive"
            width={600}
            height={300} // Ajustez les dimensions selon les besoins
            style={imageStyle}
            placeholder="blur"
            blurDataURL="/default-image.png"
          />
        </div>
      )}
      <div style={contentStyle}>
        {post.contenent && post.contenent.length > 0 ? (
          parseContent(post.contenent)
        ) : (
          <p>Aucun contenu disponible</p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  if (typeof slug !== 'string') {
    return { props: { post: null } };
  }

  try {
    const post = await fetchPostBySlug(slug);

    return {
      props: {
        post: post || null,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: {
        post: null,
      },
    };
  }
};

export default PostPage;
