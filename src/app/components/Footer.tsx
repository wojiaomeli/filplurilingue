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
      <div className="max-w-full mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo République Française à gauche */}
        <div className="flex flex-col items-start mb-4 md:mb-0">
          <a href="https://example.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/logo-republique-francaise.svg"
              alt="Logo République Française"
              width={120}
              height={40}
              className="footer-logo"
            />
          </a>
        </div>

        {/* Logo "Le Fil plurilingue" avec texte en dessous, centré */}
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <a href="https://lefilplurilingue.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/logo fil.svg"
              alt="Le Fil Plurilingue"
              width={120}
              height={40}
              className="footer-logo"
              style={{ marginRight: '10px' }} // Décalage du logo central vers la droite
            />
          </a>
          {/* Texte sous le logo central */}
          <div className="text-customBlue mt-4 text-center w-full md:w-auto">
            <p className="text-sm">©2025 Le Fil plurilingue</p>
          </div>
        </div>

        {/* Logo à droite */}
        <div className="flex flex-col items-start mb-4  md:mb-0">
          <a href="https://lefilplurilingue.org/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/assets/logo fei.svg"
              alt="Right Logo"
              width={120}
              height={40}
              className="footer-logo"
            />
          </a>
          {/* Texte sous le logo à droite */}
          <div className="text-customBlue mt-4 w-full md:w-auto">
            <p className="text-sm">
              1 Avenue Léon Journault 92310 Sèvres<br />
              Téléphone : 01 45 07 60 00<br />
              <a href="https://www.france-education-international.fr/" target="_blank" rel="noopener noreferrer">
                https://www.france-education-international.fr/
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="flex justify-center md:justify-end items-center py-1 px-8 md:px-80">
        <a href="https://www.facebook.com/lefilplurilingue" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-500 text-2xl mx-2" />
        </a>
        <a href="https://twitter.com/FilPluri" target="_blank" rel="noopener noreferrer">
          <FaTimes className="text-black text-2xl mx-2" />
        </a>
        <a href="https://www.youtube.com/channel/UCbmBlgyzXgg9616usvb-BzQ" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-red-500 text-2xl mx-2" />
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-[#0077B5] text-2xl mx-2" />
        </a>
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
        <div className="max-w-full mx-auto flex flex-col md:flex-row justify-center md:justify-start px-6 md:px-80">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-BluFil text-xs">
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
