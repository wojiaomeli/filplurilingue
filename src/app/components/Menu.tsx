import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import ScientificCommitteeButton from './ScientificCommitteeButton';
import { FiSettings } from 'react-icons/fi';
import { BsMegaphone } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { IoMdGlobe } from "react-icons/io";

const Menu = ({ searchVisible, setSearchVisible }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const styles = {
    btnBlue: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      color: 'white', // Couleur de texte blanche par défaut
      backgroundColor: 'rgba(3, 112, 225, 1)', // Fond bleu par défaut pour "Toutes les ressources"
      borderRadius: '0.375rem', // Coins arrondis
      transition: 'background-color 0.3s ease, color 0.3s ease', // Transition sur le fond et la couleur du texte
      textDecoration: 'none', // Pas de soulignement
    },
    btnBlueHover: {
      backgroundColor: 'rgba(3, 112, 225, 1)', // Couleur bleue au survol
      color: 'white', // Couleur de texte blanche au survol
    },
    btnWhite: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      color: 'black', // Couleur de texte noire par défaut
      backgroundColor: 'white', // Fond blanc par défaut pour les autres catégories
      borderRadius: '0.375rem', // Coins arrondis
      transition: 'background-color 0.3s ease, color 0.3s ease', // Transition sur le fond et la couleur du texte
      textDecoration: 'none', // Pas de soulignement
    },
    btnWhiteHover: {
      backgroundColor: 'rgba(3, 112, 225, 1)', // Couleur bleue au survol
      color: 'white', // Couleur de texte blanche au survol
    },
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="menu-container">
      <div className="max-w-screen-1xl text-black h-full mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <div
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
          className="logo-container"
        >
          <Link href="http://localhost:3000/" passHref>
            <img
              src="/assets/logo fil.svg"
              alt="Left Logo"
              style={{ width: '150px', height: 'auto', marginRight: '30px', borderRadius: '7px' }}
              className="logo"
            />
          </Link>
        </div>

        {/* Menu */}
        {!searchVisible && (
          <ul className="flex items-center gap-4 uppercase text-sm font-medium">
            <li
              className="cursor-pointer duration-300"
              onMouseEnter={() => handleMouseEnter('ressources')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="http://localhost:3000/ressource" passHref>
                <div
                  style={{
                    ...styles.btnBlue,
                    backgroundColor: styles.btnBlue.backgroundColor, // Toujours bleu
                    color: styles.btnBlue.color, // Toujours blanc
                  }}
                >
                  Toutes les ressources
                </div>
              </Link>
            </li>
            <li
              className="cursor-pointer duration-300"
              onMouseEnter={() => handleMouseEnter('methodologie')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="http://localhost:3000/methodologie">
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'methodologie' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'methodologie' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FiSettings className="text-redF text-2xl mr-2" /> {/* Icône et texte */}
                    Méthodologie
                  </div>
                </div>
              </Link>
            </li>
            <li
              className="cursor-pointer duration-300"
              onMouseEnter={() => handleMouseEnter('promotion')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="http://localhost:3000/promotion">
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'promotion' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'promotion' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsMegaphone className="text-greenF text-2xl mr-2" /> {/* Icône et texte */}
                    Promotion
                  </div>
                </div>
              </Link>
            </li>
            <li
              className="cursor-pointer duration-300"
              onMouseEnter={() => handleMouseEnter('classe')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="http://localhost:3000/classe">
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'classe' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'classe' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GrGroup className="text-yellowF text-2xl mr-2" /> {/* Icône et texte */}
                    Pour la classe
                  </div>
                </div>
              </Link>
            </li>
            <li
              className="cursor-pointer duration-300"
              onMouseEnter={() => handleMouseEnter('pays')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="http://localhost:3000/pays">
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'pays' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'pays' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IoMdGlobe className="text-purplF text-2xl mr-2" /> {/* Icône et texte */}
                    Pays
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        )}

        {/* Recherche */}
        <div className="flex gap-8 items-center justify-center">
          <BsSearch className="text-xl hover:text-hoverColor cursor-pointer text-center" onClick={() => setSearchVisible(!searchVisible)} />
          {searchVisible && (
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-80 h-8 bg-white text-black uppercase text-sm font-normal rounded-md border-gray-300 px-2"
            />
          )}
          <ScientificCommitteeButton />
        </div>
      </div>
    </div>
  );
};

export default Menu;
