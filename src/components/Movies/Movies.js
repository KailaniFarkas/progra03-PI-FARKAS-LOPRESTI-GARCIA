import {useState, useEffect} from "react"
import MovieCard from "../MovieCard/MovieCard";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Movies (props) {
  const [popularMovies, setPopularMovies] = useState([])
  const [popularMoviesbkp, setPopularMoviesbkp] = useState([])
  const [query, setQuery] = useState("")
  const [proxPagNum, setProxPagNum] = useState(2)

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results)
        setPopularMoviesbkp(data.results)
      })
      .catch((error) => console.log(error));
  }, [])

  function evitarSubmit(e) {
    e.preventDefault();
  }

  function controlarCambios(e) {
    const valor = e.target.value;
    setQuery(valor);
    const moviesFiltradas = popularMoviesbkp.filter((movie) =>
      movie.title.toLowerCase().includes(valor.toLowerCase())
    );
    setPopularMovies(moviesFiltradas);
  }

  function masPeliculas() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&page=" +
        proxPagNum
    )
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(popularMovies.concat(data.results))
        setPopularMoviesbkp(popularMoviesbkp.concat(data.results))
        setProxPagNum(proxPagNum + 1)
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form
        className="search-form"
        onSubmit={(event) => evitarSubmit(event)}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Buscar película..."
          onChange={(event) => controlarCambios(event)}
          value={query}
        />
        <input type="submit" value="🔍" />
      </form>

      <h2 className="alert alert-primary">Películas populares</h2>
      <section className="row cards">
        {popularMovies.length === 0 ? <p>Cargando...</p> : popularMovies.map((mov) => (
          <MovieCard movie={mov} key={mov.id} inSession={!!cookies.get('auth-user')} />
        ))}
      </section>
      <p onClick={() => masPeliculas()} className="texto">
        Cargar más
      </p>
    </div>
  );
}

export default Movies;
