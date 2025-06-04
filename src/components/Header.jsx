import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          Logo
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/")}`}>
            Home
          </Link>
          <Link to="/blog" className={`nav-link ${isActive("/blog")}`}>
            Blog
          </Link>
          <Link
            to="/add-new"
            className={`nav-link add-new ${isActive("/add-new")}`}
          >
            Add New
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
