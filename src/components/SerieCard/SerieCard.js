import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SerieCard (props) {
  const { serie, inSession } = props;
  const [textoBoton, setTextoBoton] = useState("Ver más")
  const [claseOculta, setClaseOculta] = useState("oculta")
  const [fotoFavoritos, setFotoFavoritos] = useState("♡")

  useEffect(() => {
    let storage = localStorage.getItem("FavoriteSeries");
    if (storage !== null) {
      let storageparse = JSON.parse(storage);
      if (storageparse.includes(serie.id)) {
        setFotoFavoritos("♥");
      } else {
        setFotoFavoritos("♡");
      }
    }
  }, [])

  function verDescripcion() {
    if (textoBoton === "Ver más") {
      setTextoBoton("Ver menos");
      setClaseOculta("");
    } else {
      setTextoBoton("Ver más");
      setClaseOculta("oculta");
    }
  }

  function anadirFav() {
    if (!cookies.get('auth-user')) return;

    if (fotoFavoritos === "♡") {
      let storage = localStorage.getItem("FavoriteSeries");
      if (storage === null) {
        let primerfav = [serie.id];
        localStorage.setItem("FavoriteSeries", JSON.stringify(primerfav));
        setFotoFavoritos("♥");
      } else {
        let storageparse = JSON.parse(storage);
        storageparse.push(serie.id);
        localStorage.setItem("FavoriteSeries", JSON.stringify(storageparse));
        setFotoFavoritos("♥");
      }
    } else {
      let storage = localStorage.getItem("FavoriteSeries");
      let storageParse = JSON.parse(storage);
      let filtrado = storageParse.filter((id) => id !== serie.id);
      localStorage.setItem("FavoriteSeries", JSON.stringify(filtrado));
      setFotoFavoritos("♡");
    }
  }

  return (
    <article className="single-card-movie">
      <img
        src={"https://image.tmdb.org/t/p/w500" + serie.poster_path}
        className="card-img-top"
        alt={serie.name}
      />
      <div className="cardBody">
        <h5 className="card-title">{serie.name}</h5>
        <button onClick={() => verDescripcion()}>
          {textoBoton}
        </button>
        <p className={"card-text " + claseOculta}>
          {serie.overview}
        </p>
        <Link to={"/detailserie/" + serie.id}>Ir a detalle</Link>
        {inSession && <p onClick={() => anadirFav()}>{fotoFavoritos}</p>}
      </div>
    </article>
  );
}

export default SerieCard;
