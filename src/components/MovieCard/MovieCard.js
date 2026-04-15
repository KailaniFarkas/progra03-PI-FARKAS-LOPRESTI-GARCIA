import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoBoton: "Ver mas",
      claseOculta: "oculta",
      fotoFavoritos: "❤️",
    };
  }

  componentDidMount() {
    let storage = localStorage.getItem("FavoriteMovies");

    if (storage !== null) {
      let storageparse = JSON.parse(storage);

      if (storageparse.includes(this.props.movie.id)) {
        this.setState({ fotoFavoritos: "❌" });
      } else {
        this.setState({ fotoFavoritos: "❤️" });
      }
    }
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

  anadirFav() {
    if (this.state.fotoFavoritos === "❤️") {
      let storage = localStorage.getItem("FavoriteMovies");
      if (storage === null) {
        let primerfav = [this.props.movie.id];
        localStorage.setItem("FavoriteMovies", JSON.stringify(primerfav));
        this.setState({ fotoFavoritos: "❌" });
      } else {
        let storageparse = JSON.parse(storage);
        storageparse.push(this.props.movie.id);
        localStorage.setItem("FavoriteMovies", JSON.stringify(storageparse));
        this.setState({ fotoFavoritos: "❌" });
      }
    } else {
      //aca es donde sacamos el id con un filter
    }
  }

  render() {
    console.log(this.props);

    return (
      <article className="single-card-movie" key={this.props.movie.id}>
        <img
          src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}
          className="card-img-top"
          alt={this.props.movie.title}
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.movie.title}</h5>
          <button onClick={() => this.verDescripcion()}>
            {this.state.textoBoton}
          </button>
          <p className={"card-text " + this.state.claseOculta}>
            {this.props.movie.overview}
          </p>
          <Link to={"/detailmovie/" + this.props.movie.id}>Ir a detalle</Link>
          <p onClick={() => this.anadirFav()}>{this.state.fotoFavoritos}</p>
        </div>
      </article>
    );
  }
}

export default MovieCard;
