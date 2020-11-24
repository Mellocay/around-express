import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Around the US Logo" className="header__logo" />
    </header>
  );
}

export default Header;