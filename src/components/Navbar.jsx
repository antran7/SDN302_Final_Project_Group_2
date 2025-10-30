import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/navbar.css";

export default function Navbar() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  if (!auth) return null;

  const { user, logout } = auth;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="custom-navbar">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048313.png"
            alt="logo"
            className="navbar-logo"
          />
          <span className="brand-text">EV Dealer</span>
        </Link>

        {/* Hamburger button */}
        <button className="navbar-toggler" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          {user ? (
            <>
              <ul className="nav-links">
                <li><NavLink to="/" className="nav-item">Home</NavLink></li>
                <li><NavLink to="/vehicles" className="nav-item">Vehicles</NavLink></li>
                <li><NavLink to="/dealers" className="nav-item">Dealers</NavLink></li>
                <li><NavLink to="/customers" className="nav-item">Customers</NavLink></li>
                <li><NavLink to="/reports" className="nav-item">Reports</NavLink></li>
              </ul>

              <div className="navbar-user ms-3">
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  <img
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
                    alt="avatar"
                    className="user-avatar"
                  />
                </div>
                <button className="btn-logout" onClick={logout}>Logout</button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn-login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
