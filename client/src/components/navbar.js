import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link" activeclassname="active-link">
          Home
        </NavLink>
        <NavLink to="/calculator" className="navbar-link" activeclassname="active-link">
          Calculator
        </NavLink>
        {/* Add more navigation links as needed */}
      </div>
    </nav>
  );
}
