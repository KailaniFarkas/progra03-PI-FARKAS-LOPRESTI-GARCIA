import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import SerieCard from "../SerieCard/SerieCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      popularSeries: [],
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
          {this.state.popularMovies.map((mov, idx) => (
            <MovieCard movie={mov} key={idx + mov} />
          ))}
        </section>

        <h2 className="alert alert-primary">Popular series this week</h2>
        <Link to="/series">Ver todas</Link>
        <section className="row cards">
          {this.state.popularSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser} />
          ))}
        </section>
      </div>
    );
  }
}

export default Home;
