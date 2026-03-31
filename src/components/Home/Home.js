import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
    };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf')
      .then(response => response.json())
      .then(data => {
        this.setState({ popularMovies: data.results });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Popular movies this week</h2>
        <section className="row cards">
          {this.state.popularMovies.map((movie) => (
            <article className="single-card-movie" key={movie.id}>
              <img
                src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="cardBody">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

export default Home;