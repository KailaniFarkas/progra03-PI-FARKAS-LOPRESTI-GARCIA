import Home from "../../components/Home/Home";

function HomeScreen() {
  return (
    <>
      <form className="search-form">
        <label>Search Bar</label>
        <input></input>
      </form>
      <Home />
    </>
  );

function HomeScreen(props) {
  return <Home history={props.history} />;
}

export default HomeScreen;
