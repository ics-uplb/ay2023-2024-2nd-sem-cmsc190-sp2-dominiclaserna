import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    notify(); // Call the notify function
    navigate('/login'); // Redirect to login page
  };

  const notify = () => {
    toast.success('You have been logged out.', { // Show success toast
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
        <li>
          <Link to="/messages" className="nav-link">Messages</Link>
        </li>
        <li>
          <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
