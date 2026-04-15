import React, { Component } from "react";

class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      fotoFavoritos: "❤️",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movie: data });
      })
      .catch((error) => console.log(error));

    let storage = localStorage.getItem("FavoriteMovies");

    if (storage !== null) {
      let storageparse = JSON.parse(storage);

      if (storageparse.includes(this.state.movie.id)) {
        this.setState({ fotoFavoritos: "❌" });
      } else {
        this.setState({ fotoFavoritos: "❤️" });
      }
    }
  }

  anadirFav() {
    if (this.state.fotoFavoritos === "❤️") {
      let storage = localStorage.getItem("FavoriteMovies");
      if (storage === null) {
        let primerfav = [this.state.movie.id];
        localStorage.setItem("FavoriteMovies", JSON.stringify(primerfav));
        this.setState({ fotoFavoritos: "❌" });
      } else {
        let storageparse = JSON.parse(storage);
        storageparse.push(this.state.movie.id);
        localStorage.setItem("FavoriteMovies", JSON.stringify(storageparse));
        this.setState({ fotoFavoritos: "❌" });
      }
    } else {
      //aca es donde sacamos el id con un filter
    }
  }

  render() {
    console.log(this.state.movie);
    return (
      <>
        <h1>{this.state.movie.title}</h1>

        <img
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}
          className="card-img-top"
          alt={this.state.movie.title}
        />

        <p>Rating: {this.state.movie.vote_average}</p>
        <p>Release date: {this.state.movie.release_date}</p>
        <p>Duracion: {this.state.movie.runtime}</p>
        <p>Sinopsis: {this.state.movie.overview}</p>
        <p>Generos:</p>
        <p>Release date: {this.state.movie.release_date}</p>
        <p onClick={() => this.anadirFav()}>{this.state.fotoFavoritos}</p>
      </>
    );
  }
}

export default DetailMovie;
