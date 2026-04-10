import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
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

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">All movies</h2>
        <section className="row cards">
          {this.state.popularMovies.map((mov, idx) => (
            <MovieCard movie={mov} key={idx + mov} />
          ))}
        </section>
      </div>
    );
  }
}

export default Movies;
