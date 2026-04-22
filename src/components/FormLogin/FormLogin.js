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
      mensajeError: ""
    };
  }

  controlarCambios(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  

  onSubmit(event) {
    event.preventDefault();

    let usersStorage = localStorage.getItem ('users')
    if (usersStorage === null) {
        this.setState({mensajeError: "Credenciales invalidas"});
    } else {
        let usersParseado = JSON.parse(usersStorage);
        let usersFiltrado = usersParseado.filter((user) => user.email === this.state.email)

        if (usersFiltrado.length === 0) {
            this.setState({mensajeError: "No existe un usuario con este email."});
        } else {
            if (usersFiltrado[0].password === this.state.password) {
                localStorage.setItem("userInSession", JSON.stringify({sesionActiva: true}))
                this.props.history.push("/")
            } else {
                this.setState({mensajeError: "Contrasena incorrecta."});
            }
        }
    }
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Iniciar Sesión</h2>
        <form
          className="register-form"
          onSubmit={(event) => this.onSubmit(event)}
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
        <p>{this.state.mensajeError}</p>
      </div>
    );
  }
}

export default withRouter(Login);
