import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <span className="fas fa-bars"></span>Menu
      </div>
      <ul className="sidebar__navigation">
        <li className="sidebar__nav-item">
          <NavLink to="/" exact className="sidebar__nav-link">
            <span className="fas fa-users"></span>
            <span className="link-text">Disciples</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/dashboard" className="sidebar__nav-link">
            <span className="fas fa-th-large"></span>
            <span className="link-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/profile" className="sidebar__nav-link">
            <span className="fas fa-id-card"></span>
            <span className="link-text">Profile</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/groups" className="sidebar__nav-link">
            <span className="fas fa-users-cog"></span>
            <span className="link-text">Groups</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/reports" className="sidebar__nav-link">
            <span className="fas fa-table"></span>
            <span className="link-text">Reports</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/logout" className="sidebar__nav-link">
            <span className="fas fa-sign-out-alt"></span>
            <span className="link-text">Log out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
