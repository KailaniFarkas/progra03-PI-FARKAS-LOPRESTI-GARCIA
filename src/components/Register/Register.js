import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  actualizarDatos(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  evitarSubmit(event) {
    event.preventDefault();
    console.log(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Crear Cuenta</h2>
        <form className="register-form" onSubmit={(event) => this.evitarSubmit(event)}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(event) => this.actualizarDatos(event)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(event) => this.actualizarDatos(event)}
          />
          <input type="submit" value="Crear Cuenta" />
        </form>
      </div>
    );
  }
}

export default Register;
