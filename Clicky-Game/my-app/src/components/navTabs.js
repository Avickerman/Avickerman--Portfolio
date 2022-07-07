import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        to="/https://avickerman.github.io/Bootstrap-Portfolio/portfolio.html"
        className={
          window.location.pathname === "/https://avickerman.github.io/Bootstrap-Portfolio/portfolio.html" ? "nav-link active" : "nav-link"
        }
      >
        Portfolio
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/https://avickerman.github.io/Bootstrap-Portfolio/index.html"
        className={
          window.location.pathname === "/https://avickerman.github.io/Bootstrap-Portfolio/index.html" ? "nav-link active" : "nav-link"
        }
      >
        Index
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/https://avickerman.github.io/Bootstrap-Portfolio/contact.html"
        className={
          window.location.pathname === "/https://avickerman.github.io/Bootstrap-Portfolio/contact.html" ? "nav-link active" : "nav-link"
        }
      >
        Contact
      </Link>
    </li>
  </ul>
);

export default NavTabs;