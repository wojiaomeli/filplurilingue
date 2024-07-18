import BannerPage from "../src/app/components/BannerPage";
import Layout from "../src/app/components/Layout";
import PostsPays from "../src/app/components/PostsPays";

export default function Pays() {
  return (
    <div>
      <Layout>
        <div>
          <BannerPage title="Dispositif par pays"  color="rgba(55, 53, 152, 1)" />
        </div>
      <div>
        <PostsPays/>
      </div>
      </Layout>
    </div>
  );
}
