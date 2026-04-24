import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Header() {

  const cookieUsuario = cookies.get('auth-user');

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
          {cookieUsuario && (
          <li>
            <Link className="nav-link" to="/favorites">
              Favoritas
            </Link>
          </li>
          )}
          {!cookieUsuario && (  
          <li className="ml-auto">
            <Link className="nav-link" to="/register">
              Crear cuenta
            </Link>
          </li>
          )} 
          {!cookieUsuario && (  
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          )}
          {cookieUsuario && (
          <li className="nav-item ml-auto pr-3">
              <p className="nav-link mb-0">
Hola!              </p>
          </li>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default withRouter(Header);
