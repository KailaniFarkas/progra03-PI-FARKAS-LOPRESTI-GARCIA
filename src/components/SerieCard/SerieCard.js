import React, { Component } from "react";
import { Link } from "react-router-dom";

class SerieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoBoton: "Ver mas",
      claseOculta: "oculta",
    };
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
      <article className="single-card-movie" key={this.props.serie.id}>
        <img
          src={"https://image.tmdb.org/t/p/w500" + this.props.serie.poster_path}
          className="card-img-top"
          alt={this.props.serie.original_name}
        />
        <div className="cardBody">
          <h5 className="card-title">{this.props.serie.original_name}</h5>
          <button onClick={() => this.verDescripcion()}>
            {this.state.textoBoton}
          </button>
          <p className={"card-text " + this.state.claseOculta}>
            {this.props.serie.overview}
          </p>
          <Link to={"/detailserie/:" + this.props.serie.id}>Ir a detalle</Link>
        </div>
      </article>
    );
  }
}

export default SerieCard;
