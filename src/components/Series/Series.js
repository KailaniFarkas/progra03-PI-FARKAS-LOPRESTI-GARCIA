import React, { Component } from "react";
import SerieCard from "../SerieCard/SerieCard";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularSeries: [],
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

  render() {
    return (
      <div>
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

export default Series;
