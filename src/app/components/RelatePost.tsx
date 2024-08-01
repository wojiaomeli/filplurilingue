import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PostAttributes } from '../../../lib/FetchPost';

interface RelatPostProps {
  categoryId: number;
  currentPostSlug: string;
}

const RelatPost: React.FC<RelatPostProps> = ({ categoryId, currentPostSlug }) => {
  const [relatedPosts, setRelatedPosts] = useState<PostAttributes[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[categorie][id][$eq]=${categoryId}&filters[slug][$ne]=${currentPostSlug}&populate=image&pagination[limit]=5&sort[createdAt]=desc`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRelatedPosts(data.data.map((post: any) => post.attributes));
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };

    fetchRelatedPosts();
  }, [categoryId, currentPostSlug]);

  return (
    <div className="related-posts">
      <h2 className="related-posts-title">
        <span className="title-first-letter">A</span>
        <span className="title-rest"> consulter aussi</span>
      </h2>
      <div className="related-posts-container">
        {relatedPosts.map((post) => (
          <div key={post.slug} className="related-post-card">
            {post.image?.data?.[0]?.attributes?.url && (
              <div className="related-post-image-container">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${post.image.data[0].attributes.url}`}
                  alt={post.image.data[0].attributes.alternativeText || 'Image de l\'article'}
                  className="related-post-image"
                />
              </div>
            )}
            <h3>{post.title}</h3>
            <Link href={`/article/${post.slug}`} passHref>
              <div className="read-more-button">Lire plus</div>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .related-posts {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          margin-top: 40px;
        }
        .related-posts-title {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 20px;
        }
        .title-first-letter {
          color: rgba(229, 7, 73, 1);
        }
        .title-rest {
          color: rgba(3, 112, 225, 1);
        }
        .related-posts-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .related-post-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          background-color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .related-post-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .related-post-image-container {
          width: 100%;
          height: 150px;
          overflow: hidden;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .related-post-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        h3 {
          margin: 10px 0;
          font-weight: bold;
        }
        .read-more-button {
          color: #0070f3;
          text-decoration: none;
          font-weight: bold;
          position: relative;
          padding: 6px 12px;
          font-size: 0.875rem; /* Taille réduite du texte */
          border: 2px solid rgba(229, 7, 73, 1);
          border-radius: 4px;
          transition: color 0.3s ease, background-color 0.3s ease;
          cursor: pointer;
          display: inline-block;
          margin-top: auto; /* Pushes button to the bottom of the card */
        }
        .read-more-button::after {
          content: '';
          display: block;
          height: 2px;
          background-color: rgba(229, 7, 73, 1);
          width: 100%;
          position: absolute;
          bottom: -4px;
          left: 0;
          transition: transform 0.3s ease;
          transform: scaleX(0);
          transform-origin: bottom right;
        }
        .read-more-button:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .read-more-button:hover {
          color: rgba(229, 7, 73, 1);
          background-color: rgba(229, 7, 73, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RelatPost;
