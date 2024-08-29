import React from 'react';
import Layout from '../src/app/components/Layout'; // Assurez-vous que le chemin est correct
import BackButton from '../src/app/components/BackButton'; 

const Apropos: React.FC = () => {
  return (
    <Layout>
      <div>
        <div className="banner">
          <BackButton className="back-button" />
          <h1 className="banner-title">À propos</h1>
        </div>
        <div className="container">
          <div className="content">
            <p className="paragraph">
              Le fil plurilingue est géré et animé par le département langue française de France Éducation international en lien avec ses partenaires, dans le cadre du Comité scientifique du site, composé des acteurs institutionnels, universitaires, associatifs et média qui œuvrent pour la promotion et la diffusion de l'enseignement bi-plurilingue.
            </p>

            <h2 className="section-title">Ligne éditoriale</h2>
            <p className="paragraph">
              Le fil plurilingue propose une ligne éditoriale axée sur la promotion de la didactique intégrée, que l’on retrouve dans l’approche appelée CLIL / EMILE, et notamment de l’usage de la langue(s) dite(s) “maternelle(s)” des apprenants en classe de discipline dispensée en français. Le site est ouvert à la pluralité des approches méthodologiques et des contextes.
            </p>
            <p className="paragraph">
              Le site met à disposition des ressources gratuites et accessibles à tous, telles que des outils méthodologiques pour les enseignants de disciplines non linguistiques, des infographies et des argumentaires, ainsi que des informations sur les sections bilingues francophones.
            </p>

            <h2 className="section-title">Dans la presse</h2>
            <ul className="list">
              <li className="list-item">
                <a href="#" target="_blank" rel="noopener noreferrer" className="link">
                  Le français dans le monde n°439, mars-avril 2022 : "Le fil plurilingue vous donne rendez-vous en 2022 !" (Télécharger le PDF)
                </a>
              </li>
              <li className="list-item">
                <a href="#" target="_blank" rel="noopener noreferrer" className="link">
                  Le français dans le monde n°436, septembre-octobre 2021 : "Le fil plurilingue : 18 mois déjà !" (Télécharger le PDF)
                </a>
              </li>
            </ul>

            <h2 className="section-title">Comité de direction</h2>
            <p className="paragraph">
              Le comité de direction supervise les activités du Fil plurilingue et assure la qualité des contenus. Pour plus d'informations, veuillez consulter la page dédiée sur notre site.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner {
          background-color: #0275d8;
          color: white;
          padding: 15px 20px;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          box-sizing: border-box;
        }

        .back-button {
          margin-right: 15px;
        }

        .banner-title {
          margin: 0;
          font-size: 1.8em;
          flex: 1;
          text-align: center;
        }

        .container {
          margin: 0 auto;
          max-width: 800px;
          padding: 20px;
          background: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          box-sizing: border-box;
        }

        .content {
          text-align: left;
        }

        .section-title {
          font-size: 1.6em;
          margin-top: 20px;
          border-bottom: 2px solid #0275d8;
          padding-bottom: 5px;
          font-weight: bold;
        }

        .paragraph {
          margin: 15px 0;
          line-height: 1.6;
          font-size: 1em;
        }

        .link {
          color: #0275d8;
          text-decoration: none;
          font-weight: bold;
        }

        .link:hover {
          text-decoration: underline;
        }

        .list {
          padding-left: 20px;
        }

        .list-item {
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default Apropos;
