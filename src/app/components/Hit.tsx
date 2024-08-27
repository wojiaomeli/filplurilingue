import React from 'react';
import Link from 'next/link';

interface HitProps {
  hit: {
    objectID: string;
    title?: string;
  };
}

const Hit: React.FC<HitProps> = ({ hit }) => (
  <div className="hit-item">
    <Link href={`/articles/${hit.objectID}`}>
      <h2>{hit.title || 'Titre non disponible'}</h2>
    </Link>
    <style jsx>{`
      .hit-item {
        border-bottom: 1px solid #ddd;
        padding: 15px;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .hit-item:hover {
        background: #f9f9f9;
      }

      .hit-item h2 {
        font-size: 1.2rem;
        margin: 0 0 10px;
        color: #333;
      }
    `}</style>
  </div>
);

export default Hit;
