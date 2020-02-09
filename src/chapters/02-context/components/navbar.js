import React from "react";
import { Link } from "@reach/router";

export default function NavBar({ isAuthenticated, login, logout }) {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1 className="nav-logo">React-Training</h1>
      </Link>
      <ul className="nav-items">
        {isAuthenticated ? (
          <li className="nav-item" onClick={logout}>
            logout
          </li>
        ) : (
          <li className="nav-item" onClick={login}>
            Log in
          </li>
        )}
      </ul>
    </nav>
  );
}
