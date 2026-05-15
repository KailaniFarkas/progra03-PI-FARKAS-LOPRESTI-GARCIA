import {useState} from "react";
import { useHistory } from "react-router-dom";
import React, { Component } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function FormRegister (props) {
  const [register, setRegister] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const [mensajeError, setMensajeError] = useState([])
  const history = useHistory()
}

  function controlarCambios(e) {
    let {name,value} = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }
  
  function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      password: password,
      email: email,
      createdAt: "",
    };

    if (password.length < 6) {
      setMensajeError(
        "Recuerda que la contraseña debe tener un mínimo de 6 caracteres."
      );
    } else {
      let usersStorage = localStorage.getItem("users");
      if (usersStorage !== null) {
        let usersParseado = JSON.parse(usersStorage);
        let usersFiltrado = usersParseado.filter(
          (user) => user.email === email
        );

        if (usersFiltrado.length > 0) {
          setMensajeError("Ya existe un usuario con el email ingresado");
        } else {
          usersParseado.push(newUser);
          localStorage.setItem("users", JSON.stringify(usersParseado));
          cookies.set('auth-user', email);
          history.push("/login");
          }
        } else {
        const initialUsers = [newUser];
        localStorage.setItem("users", JSON.stringify(initialUsers));
        cookies.set('auth-user', email);
        history.push("/login");
      }
    }
  }


   return (
      <div>
        <h2 className="alert alert-primary">Crear Cuenta</h2>
        <form
          className="register-form"
          onSubmit={(e) => onSubmit(e)}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => controlarCambios(e, "email")}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => controlarCambios(e, "password")}
          />
          <input type="submit" value="Crear Cuenta" />
        </form>
        <p>{mensajeError}</p>
      </div>
    );

export default FormRegister;
