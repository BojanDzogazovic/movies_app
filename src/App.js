import "./App.scss";
import { useState } from "react";
import { Header } from "./components/Header";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { MoviesList } from "./components/MoviesList";
import { Movie } from "./components/Movie";
import backIcon from "./resources/back-icon.svg";

function App() {
  const [type, setType] = useState("popular");
  const [id, setId] = useState();
  const [page, setPage] = useState();
  const [searchPage, setSearchPage] = useState();
  const [search, setSearch] = useState();

  return (
    <>
      <Switch>
        <Route path={`/${type}`} exact component={MoviesList}>
          <Header />
          <MoviesList
            state={{
              type: [type, setType],
              id: [id, setId],
              page: [page, setPage],
              searchPage: [searchPage, setSearchPage],
              search: [search, setSearch],
            }}
          />
        </Route>
        <Route path={"/movie/:movie"} exact component={Movie}>
          <NavLink className="go_back" to={"/"}>
            <img className="go_back__icon" src={backIcon} alt="go_back_icon" />
            Back to Movies
          </NavLink>
          <Movie id={id} />
        </Route>
        <Redirect to={`/${type}`} />
      </Switch>
    </>
  );
}

export default App;
