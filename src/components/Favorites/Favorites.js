import {useState} from "react"
import MovieCard from "../MovieCard/MovieCard";
import SerieCard from "../SerieCard/SerieCard";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

function Favorites (props){
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [favoriteSeries, setFavoriteSeries] = useState([])

}

    useEffect (() => { 
        let apiKey = '520cf7be1d7b48a01d4f5696ad4cbfaf';
        let moviesStorage = localStorage.getItem('FavoriteMovies');
        if (moviesStorage !== null){
            let movieIds = JSON.parse(moviesStorage);
            let promesas = movieIds.map((id)=>
            fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey)
                .then((response)=>response.json())
            );
            Promise.all(promesas)
                .then((movies)=> this.setState({favoriteMovies: movies}))
                .catch((error)=> console.log(error));
        }
        let seriesStorage = localStorage.getItem('FavoriteSeries');
        if (seriesStorage !== null){
            let serieIds = JSON.parse(seriesStorage);
            let promesas = serieIds.map((id)=>
            fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + apiKey)
                .then((response)=>response.json())
            );
            Promise.all(promesas)
                .then((series)=> this.setState({favoriteSeries: series}))
                .catch((error)=> console.log(error));
        }
    }, [])

        return(
            <div>
            <h2 className="alert alert-primary">Películas favoritas</h2>
            <section className="row cards">
              {favoriteMovies.length > 0 ? (
                favoriteMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))
              ) : (
                <p>No tenés películas en favoritos.</p>
              )}
            </section>
    
            <h2 className="alert alert-warning">Series favoritas</h2>
            <section className="row cards">
              {favoriteSeries.length > 0 ? (
                favoriteSeries.map((serie) => (
                  <SerieCard serie={serie} key={serie.id} />
                ))
              ) : (
                <p>No tenés series en favoritos.</p>
              )}
            </section>
          </div>  
        );

export default Favorites;