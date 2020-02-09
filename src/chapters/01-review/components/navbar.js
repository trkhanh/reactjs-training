import React from "react";
import { Link } from "@reach/router";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1 className="nav-logo">React-Training</h1>
      </Link>
      <ul className="nav-items">
        <li className="nav-item">Log in</li>
      </ul>
    </nav>
  );
}
