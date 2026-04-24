import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class SerieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoBoton: "Ver más",
      claseOculta: "oculta",
      fotoFavoritos: "♡",
    };
  }

  componentDidMount() {
    let storage = localStorage.getItem("FavoriteSeries");

    if (storage !== null) {
      let storageparse = JSON.parse(storage);

      if (storageparse.includes(this.props.serie.id)) {
        this.setState({ fotoFavoritos: "♥" });
      } else {
        this.setState({ fotoFavoritos: "♡" });
      }
    }
  }

  verDescripcion() {
    if (this.state.textoBoton === "Ver más") {
      this.setState({
        textoBoton: "Ver menos",
        claseOculta: "",
      });
    } else {
      this.setState({
        textoBoton: "Ver más",
        claseOculta: "oculta",
      });
    }
  }

  anadirFav() {
    if (!cookies.get('auth-user')) return;

    if (this.state.fotoFavoritos === "♡") {
      let storage = localStorage.getItem("FavoriteSeries");
      if (storage === null) {
        let primerfav = [this.props.serie.id];
        localStorage.setItem("FavoriteSeries", JSON.stringify(primerfav));
        this.setState({ fotoFavoritos: "♥" });
      } else {
        let storageparse = JSON.parse(storage);
        storageparse.push(this.props.serie.id);
        localStorage.setItem("FavoriteSeries", JSON.stringify(storageparse));
        this.setState({ fotoFavoritos: "♥" });
      }
    } else {
      let storage = localStorage.getItem("FavoriteSeries");
      let storageParse = JSON.parse(storage);
      let filtrado = storageParse.filter((id) => id !== this.props.serie.id);
      localStorage.setItem("FavoriteSeries", JSON.stringify(filtrado));
      this.setState({ fotoFavoritos: "♡" });
    }
  }

  render() {
    console.log(this.props);

    return (
      <article className="single-card-movie" key={this.props.serie.id}>
        <img
          src={"https://image.tmdb.org/t/p/w500" + this.props.serie.poster_path}
          className="card-img-top"
          alt={this.props.serie.name}
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.serie.name}</h5>
          <button onClick={() => this.verDescripcion()}>
            {this.state.textoBoton}
          </button>
          <p className={"card-text " + this.state.claseOculta}>
            {this.props.serie.overview}
          </p>
          <Link to={"/detailserie/" + this.props.serie.id}>Ir a detalle</Link>
          <p onClick={() => this.anadirFav()}>{this.state.fotoFavoritos}</p>
        </div>
      </article>
    );
  }
}

export default SerieCard;
