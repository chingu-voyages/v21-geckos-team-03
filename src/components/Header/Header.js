import React from 'react';
import NavBar from '../NavBar/NavBar';
import '../../css/header.css';

// navbar along top of page

function Header() {
  return (
    <header className="app-header">
        <h1 className="app-name">Geckos-03 Movie App</h1>
        <NavBar />
    </header>
  );
}

export default Header;
