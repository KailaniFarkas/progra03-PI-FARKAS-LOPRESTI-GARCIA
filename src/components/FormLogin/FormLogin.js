import {useState} from "react"
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function Login (props) {
  const [login, setLogin] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const [mensajeError, setMensajeError] = useState([])
  }

  function controlarCambios(e) {
    let {name,value} = event.target;
  }
  

  function onSubmit(e) {
    e.preventDefault();

    let usersStorage = localStorage.getItem ('users')
    if (usersStorage === null) {
          ({mensajeError: "Credenciales invalidas"});
    } else {
        let usersParseado = JSON.parse(usersStorage);
        let usersFiltrado = usersParseado.filter((user) => user.email === email)

        if (usersFiltrado.length === 0) {
            setState({mensajeError: "No existe un usuario con este email."});
        } else {
            if (usersFiltrado[0].password === password) {
                localStorage.setItem("userInSession", JSON.stringify({sesionActiva: true}))
                cookies.set('auth-user', email)
                history.push("/")
            } else {
                setState({mensajeError: "Contrasena incorrecta."});
            }
        }
    }
  }
    return (
      <div>
        <h2 className="alert alert-primary">Iniciar Sesión</h2>
        <form
          className="register-form"
          onSubmit={(event) => onSubmit(event)}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => controlarCambios(event)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => controlarCambios(event)}
          />
          <input type="submit" value="Iniciar Sesión" />
        </form>
        <p>{mensajeError}</p>
      </div>
    );

export default withRouter(Login);
