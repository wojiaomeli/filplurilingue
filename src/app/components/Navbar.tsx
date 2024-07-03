"use client";
import React, { useState } from 'react';
import Menu from './Menu';
import Banner from './Banner';

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <nav className="navbar mt-5"> {/* la classe mt-5 pour une marge supérieure */}
      <div className="relative">
        <Menu searchVisible={searchVisible} setSearchVisible={setSearchVisible} />
      </div>
    </nav>
  );
};

export default Navbar;
