import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li>
          <Link to="/user-details" className="nav-link">User Details</Link>
        </li>
        <li>
          <Link to="/bills" className="nav-link">View Bills</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
