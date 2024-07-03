import BannerPage from "../src/app/components/BannerPage";
import Layout from "../src/app/components/layout";

export default function Pays() {
  return (
    <div>
      <Layout>
        <div>
          <BannerPage title="Dispositif par pays"  color="rgba(55, 53, 152, 1)" />
        </div>
        <h1>Pays hello !</h1>
      </Layout>
    </div>
  );
}
