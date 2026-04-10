import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
//import Movies from "./screens/Movies/Movies";
//import Series from "./screens/Series/Series";
import Favorites from "./screens/Favorites/Favorites";
import MoviesScreen from "./screens/MoviesScreen/MoviesScreen";
import SeriesScreen from "./screens/SeriesScreen/SeriesScreen";
//import Favorites from "./screens/Favorites/Favorites";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
//import Results from "./screens/Results/Results";
//import DetailMovie from "./screens/DetailMovie/DetailMovie";
//import DetailSeries from "./screens/DetailSeries/DetailSeries";
//import NotFound from "./screens/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/movies" component={MoviesScreen} />
          <Route path="/series" component={SeriesScreen} />
          {/* <Route path="/detailmovie/:id" component={Detail} /> */}
          {/* <Route path="/detailseries/:id" component={Detail} /> */}
          <Route path="/favorites" component={Favorites} />
          {<Route path="/login" component={Login} />}
          {<Route path="/register" component={Register} />}
          {<Route path="/" component={HomeScreen} />}
          {/* <Route path="/results/:busqueda" component={Results} /> () */}
          {/* <Route component={NotFound} /> */}
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
