// Navbar.jsx
import React, { useState } from 'react';
import Menu from './Menu';

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <nav className="navbar mt-5">
      <div className="relative">
        <Menu searchVisible={searchVisible} setSearchVisible={setSearchVisible} />
      </div>
    </nav>
  );
};

export default Navbar;