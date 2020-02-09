import React from "react";
import { Link } from "@reach/router";
import { AppConsumer } from "../context";

export default function NavBar() {
  return (
    <AppConsumer>
      {({ isAuthenticated, login, logout }) => (
        <nav className="navbar">
          <Link to={"/"}>
            <h1 className="nav-logo">Formidamail</h1>
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
      )}
    </AppConsumer>
  );
}
