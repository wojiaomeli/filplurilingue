import React, { useEffect } from 'react';
import { AutoWriteText } from '../components/AutoWriteText';

const styles = {
  container: {
    minHeight: '200vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(3, 112, 225, 0.5)', // Fond bleuFil semi-transparent
    color: '#ffffff', // Texte blanc pour contraste
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '1rem',
  },
  textContainer: {
    maxWidth: '800px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
  subtitle: {
    fontSize: '1.5rem',
    lineHeight: '1.8',
  },
};

const TextEffect = () => {
  useEffect(() => {
    // Cette fonction injecte les keyframes dans la feuille de style lors du premier rendu
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes fadeIn {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <div style={styles.title}>
          <span data-fv-anim='autowrite' data-fv-data="Des ressources pour l’enseignement des disciplines dans les sections bilingues francophones">
            <AutoWriteText text="Des ressources pour l’enseignement des disciplines dans les sections bilingues francophones" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextEffect;
