import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SerieCard from "../SerieCard/SerieCard";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularSeries: [],
      onAirSeries: [],
      topRatedSeries: [],

      popularSeriesbkp: [],
      query: "",
      proxPagNum: 2,
      proxPagNumOnAir: 2,
      proxPagNumTopRated:2,
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          popularSeries: data.results,
          popularSeriesbkp: data.results,
        });
      })
      .catch((error) => console.log(error));

    fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ onAirSeries: data.results });
      })
      .catch((error) => console.log(error));


    fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ topRatedSeries: data.results });
        })
        .catch((error) => console.log(error));
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({ query: event.target.value }, () => {
      const seriesFiltradas = this.state.popularSeriesbkp.filter((serie) =>
        serie.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      this.setState({ popularSeries: seriesFiltradas });
    });
  }

  masSeries() {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&page=" +
        this.state.proxPagNum
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          popularSeries: this.state.popularSeries.concat(data.results),
          popularSeriesbkp: this.state.popularSeriesbkp.concat(data.results),
          proxPagNum: (this.state.proxPagNum += 1),
        })
      )
      .catch((error) => console.log(error));
  }


  masOnAirSeries() {
    fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&page=" +
        this.state.proxPagNumOnAir
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          onAirSeries: this.state.onAirSeries.concat(data.results),
          proxPagNumOnAir: (this.state.proxPagNumOnAir += 1),
        })
      )
      .catch((error) => console.log(error));
  }

  masTopRatedSeries() {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&page=" +
        this.state.proxPagNumTopRated
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          topRatedSeries: this.state.topRatedSeries.concat(data.results),
          proxPagNumTopRated: (this.state.proxPagNumTopRated += 1),
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
            placeholder="Buscar serie..."
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.query}
          />
          <input type="submit" value="🔍" />
        </form>
        <h2 className="alert alert-primary">Series populares</h2>
        <section className="row cards">
          {this.state.popularSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser} />
          ))}
        </section>
        <p onClick={() => this.masSeries()} className="texto">
          Cargar más
        </p>

        <h2 className="alert alert-primary">Series en emision</h2>
        <section className="row cards">
          {this.state.onAirSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser} />
          ))}
        </section>
        <p onClick={() => this.masOnAirSeries()} className="texto">
          Cargar más
        </p>

        <h2 className="alert alert-primary">Series mejor rankeadas</h2>
        <section className="row cards">
          {this.state.topRatedSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser} />
          ))}
        </section>
        <p onClick={() => this.masTopRatedSeries()} className="texto">
          Cargar más
        </p>
      </div>
    );
  }
}

export default withRouter(Series);
