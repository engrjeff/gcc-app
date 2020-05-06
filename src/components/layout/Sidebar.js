import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../state/actions/authActions";

const Sidebar = ({ logout, history }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <span className="fas fa-bars"></span>Menu
      </div>
      <ul className="sidebar__navigation">
        <li className="sidebar__nav-item">
          <NavLink to="/me/dashboard" className="sidebar__nav-link">
            <span className="fas fa-th-large"></span>
            <span className="link-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/me/profile" className="sidebar__nav-link">
            <span className="fas fa-id-card"></span>
            <span className="link-text">Profile</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/me/groups" className="sidebar__nav-link">
            <span className="fas fa-users-cog"></span>
            <span className="link-text">Groups</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <NavLink to="/me/reports" className="sidebar__nav-link">
            <span className="fas fa-table"></span>
            <span className="link-text">Reports</span>
          </NavLink>
        </li>
        <li className="sidebar__nav-item">
          <a
            href="!#"
            className="sidebar__nav-link"
            onClick={(e) => {
              e.preventDefault();
              logout();
              history.push("/login");
            }}
          >
            <span className="fas fa-sign-out-alt"></span>
            <span className="link-text">Log out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Sidebar);
