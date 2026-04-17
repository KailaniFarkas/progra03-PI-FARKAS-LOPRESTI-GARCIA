import React, { Component } from "react";
import { withRouter } from "react-router-dom";


class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      mensajeError: ""
    };
  }

  controlarCambios(event, campo) {
    this.setState({
      [campo]: event.target.value,
    });
  }

  onSubmit (event){
    event.preventDefault();

    const newUser = {
        password: this.state.password,
        email: this.state.email,
        createdAt: ''
    }

    if (this.state.password.length < 6) {
        this.setState({mensajeError: "Recuerda que la contraseña debe tener un mínimo de 6 caracteres."});
    } else {
        let usersStorage = localStorage.getItem ('users')
        if (usersStorage !== null){
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter((user) => user.email === this.state.email)
            if (usersFiltrado.length > 0) {
                this.setState({ mensajeError: "Ya existe un usuario con el email ingresado"});
            } else {
                usersParseado.push(newUser)
                localStorage.setItem("users", JSON.stringify(usersParseado));
                this.props.history.push("/login");
            }
        } else {
            const initialUsers = [newUser]
            localStorage.setItem("users", JSON.stringify(initialUsers));
            this.props.history.push("/login");

        }
    }
  }


  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Crear Cuenta</h2>
        <form
          className="register-form"
          onSubmit={(event) => this.onSubmit(event)}
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
        <p>{this.state.mensajeError}</p>
      </div>
    );
  }
}
export default withRouter(FormRegister);
