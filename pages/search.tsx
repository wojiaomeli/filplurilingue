import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../src/app/components/Layout'; // Assurez-vous d'importer correctement le Layout

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
    <Layout>
      <div className="search-page">
        <h1 className="title">Recherchez des articles</h1>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Entrez votre recherche..."
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
              <Link className="read-more" href={`/article-search/${hit.slug}`}>
               Lire l'article
              </Link>
            </div>
          ))}
        </div>

        <style jsx>{`
          .search-page {
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
            background: #f7f9fc;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .title {
            font-size: 2.2rem;
            font-weight: 600;
            color: #333;
            text-align: center;
            margin-bottom: 24px;
          }

          .search-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            padding: 10px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .search-bar input {
            flex: 1;
            padding: 12px;
            font-size: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
          }

          .search-bar input:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.2);
          }

          .search-bar button {
            padding: 12px 20px;
            font-size: 1rem;
            border: none;
            border-radius: 8px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .search-bar button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .search-bar button:not(:disabled):hover {
            background-color: #0056b3;
          }

          .results {
            margin-top: 20px;
          }

          .hit-item {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 15px;
            margin-bottom: 10px;
            transition: background-color 0.3s, transform 0.3s;
          }

          .hit-item:hover {
            background-color: #f1f3f5;
            transform: translateY(-2px);
          }

          .hit-item h2 {
            font-size: 1.2rem;
            margin: 0;
            color: #333;
          }

          .read-more {
            display: inline-block;
            margin-top: 10px;
            font-size: 0.9rem;
            color: #007bff;
            text-decoration: none;
            border: 1px solid #007bff;
            border-radius: 4px;
            padding: 8px 12px;
            transition: background-color 0.3s, color 0.3s;
          }

          .read-more:hover {
            background-color: #007bff;
            color: white;
          }

          .error-message {
            color: #e05d5d;
            text-align: center;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default SearchPage;
