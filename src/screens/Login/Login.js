import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  controlarCambios(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  ejecutarBusqueda(e) {
    e.preventDefault();
    this.props.history.push("/");
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  onSubmit(email, password) {
    //logica que verifique los parametros
    //verifica si el email exsite y la clave es correcta

    if (user) {
      cookies.set('user-auth-cookie', user.email)
    }
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Iniciar Sesión</h2>
        <form
          className="register-form"
          onSubmit={(event) => this.evitarSubmit(event)}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(event) => this.controlarCambios(event)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(event) => this.controlarCambios(event)}
          />
          <input type="submit" value="Iniciar Sesión" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
