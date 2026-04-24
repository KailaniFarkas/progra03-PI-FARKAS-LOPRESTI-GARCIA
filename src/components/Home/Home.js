import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import SerieCard from "../SerieCard/SerieCard";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      nowPlayingMovies: [],
      upcomingMovies: [],
      popularSeries: [],
      onAirSeries: [],
      topRatedSeries: null,
      query: "",
    };
  }

  componentDidMount() {
    console.log(
      "me meti en el component"
    );
    
    const apiKey = "520cf7be1d7b48a01d4f5696ad4cbfaf";

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => this.setState({ popularMovies: data.results.slice(0,5) }))
      .catch((error) => console.log(error));


    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => this.setState({ popularSeries: data.results.slice(0,5) }))
      .catch((error) => console.log(error));
  }

  evitarSubmit(event) {
    event.preventDefault();
    this.props.history.push("/results/" + this.state.query);
  }

  controlarCambios(event) {
    this.setState({ query: event.target.value });
  }

  verDescripcion() {
    if (this.state.textoBoton === "Ver mas") {
      this.setState({
        textoBoton: "Ver menos",
        claseOculta: "",
      });
    } else {
      this.setState({
        textoBoton: "Ver mas",
        claseOculta: "oculta",
      });
    }
  }

  render() {
    const inSession = cookies.get('auth-user');

    console.log(this.state);
    console.log(this.state.onAirSeries.map(serie => serie
    ));
    
    
    return (
      <div>
        <form
          className="search-form"
          onSubmit={(event) => this.evitarSubmit(event)}
        >
          <input
            className="search-input"
            type="text"
            placeholder="Buscar película o serie..."
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.query}
          />
          <input type="submit" value="🔍" />
        </form>
        <h2 className="alert alert-primary">Películas populares</h2>
        <Link to="/movies">Ver todas</Link>
        <section className="row cards">
          {this.state.popularMovies.length == 0 ? <p>Cargando...</p> : this.state.popularMovies.map((mov, idx) => (
            <MovieCard movie={mov} key={idx + mov} inSession={inSession} /> 
          ))}
        </section>


        <h2 className="alert alert-primary">Series populares</h2>
        <Link to="/series">Ver todas</Link>
        <section className="row cards">
          {this.state.popularSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser} inSession={inSession} />
          ))}
        </section>
      </div>
    );
  }
}

export default withRouter(Home);
