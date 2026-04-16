import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      query: "",
      proxPagNum: 2,
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
  }

  evitarSubmit(event) {
    event.preventDefault();
    this.props.history.push("/results/" + this.state.query);
  }

  controlarCambios(event) {
    this.setState({ query: event.target.value });
  }

  masPeliculas() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&page=" +
        this.state.proxPagNum
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          popularMovies: this.state.popularMovies.concat(data.results),
          proxPagNum: (this.state.proxPagNum += 1),
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
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
        <h2 className="alert alert-primary">Todas las películas populares</h2>
        <section className="row cards">
          {this.state.popularMovies.map((mov, idx) => (
            <MovieCard movie={mov} key={idx + mov} />
          ))}
        </section>
        <p onClick={() => this.masPeliculas()} className="texto">
          Cargar más
        </p>
      </div>
    );
  }
}

export default withRouter(Movies);
