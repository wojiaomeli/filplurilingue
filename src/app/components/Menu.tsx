import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import { BsMegaphone } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { IoMdGlobe } from "react-icons/io";

const Menu = ({ searchVisible, setSearchVisible }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const styles = {
    btnBlue: {
      padding: '0.25rem 0.75rem',
      color: 'white',
      backgroundColor: 'rgba(3, 112, 225, 1)',
      borderRadius: '0.375rem',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      textDecoration: 'none',
      fontSize: '0.75rem',
    },
    btnBlueHover: {
      backgroundColor: 'rgba(3, 112, 225, 0.8)',
      color: 'white',
    },
    btnWhite: {
      padding: '0.25rem 0.75rem',
      color: 'black',
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      textDecoration: 'none',
      fontSize: '0.75rem',
    },
    btnWhiteHover: {
      backgroundColor: 'rgba(3, 112, 225, 1)',
      color: 'white',
    },
    btnRed: {
      padding: '0.25rem 0.75rem',
      color: 'white',
      backgroundColor: 'rgba(229, 7, 73, 1)',
      borderRadius: '0.375rem',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      textDecoration: 'none',
      fontSize: '0.75rem',
    },
    btnRedHover: {
      backgroundColor: 'rgba(204, 0, 51, 1)',
      color: 'white',
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
      <div className="max-w-screen-1xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="logo-container">
          <Link href="/" passHref>
            <img
              src="/assets/logo fil.svg"
              alt="Left Logo"
              className="logo"
              style={{ width: '150px', height: 'auto' }}
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
              <Link href="/ressource" passHref>
                <div
                  style={{
                    ...styles.btnBlue,
                    backgroundColor: styles.btnBlue.backgroundColor,
                    color: styles.btnBlue.color,
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
              <Link href="/methodologie" passHref>
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'methodologie' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'methodologie' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FiSettings className="text-redF text-2xl mr-2" />
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
              <Link href="/promotion" passHref>
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'promotion' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'promotion' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsMegaphone className="text-greenF text-2xl mr-2" />
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
              <Link href="/classe" passHref>
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'classe' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'classe' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GrGroup className="text-yellowF text-2xl mr-2" />
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
              <Link href="/pays" passHref>
                <div
                  style={{
                    ...styles.btnWhite,
                    backgroundColor: hoveredItem === 'pays' ? styles.btnBlueHover.backgroundColor : styles.btnWhite.backgroundColor,
                    color: hoveredItem === 'pays' ? styles.btnBlueHover.color : styles.btnWhite.color,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IoMdGlobe className="text-purplF text-2xl mr-2" />
                    Pays
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        )}

        {/* Recherche et autres éléments */}
        <div className="flex gap-8 items-center">
          <BsSearch
            className="text-xl hover:text-gray-600 cursor-pointer"
            onClick={() => setSearchVisible(!searchVisible)}
          />
          {searchVisible && (
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-40 sm:w-60 h-8 bg-white text-black uppercase text-sm font-normal rounded-md border-gray-300 px-2"
            />
          )}
          <Link href="/comite" passHref>
            <div
              style={{
                ...styles.btnRed,
                backgroundColor: hoveredItem === 'comite' ? styles.btnRedHover.backgroundColor : styles.btnRed.backgroundColor,
                color: hoveredItem === 'comite' ? styles.btnRedHover.color : styles.btnRed.color,
                display: 'flex',
                alignItems: 'center',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                textDecoration: 'none',
                fontSize: '0.75rem',
              }}
              onMouseEnter={() => handleMouseEnter('comite')}
              onMouseLeave={handleMouseLeave}
            >
              Comité Scientifique
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
