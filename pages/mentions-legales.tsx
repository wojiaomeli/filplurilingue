import React from 'react';
import Layout from '../src/app/components/Layout'; // Assurez-vous que le chemin vers votre composant Layout est correct

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    maxWidth: '800px',
    backgroundColor: '#fffff',
    borderRadius: '8px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'justify',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  logo: {
    width: '200px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2em',
    marginBottom: '10px',
    color: 'rgba(3, 112, 225, 1)',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '1.2em',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginBottom: '10px',
    lineHeight: '1.6',
    color: '#555',
  },
};

const LegalNotice: React.FC = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.header}>
          <img 
            src="/assets/fei logotype.svg" 
            alt="Logo" 
            style={styles.logo}
          />
          <h1 style={styles.title}>Mentions Légales</h1>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Informations générales</h2>
          <p style={styles.paragraph}>
            Le présent site est édité par [Nom de l'entreprise], [forme juridique] au capital de [X] €, immatriculée au Registre du Commerce et des Sociétés de [Ville] sous le numéro [numéro RCS], dont le siège social est situé [adresse du siège social].
          </p>
          <p style={styles.paragraph}>
            Directeur de la publication : [Nom du directeur de la publication], en qualité de [fonction].
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Adresse du Siège Social et Raison Sociale</h2>
          <p style={styles.paragraph}>
            <strong>Raison sociale :</strong> Centre international d'études pédagogiques, établissement public administratif
          </p>
          <p style={styles.paragraph}>
            <strong>Personnalité morale :</strong> Établissement public national à caractère administratif sous tutelle du ministère de l’Éducation nationale.
          </p>
          <p style={styles.paragraph}>
            <strong>Adresse du siège social :</strong> 1, avenue Léon Journault
92318 Sèvres cedex
          </p>
          <p style={styles.paragraph}>
            Téléphone : 01 45 07 60 00
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Hébergement</h2>
          <p style={styles.paragraph}>
            Le site est hébergé par France Education International, dont le siège social est situé à CIEP 1, avenue Léon Journault
            92318 Sèvres cedex.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Propriété intellectuelle</h2>
          <p style={styles.paragraph}>
            L'ensemble des éléments graphiques, la structure et, plus généralement, le contenu du site sont protégés par le droit d'auteur, le droit des marques et le droit des dessins et modèles.
          </p>
          <p style={styles.paragraph}>
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit du Fil Plurilingue et de France Education International.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Données personnelles</h2>
          <p style={styles.paragraph}>
            Conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données vous concernant. Pour exercer ce droit, veuillez contacter le Fil Plurilingue à l'adresse suivante : filplurilingue@gmail.com.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Cookies</h2>
          <p style={styles.paragraph}>
            Le site peut collecter automatiquement des informations standards telles que votre navigateur, votre adresse IP, et des informations sur les pages que vous consultez. Toutes les informations collectées indirectement ne seront utilisées que pour suivre le volume, le type et la configuration du trafic utilisant ce site, pour en développer la conception et l'agencement et à d'autres fins administratives et de planification.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>7. RGPD et traitement des données</h2>
          <p style={styles.paragraph}>
            Conformément au Règlement Général sur la Protection des Données (RGPD), nous vous informons que les données personnelles collectées sur ce site font l'objet d'un traitement automatisé pour les finalités suivantes :  facilitation du jumelage scolaire, gestion des contacts, et communication avec les établissements partenaires.
        
          </p>
          <p style={styles.paragraph}>
            Les données collectées sont destinées à France Education International et ne seront en aucun cas transmises à des tiers sans votre consentement préalable, sauf obligation légale.
          </p>
          <p style={styles.paragraph}>
            Vous disposez d'un droit d'accès, de rectification, de suppression, d'opposition et de portabilité de vos données, que vous pouvez exercer en nous contactant à l'adresse suivante : filplurilingue@gmail.com.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Contact</h2>
          <p style={styles.paragraph}>
            Pour toute question ou information sur les mentions légales, vous pouvez nous contacter à l'adresse suivante : filplurilingue@gmail.com .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNotice;
