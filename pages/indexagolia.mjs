import 'dotenv/config';
import algoliasearch from 'algoliasearch';
import fetch from 'node-fetch';

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'XW6MYYNFSF';
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || '4881f864f8df38e23e98c41c126905f8';
const INDEX_NAME = 'posts';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(INDEX_NAME);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  console.error("NEXT_PUBLIC_API_URL n'est pas défini.");
  process.exit(1);
}

const fetchAndIndexData = async (endpoint) => {
  try {
    const res = await fetch(`${apiUrl}/${endpoint}?populate=*`);
    if (!res.ok) {
      throw new Error(`Erreur HTTP pour ${endpoint} : ${res.status}`);
    }

    const data = await res.json();
    if (!data || !data.data) {
      throw new Error(`Les données de la réponse pour ${endpoint} ne sont pas au format attendu.`);
    }

    const records = data.data.map((item) => {
      const { id, attributes } = item;
      const { title, resume } = attributes;

      const resumeText = resume?.map((section) => section.children.map((child) => child.text).join(' ')).join(' ') || '';

      return {
        objectID: id,
        title: title,
        resume: resumeText,
      };
    });

    await index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
    console.log(`Données indexées avec succès pour ${endpoint} dans Algolia.`);
  } catch (error) {
    console.error("Erreur lors de l'indexation des données :", error);
  }
};

const main = async () => {
  await fetchAndIndexData('posts');
  // Ajoutez d'autres endpoints si nécessaire
};

main();
