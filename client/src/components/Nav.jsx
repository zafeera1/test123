import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
      <Link to="/feed">Feed</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Log In</Link>
      <Link to="/fridge">Fridge</Link>
    </nav>
  );
};

export default Nav;