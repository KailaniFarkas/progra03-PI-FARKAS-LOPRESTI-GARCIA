import React, { Component } from "react";

class DetailSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: {},
      fotoFavoritos: "♡",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        this.props.match.params.id +
        "?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ serie: data });
      
        let storage = localStorage.getItem("FavoriteSeries");
        if (storage !== null) {
          let storageparse = JSON.parse(storage);
          if (storageparse.includes(data.id)) {
            this.setState({ fotoFavoritos: "♥" });
          } else {
            this.setState({ fotoFavoritos: "♡" });
          }
        }
    })
    .catch((error) => console.log(error));
  }

  anadirFav() {
    if (this.state.fotoFavoritos === "♡") {
      let storage = localStorage.getItem("FavoriteSeries");
      if (storage === null) {
        let primerfav = [this.state.serie.id];
        localStorage.setItem("FavoriteSeries", JSON.stringify(primerfav));
        this.setState({ fotoFavoritos: "♥" });
      } else {
        let storageparse = JSON.parse(storage);
        storageparse.push(this.state.serie.id);
        localStorage.setItem("FavoriteSeries", JSON.stringify(storageparse));
        this.setState({ fotoFavoritos: "♥" });
      }
    } else {
      let storage = localStorage.getItem('FavoriteSeries');
      let storageparse = JSON.parse(storage);
      let filtrado = storageparse.filter((id) => id !== this.state.serie.id);
      localStorage.setItem('FavoriteSeries', JSON.stringify(filtrado));
      this.setState({ fotoFavoritos: '♡' });
    }
  }

  render() {
    console.log(this.state.serie);
      return (
        <div>
          <h2 className="alert alert-warning">{this.state.serie.name}</h2>
          <section className="row">
            <section className="col-md-6 info">
                <h3>Descripción</h3>
                <p className="description">{this.state.serie.overview}</p>
                <p className="mt-0 mb-0" id="release-date">
                  <strong>Fecha de estreno:</strong> {this.state.serie.first_air_date}
                </p>
                <p className="mt-0 mb-0" id="episodes">
                  <strong>Número de capítulos:</strong>{this.state.serie.number_of_episodes}
                </p>
                <p className="mt-0 seasons">
                  <strong>Temporadas:</strong>{this.state.serie.number_of_seasons}
                </p>
                <p className="mt-0 mb-0">
                  <strong>Puntuación:</strong> {this.state.serie.vote_average}
                </p>
                <p className="mt-0 mb-0">
                  <strong>Géneros:</strong>{' '}
                  {this.state.serie.genres
                    ? this.state.serie.genres.map((g) => g.name).join(', '): 'Cargando...'}
                </p>
                <p onClick={() => this.anadirFav()}>
                  {this.state.fotoFavoritos}
                </p>
              </section>
              <img
                className="col-md-6"
                src={'https://image.tmdb.org/t/p/w500' + this.state.serie.poster_path}
                alt={this.state.serie.name}
              />
          </section>
        </div>
      );
    }
  }

export default DetailSerie;
