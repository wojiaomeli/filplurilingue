import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import { BsMegaphone } from 'react-icons/bs';
import { GrGroup } from 'react-icons/gr';
import { IoMdGlobe } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import ScientificCommitteeButton from './ScientificCommitteeButton';

const Menu = ({ searchVisible, setSearchVisible }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const menuItems = [
    { id: 'ressources', label: 'Toutes les ressources', link: '/ressource', icon: null, style: 'btnBluePermanent' },
    { id: 'methodologie', label: 'Méthodologie', link: '/methodologie', icon: <FiSettings className="text-redF text-xl mr-1" />, style: 'btnWhite' },
    { id: 'promotion', label: 'Promotion', link: '/promotion', icon: <BsMegaphone className="text-greenF text-xl mr-1" />, style: 'btnWhite' },
    { id: 'classe', label: 'Pour la classe', link: '/classe', icon: <GrGroup className="text-yellowF text-xl mr-1" />, style: 'btnWhite' },
    { id: 'pays', label: 'Pays', link: '/pays', icon: <IoMdGlobe className="text-purplF text-xl mr-1" />, style: 'btnWhite' },
  ];

  return (
    <div className="menu-container bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <Link href="/" passHref legacyBehavior>
            <a className="block">
              <Image
                src="/assets/logo fil.svg" // Vérifiez le chemin de l'image
                alt="Logo"
                width={180}  // Ajustez la largeur du logo
                height={60}  // Ajustez la hauteur du logo
              />
            </a>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-grow flex justify-center">
          {!searchVisible && (
            <ul className="flex items-center gap-4 uppercase text-sm font-medium flex-wrap">
              {menuItems.map(item => (
                <li
                  key={item.id}
                  className="cursor-pointer duration-300 menuItem"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.link} passHref legacyBehavior>
                    <a className={`flex items-center ${styles[item.style]} ${item.id !== 'ressources' && hoveredItem === item.id ? styles.btnBlue : ''}`}>
                      {item.icon}
                      <span className={`ml-1 ${item.id === 'pays' ? 'ml-2' : ''}`}>{item.label}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recherche et autres éléments */}
        <div className="flex gap-4 items-center">
          <BsSearch
            className="text-xl hover:text-gray-600 cursor-pointer"
            onClick={() => setSearchVisible(!searchVisible)}
          />
          {searchVisible && (
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-32 sm:w-40 h-8 bg-white text-black uppercase text-sm font-normal rounded-md border-gray-300 px-2"
            />
          )}
          <ScientificCommitteeButton />
        </div>
      </div>
    </div>
  );
};

const styles = {
  btnBluePermanent: 'px-2 py-1 text-white bg-blue-600 rounded-md transition duration-300 ease-in-out text-sm',
  btnWhite: 'px-2 py-1 text-black bg-white rounded-md transition duration-300 ease-in-out text-xs',
  btnBlue: 'bg-blue-500 text-white'
};

export default Menu;