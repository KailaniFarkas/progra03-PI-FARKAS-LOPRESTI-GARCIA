import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      popularSeries: [],
      textoBoton: "Ver mas",
      claseOculta: "oculta",
      // Soon: [],
      // TopRated: [],
      // AiringToday: [],
      // OnTelevision: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ popularMovies: data.results });
      })
      .catch((error) => console.log(error));

    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ popularSeries: data.results });
      })
      .catch((error) => console.log(error));
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
    return (
      <div>
        <h2 className="alert alert-primary">Popular movies this week</h2>
        <Link to="/movies">Ver todas</Link>
        <section className="row cards">
          {this.state.popularMovies.map((movie) => (
            <article className="single-card-movie" key={movie.id}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="cardBody">
                <h5 className="card-title">{movie.title}</h5>
                <button onClick={() => this.verDescripcion()}>
                  {this.state.textoBoton}
                </button>
                <p className={"card-text " + this.state.claseOculta}>
                  {movie.overview}
                </p>
                <Link to={"/detailmovie/:" + movie.id}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <h2 className="alert alert-primary">Popular series this week</h2>
        <Link to="/series">Ver todas</Link>
        <section className="row cards">
          {this.state.popularSeries.map((serie) => (
            <article className="single-card-movie" key={serie.id}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + serie.poster_path}
                className="card-img-top"
                alt={serie.original_name}
              />
              <div className="cardBody">
                <h5 className="card-title">{serie.original_name}</h5>
                <button onClick={() => this.verDescripcion()}>
                  {this.state.textoBoton}
                </button>
                <p className={"card-text " + this.state.claseOculta}>
                  {serie.overview}
                </p>
                <Link to={"/detailserie/:" + serie.id}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

export default Home;
