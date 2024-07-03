import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Interesses = () => {
  const [open, setOpen] = useState(false);
  const [selectedMatiere, setSelectedMatiere] = useState("");

  const styles = {
    container: {
      marginTop: '20px',
      position: 'relative',
    },
    button: {
      display: 'flex', // Utiliser la mise en page flexbox
      alignItems: 'center', // Aligner les éléments sur la même ligne verticalement
      justifyContent: 'space-between', // Espace entre le texte et la flèche
      padding: '0.5rem 1rem',
      width: '300px', // Largeur fixe pour le bouton
      height: '40px', // Hauteur fixe pour le bouton
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      color: '#333',
      cursor: 'pointer',
      position: 'relative',
    },
    arrow: {
      transition: 'transform 0.3s ease',
      transform: open ? 'rotate(0deg)' : 'rotate(180deg)', // Rotation pour la flèche vers le bas
    },
    dropdown: {
      position: 'absolute',
      top: 'calc(100% + 4px)', // Positionner juste en dessous du bouton
      left: 0,
      zIndex: 1,
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      overflow: 'hidden',
      transition: 'height 0.3s ease',
      width: '300px', // Largeur automatique
    },
    bandeau: {
      padding: '0.5rem',
    },
    option: {
      padding: '0.5rem 1rem',
      cursor: 'pointer',
    },
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleSelectMatiere = (matiere) => {
    setSelectedMatiere(matiere);
    setOpen(false);
  };

  return (
    <div style={styles.container} className="interesses">
      <button onClick={toggleDropdown} style={styles.button}>
        {selectedMatiere || "Sélectionner une matière"}
        <span style={styles.arrow}><IoIosArrowDown /></span>
      </button>
      {open && (
        <div style={styles.dropdown}>
          <div style={styles.bandeau}>
            <div style={styles.option} onClick={() => handleSelectMatiere("Art")}>Art</div>
            <div style={styles.option} onClick={() => handleSelectMatiere("Chimie")}>Chimie</div>
            <div style={styles.option} onClick={() => handleSelectMatiere("Education Civique")}>Education Civique</div>
            {/* Ajoutez d'autres options selon vos besoins */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interesses;
