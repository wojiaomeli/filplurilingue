import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  objectID: string;
  title?: string;
  slug: string; // Assurez-vous que le slug est disponible
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erreur de réseau: ${errorMessage}`);
      }

      const data = await response.json();
      setResults(data || []);
    } catch (error: any) {
      setError(error.message);
      console.error('Erreur lors de la recherche:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="search-page">
      <h1 className="title">Cherchez des articles</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>

      <div className="results">
        {error && <p className="error-message">{error}</p>}
        {query.length > 2 && results.length === 0 && !loading && <p>Aucun résultat trouvé</p>}
        {results.map((hit) => (
          <div key={hit.objectID} className="hit-item">
            <h2>{hit.title || 'Titre non disponible'}</h2>
            <Link href={`/detail-article-search/${hit.slug}`}>
              Lire l'article
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .search-page {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .search-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          padding: 10px;
          border-radius: 5px;
          background: transparent; /* Changer à transparent */
          box-shadow: none; /* Enlever l'ombre */
        }

        .search-bar input {
          width: 100%;
          max-width: 400px;
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .search-bar input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(38,143,255,0.2);
        }

        .search-bar button {
          padding: 12px 20px;
          font-size: 1rem;
          margin-left: 10px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .search-bar button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .search-bar button:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .search-bar button:focus {
          outline: none;
        }

        .results {
          margin-top: 20px;
        }

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

        .error-message {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
