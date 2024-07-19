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
    { id: 'methodologie', label: 'Méthodologie', link: '/methodologie', icon: <FiSettings className="text-redF text-lg mr-1" /> },
    { id: 'promotion', label: 'Promotion', link: '/promotion', icon: <BsMegaphone className="text-greenF text-lg mr-1" /> },
    { id: 'classe', label: 'Pour la classe', link: '/classe', icon: <GrGroup className="text-yellowF text-lg mr-1" /> },
    { id: 'pays', label: 'Pays', link: '/pays', icon: <IoMdGlobe className="text-purplF text-lg mr-1" /> },
  ];

  return (
    <div className="menu-container bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <Link href="/" passHref>
            <Image
              src="/assets/logo fil.svg" // Vérifiez le chemin de l'image
              alt="Logo"
              width={160}  // Ajustez la largeur du logo
              height={50}  // Ajustez la hauteur du logo
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-grow flex items-center justify-center mx-4">
          {!searchVisible && (
            <ul className="flex items-center gap-6 uppercase text-xs font-medium">
              {menuItems.map(item => (
                <li
                  key={item.id}
                  className={`cursor-pointer duration-300 flex items-center ${item.id !== 'ressources' ? (hoveredItem === item.id ? 'bg-blue-600 text-white' : 'bg-white text-black') : ''} ${item.id !== 'ressources' ? 'px-3 py-1 rounded-md' : styles[item.style]}`}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.link} passHref>
                    <div className="flex items-center">
                      {item.icon}
                      <span className={`ml-1 ${item.id === 'pays' ? 'ml-2' : ''}`}>{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recherche et autres éléments */}
        <div className="flex gap-4 items-center ml-4">
          <BsSearch
            className="text-lg hover:text-gray-600 cursor-pointer"
            onClick={() => setSearchVisible(!searchVisible)}
          />
          {searchVisible && (
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-32 sm:w-40 h-8 bg-white text-black uppercase text-sm font-normal rounded-md border-gray-300 px-2"
            />
          )}
          <div className="ml-4">
            <ScientificCommitteeButton />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  btnBluePermanent: 'px-4 py-2 text-white bg-blue-600 rounded-md transition duration-300 ease-in-out text-sm',
};

export default Menu;
