import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import SerieCard from "../SerieCard/SerieCard";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Home(props){
    const [popularMovies, setPopularMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    const [popularSeries, setPopularSeries] = useState([])
    const [onAirSeries, setOnAirSeries] = useState([])

    const [query, setQuery] = useState("");

    const history = useHistory();
  
    const [textoBoton, setTextoBoton] = useState("Ver mas");
    const [claseOculta, setClaseOculta] = useState("oculta");

  useEffect(() => {
    const apiKey = "520cf7be1d7b48a01d4f5696ad4cbfaf";

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results.slice(0,5)))
      .catch((error) => console.log(error));


    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setPopularSeries(data.results.slice(0,5)))
      .catch((error) => console.log(error));
  },[]);


  function evitarSubmit(e){
    e.preventDefault();
    history.push("/results/" + query);
  }

  function controlarCambios(e) {
    setQuery(e.target.value)
  };
  

  function verDescripcion() {
    if (textoBoton === "Ver mas") {
        setTextoBoton("Ver menos");
        setClaseOculta("");
    } else {
        setTextoBoton("Ver mas");
        setClaseOculta("oculta");
    }
  }

  const inSession = cookies.get('auth-user');

return (
  <div>
    <form
      className="search-form"
      onSubmit={(e) => evitarSubmit(e)}
    >
          <input
            className="search-input"
            type="text"
            placeholder="Buscar película o serie..."
            onChange={(e) => controlarCambios(e)}
            value={query}
          />
          <input type="submit" value="🔍" />
        </form>
        <h2 className="alert alert-primary">Películas populares</h2>
        <Link to="/movies">Ver todas</Link>
        <section className="row cards">
          {popularMovies.length == 0 ? <p>Cargando...</p> : popularMovies.map((mov, idx) => (
            <MovieCard movie={mov} key={idx + mov.id} inSession={inSession} /> 
          ))}
        </section>


        <h2 className="alert alert-primary">Series populares</h2>
        <Link to="/series">Ver todas</Link>
        <section className="row cards">
          {popularSeries.map((ser, idx) => (
            <SerieCard serie={ser} key={idx + ser.id} inSession={inSession} />
          ))}
        </section>
      </div>
    );
}
export default Home;
