import React from 'react';
import { FaFacebook, FaTimes, FaYoutube, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer bg-white relative">
      {/* Bande bleue en haut */}
      <div className="bg-PurpulFil h-20"></div>
      
      {/* Contenu du footer */}
      <div className="max-w-full mx-auto py-8 px-4 flex justify-between items-center">
        {/* Logo à gauche */}
        <div>
          <a href="https://lefilplurilingue.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/logo fil.svg"
              alt="Left Logo"
              width={120}
              height={30}
              className="footer-logo"
            />
          </a>
          {/* Adresse */}
          <div className="text-left text-customBlue mt-4">
            <p className="text-sm">
              1 Avenue Léon Journault 92310 Sèvres<br />
              Téléphone : 01 45 07 60 00<br />
              <a href="https://www.france-education-international.fr/" target="_blank" rel="noopener noreferrer">https://www.france-education-international.fr/</a>
            </p>
          </div>
        </div>
        
        {/* Logo à droite */}
        <div className="relative">
          <a href="https://lefilplurilingue.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/fei-logo.png"
              alt="Right Logo"
              width={120}
              height={30}
              className="footer-logo"
            />
          </a>
          {/* Texte sous le logo */}
          <div className="left-0 right-0 text-center text-customBlue mb-4">
            <p>©2025 Le Fil plurilingue</p>
          </div>
        </div>
      </div>
      
      {/* Réseaux sociaux */}
      <div className="flex justify-end items-center py-1 px-72">
        <a href="https://www.facebook.com/lefilplurilingue" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-500 text-2xl mr-4" /></a>
        <a href="https://twitter.com/FilPluri" target="_blank" rel="noopener noreferrer"><FaTimes className="text-black text-2xl mr-4 " /></a>
        <a href="https://www.youtube.com/channel/UCbmBlgyzXgg9616usvb-BzQ" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-red-500 text-2xl mr-4 " /></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-[#0077B5] text-2xl" /></a>
      </div>

      {/* Trait en bas avec logotype centré */}
      <div className="relative">
        <div className="bg-customBlue h-0.5 w-1/2 mx-auto mb-1"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <a href="https://lefilplurilingue.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/fei logotype.svg"
              alt="Logotype"
              width={150}
              height={40}
              className="footer-logotype"
            />
          </a>
        </div>
      </div>

      {/* Liens de contact et confidentialité */}
      <div className="bg-white py-1">
        <div className="max-w-full mx-auto flex justify-start px-72">
          <ul className="flex space-x-4 text-BluFil text-xs">
            <li>
              <Link href="/mentions-legales" passHref legacyBehavior>
                <span className="text-BluFil cursor-pointer">Mentions légales</span>
              </Link>
            </li>
            <li>
              <Link href="/a-propos" passHref legacyBehavior>
                <span className="text-BluFil cursor-pointer">À propos</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref legacyBehavior>
                <span className="text-BluFil cursor-pointer">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;