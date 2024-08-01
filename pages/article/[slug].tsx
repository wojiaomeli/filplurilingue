import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { fetchPostBySlug } from '../../lib/FetchPost';
import Image from 'next/image';
import Layout from '../../src/app/components/Layout'; // Assurez-vous que le chemin est correct
import React from 'react';
import RelatPost from '../../src/app/components/RelatePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface PostAttributes {
  title: string;
  accecibility?: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Date: string;
  contenent: {
    type: string;
    children: { type: string; text: string }[];
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
}

interface Props {
  post: PostAttributes | null;
}

const PostPage: NextPage<Props> = ({ post }) => {
  const router = useRouter();

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
    position: 'relative' as const
  };

  const imageContainerStyle = {
    width: '60%',
    maxWidth: '600px',
    margin: '20px auto',
    position: 'relative' as const,
    height: 'auto',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover' as const,
    borderRadius: '8px'
  };

  const contentStyle = {
    width: '90%',
    maxWidth: '1000px',
    margin: '0 auto',
    lineHeight: '1.6',
    padding: '0 20px'
  };

  const paragraphStyle = {
    marginBottom: '20px'
  };

  const headingStyle = {
    marginTop: '30px',
    marginBottom: '15px',
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    color: '#555555'
  };

  const titleTextStyle = {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    margin: '0'
  };

  // Styles pour le bouton de retour
  const backButtonStyle = {
    position: 'absolute' as const,
    top: '20px',
    left: '20px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0', // Fond gris clair
    border: '2px solid #cccccc', // Bordure légère
    borderRadius: '8px', // Coins légèrement arrondis
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px', // Largeur du bouton
    height: '60px', // Hauteur du bouton
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    fontSize: '1.5rem', // Taille de l'icône
    transition: 'background-color 0.3s, box-shadow 0.3s', // Transition pour les effets de survol
    backgroundColor: '#ffffff', // Fond blanc pour le bouton
    border: '2px solid #cccccc', // Bordure gris clair
  };

  const backButtonHoverStyle = {
    backgroundColor: '#e0e0e0', // Fond gris clair en survol
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Ombre plus prononcée au survol
  };

  // Fonction pour parser le contenu HTML et le convertir en éléments React
  const parseContent = (contenent: any) => {
    return contenent?.map((section: any, index: number) => {
      if (section.type === 'paragraph') {
        return <p key={index} style={paragraphStyle}>{section.children.map((child: any) => child.text).join('')}</p>;
      } else if (section.type === 'heading' && section.level === 2) {
        // Titre de niveau 2 (sous-titre)
        return <h2 key={index} style={headingStyle}>{section.children.map((child: any) => child.text).join('')}</h2>;
      }
      return null;
    });
  };

  return (
    <Layout>
      <div style={{ position: 'relative' }}>
        {/* Bouton de retour */}
        <button 
          onClick={() => router.back()} 
          style={backButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = backButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          onFocus={(e) => e.currentTarget.style.backgroundColor = backButtonHoverStyle.backgroundColor}
          onBlur={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <FontAwesomeIcon icon={faArrowLeft} color="#333" />
        </button>
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
              height={300}
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
        {post.categorie?.data?.id && (
          <RelatPost
            categoryId={post.categorie.data.id}
            currentPostSlug={post.slug}
          />
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
