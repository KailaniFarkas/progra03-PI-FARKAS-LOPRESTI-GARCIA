import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <h1 className="title">UdeSA Movies</h1>
      <nav>
        <ul className="nav nav-tabs my-4">
          <li className="nav-item">
            <img src="../img/logo.jpeg" className="logo" alt="Logo"></img>
          </li>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/movies">
              Películas
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/series">
              Series
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/favorites">
              Favoritas
            </Link>
          </li>
          <li className="ml-auto">
            <Link className="nav-link" to="/register">
              Registro
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Header;
