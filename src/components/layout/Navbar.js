import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import UserAvatar from "./UserAvatar";

const Navbar = ({ auth }) => {
  return (
    <nav className="nav">
      <div className="nav__logo-box">
        <h1 className="nav__logo-text">GCC App</h1>
      </div>
      <ul className="nav__navigation">
        <li className="nav__nav-item">
          <NavLink to="/home" className="nav__nav-link">
            Disciples
          </NavLink>
        </li>
        {auth.isAuthenticated && auth.user && (
          <UserAvatar user={auth.user.data.name} />
        )}
        {!auth.isAuthenticated && !auth.user && (
          <Fragment>
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
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Navbar);
