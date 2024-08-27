import type { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';

// Remplacez ces valeurs par vos clés API Algolia
const ALGOLIA_APP_ID = 'XW6MYYNFSF'; // Remplacez par votre Algolia Application ID
const ALGOLIA_API_KEY = '4881f864f8df38e23e98c41c126905f8'; // Remplacez par votre Algolia API Key
const INDEX_NAME = 'posts'; // Assurez-vous que c'est le bon index

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(INDEX_NAME);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Query string is required' });
  }

  try {
    const { hits } = await index.search(query);
    res.status(200).json(hits);
  } catch (error) {
    console.error('Algolia search error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
