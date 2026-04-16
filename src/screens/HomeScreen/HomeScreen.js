import Home from "../../components/Home/Home";

function HomeScreen(props) {
  return (
    <>
      <Home history={props.history} />
    </>
  );
}

export default HomeScreen;
