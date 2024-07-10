import ContactForm from "../src/app/components/ContactForm";
import Layout from "../src/app/components/Layout"; // Assurez-vous que l'importation est correcte avec une majuscule sur "Layout"

export default function ContactPage() {
  return (
    <Layout>
      <ContactForm />
    </Layout>
  );
}

// Cette fonction permet de pré-rendre la page côté serveur
export async function getServerSideProps() {
  // Vous pouvez ajouter ici la logique pour récupérer des données côté serveur, par exemple :
  // const someData = await fetch('https://example.com/api/data');
  
  // Retournez les données récupérées comme props pour la page
  return {
    props: {
      // data: someData,
    },
  };
}
