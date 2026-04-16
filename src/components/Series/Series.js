import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SerieCard from "../SerieCard/SerieCard";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularSeries: [],
      query: '',
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ popularSeries: data.results });
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

  render() {
    return (
      <div>
        <form className="search-form" onSubmit={(event) => this.evitarSubmit(event)}>
          <input
            className="search-input" type="text" placeholder="Buscar película o serie..."
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.query}
          />
          <input type="submit" value="🔍" />
        </form>
        <h2 className="alert alert-primary">All series</h2>
        <section className="row cards">
          {this.state.popularSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser} />
          ))}
        </section>
      </div>
    );
  }
}

export default withRouter(Series);
