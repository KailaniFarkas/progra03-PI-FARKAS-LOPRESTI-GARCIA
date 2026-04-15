import React, {Component} from 'react';
import MovieCard from "../MovieCard/MovieCard";
import SerieCard from "../SerieCard/SerieCard";

class Favorites extends Component{
    constructor(props){
        super(props);
        this.state = {
            favoriteMovies: [],
            favoriteSeries: [],
        };
    }

    componentDidMount (){
        let apiKey = '520cf7be1d7b48a01d4f5696ad4cbfaf';
        let moviesStorage = localStorage.getItem('FavoriteMovies');
        if (moviesStorage !== null){
            let movieIds = JSON.parse(moviesStorage);
            let promesas = movieIds.map((id)=>
            fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey)
                .then((response)=>response.json())
            );
            Promise.all(promesas)
                .then((series)=> this.setState({favoriteSeries: series}))
                .catch((error)=> console.log(error));
        }
    }
    render(){
        return(
            <div>
            <h2 className="alert alert-primary">Películas favoritas</h2>
            <section className="row cards">
              {this.state.favoriteMovies.length > 0 ? (
                this.state.favoriteMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))
              ) : (
                <p>No tenés películas en favoritos.</p>
              )}
            </section>
    
            <h2 className="alert alert-warning">Series favoritas</h2>
            <section className="row cards">
              {this.state.favoriteSeries.length > 0 ? (
                this.state.favoriteSeries.map((serie) => (
                  <SerieCard serie={serie} key={serie.id} />
                ))
              ) : (
                <p>No tenés series en favoritos.</p>
              )}
            </section>
          </div>  
        );
    }
}

export default Favorites;