import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  controlarCambios(event, campo) {
    this.setState({
      [campo]: event.target.value,
    });
  }

  evitarSubmit(event) {
    event.preventDefault();
    if (this.state.email !== "") {
      this.props.history.push();
    }
  }


  onSubmit(email, password) {
    e.preventDefault();

    //validar si los datos son validos 
    //crear una constante que represente al usuario
    //recuperamos el Storage
    //verificamos si el storage es distinto de null
      //si es distinto de null
        //buscamos si el mail no esta en uso 
        //si no esta en uso, guardamos al usuario en storage
        //si ya esta en uso mostramos un mensaje de error que diga que no se pude registrar con ese email.


      //si es igual a null (la propiedad storage no existe)
        //mostramos el usuario en el localstorage

      //this.props.history.push("/login"); redirige a login 
  

    if (user) {
      cookies.set('user-auth-cookie', user.email)
    }
  }


  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Crear Cuenta</h2>
        <form
          className="register-form"
          onSubmit={(event) => this.evitarSubmit(event)}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(event) => this.controlarCambios(event, 'email')}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(event) => this.controlarCambios(event, 'password')}
          />
          <input type="submit" value="Crear Cuenta"/>
        </form>
      </div>
    );
  }
}
export default withRouter(Register);
