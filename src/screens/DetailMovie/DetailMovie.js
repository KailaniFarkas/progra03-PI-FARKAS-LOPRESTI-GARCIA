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
      
        let storage = localStorage.getItem("FavoriteMovies");
        if (storage !== null) {
          let storageparse = JSON.parse(storage);
          if (storageparse.includes(data.id)) {
            this.setState({ fotoFavoritos: "❌" });
          } else {
            this.setState({ fotoFavoritos: "❤️" });
          }
        }
    })
    .catch((error) => console.log(error));
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
      let storage = localStorage.getItem('FavoriteMovies');
      let storageparse = JSON.parse(storage);
      let filtrado = storageparse.filter((id) => id !== this.state.movie.id);
      localStorage.setItem('FavoriteMovies', JSON.stringify(filtrado));
      this.setState({ fotoFavoritos: '❤️' });
    }
  }

  render() {
    console.log(this.state.movie);
      return (
        <div>
          <h2 className="alert alert-primary">{this.state.movie.title}</h2>
          <section className="row">
            <img
              className="col-md-6"
              src={'https://image.tmdb.org/t/p/w500' + this.state.movie.poster_path}
              alt={this.state.movie.title}
            />
            <section className="col-md-6 info">
              <h3>Descripción</h3>
              <p className="description">{this.state.movie.overview}</p>
              <p className="mt-0 mb-0">
                <strong>Fecha de estreno:</strong> {this.state.movie.release_date}
              </p>
              <p className="mt-0 mb-0">
                <strong>Duración:</strong> {this.state.movie.runtime} minutos
              </p>
              <p className="mt-0 mb-0">
                <strong>Puntuación:</strong> {this.state.movie.vote_average}
              </p>
              <p className="mt-0 mb-0">
                <strong>Géneros:</strong>{' '}
                {this.state.movie.genres
                  ? this.state.movie.genres.map((g) => g.name).join(','): 'Cargando...'}
              </p>
              <p onClick={() => this.anadirFav()}>
                {this.state.fotoFavoritos}
              </p>
            </section>
          </section>
        </div>
      );
    }
  }

export default DetailMovie;
