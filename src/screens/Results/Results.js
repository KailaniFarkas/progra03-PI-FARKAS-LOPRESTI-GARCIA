import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import SerieCard from "../../components/SerieCard/SerieCard";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      series: [],
    };
  }

  componentDidMount() {
    const { buscar } = this.props.match.params;
    this.buscar(buscar);
  }

  componentDidUpdate(prevProps) {
    const { buscar } = this.props.match.params;
    if (prevProps.match.params.buscar !== buscar) {
      this.buscar(buscar);
    }
  }

  buscar(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data.results });
      })
      .catch((error) => console.log(error));

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ series: data.results });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { buscar } = this.props.match.params;
    const { movies, series } = this.state;

    return (
      <div>
        <h2 className="alert alert-primary">Resultados para: "{buscar}"</h2>

        <h3>Películas</h3>
        {movies.length === 0 ? (
          <p>No hay resultados de búsqueda.</p>
        ) : (
          <section className="row cards">
            {movies.map((movie, idx) => (
              <MovieCard 
              movie={movie} 
              key={idx} />
            ))}
          </section>
        )}

        <h3>Series</h3>
        {series.length === 0 ? (
          <p>No hay resultados de búsqueda</p>
        ) : (
          <section className="row cards">
            {series.map((serie, idx) => (
              <SerieCard 
              serie={serie} 
              key={idx} />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default Results;
