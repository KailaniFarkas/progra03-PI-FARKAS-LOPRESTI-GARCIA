import {useState, useEffect} from "react"
import SerieCard from "../SerieCard/SerieCard";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Series (props) {
  const [popularSeries, setPopularSeries] = useState([])
  const [popularSeriesbkp, setPopularSeriesbkp] = useState([])
  const [query, setQuery] = useState("")
  const [proxPagNum, setProxPagNum] = useState(2)

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf"
    )
      .then((response) => response.json())
      .then((data) => {
        setPopularSeries(data.results)
        setPopularSeriesbkp(data.results)
      })
      .catch((error) => console.log(error));
  }, [])

  function evitarSubmit(e) {
    e.preventDefault();
  }

  function controlarCambios(e) {
    const valor = e.target.value;
    setQuery(valor);
    const seriesFiltradas = popularSeriesbkp.filter((serie) =>
      serie.name.toLowerCase().includes(valor.toLowerCase())
    );
    setPopularSeries(seriesFiltradas);
  }

  function masSeries() {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=520cf7be1d7b48a01d4f5696ad4cbfaf&page=" +
        proxPagNum
    )
      .then((response) => response.json())
      .then((data) => {
        setPopularSeries(popularSeries.concat(data.results))
        setPopularSeriesbkp(popularSeriesbkp.concat(data.results))
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
          placeholder="Buscar serie..."
          onChange={(event) => controlarCambios(event)}
          value={query}
        />
        <input type="submit" value="🔍" />
      </form>
      <h2 className="alert alert-primary">Series populares</h2>
      <section className="row cards">
        {popularSeries.length === 0 ? <p>Cargando...</p> : popularSeries.map((ser) => (
          <SerieCard serie={ser} key={ser.id} inSession={cookies.get('auth-user') ? true : false} />
        ))}
      </section>
      <p onClick={() => masSeries()} className="texto">
        Cargar más
      </p>
    </div>
  );
}

export default (Series);
