import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
// import Movies from "./screens/Movies/Movies";
//import Series from "./screens/Series/Series";
//import Favorites from "./screens/Favorites/Favorites";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
//import Results from "./screens/Results/Results";
//import DetailMovie from "./screens/DetailMovie/DetailMovie";
//import DetailSeries from "./screens/DetailSeries/DetailSeries";
// import NotFound from "./screens/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" component={Home} />
          {/* <Route path="/movies" component={Movies} /> */}
          {/* <Route path="/series" component={Series} /> */}
          {/* <Route path="/detailmovie/:id" component={DetailMovie} /> */}
          {/* <Route path="/detailseries/:id" component={DetailSeries} /> */}
          {/* <Route path="/favorites" component={Favorites} /> */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <Route path="/results/:busqueda" component={Results} /> () */}
          {/* <Route component={NotFound} /> */}
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
