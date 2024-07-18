import BannerPage from "../src/app/components/BannerPage"; // Assurez-vous que l'importation est correcte avec une majuscule sur "BannerPage"
import Layout from "../src/app/components/Layout";

export default function MethodologiePage() {
  return (
    <Layout>
      <BannerPage title="Methodologie" color="rgba(229, 7, 73, 1)" />
      <h1>Methodologie hello !</h1>
    </Layout>
  );
}
