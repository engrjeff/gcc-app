import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__logo-box">
        <h1 className="nav__logo-text">GCC App</h1>
      </div>
      <ul className="nav__navigation">
        <li className="nav__nav-item">
          <NavLink to="/home" className="nav__nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav__nav-item">
          <NavLink to="/me" className="nav__nav-link">
            User
          </NavLink>
        </li>
        <li className="nav__nav-item">
          <NavLink to="/register" className="nav__nav-link">
            Register
          </NavLink>
        </li>
        <li className="nav__nav-item">
          <NavLink to="/login" className="nav__nav-link">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
