import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieLists, SearchMovie } from "../actions/consumeApi";
import _ from "lodash";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const MoviesList = (props) => {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.MoviesList);
  const searchList = useSelector((state) => state.Search);
  const [topRated, setTopRated] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  const [popular, setPopular] = useState(true);

  const {
    type: [type, setType],
    id: [id, setId],
    page: [page, setPage],
    searchPage: [searchPage, setSearchPage],
    search: [search, setSearch],
  } = {
    type: useState("popular"),
    id: useState(0),
    page: useState(1),
    searchPage: useState(1),
    search: useState(""),
    ...(props.state || {}),
  };

  useEffect(() => {
    dispatch(GetMovieLists(type, page));

    if (type === "popular") {
      setTopRated(false);
      setUpcoming(false);
      setPopular(true);
    } else if (type === "top_rated") {
      setTopRated(true);
      setUpcoming(false);
      setPopular(false);
    } else if (type === "upcoming") {
      setTopRated(false);
      setUpcoming(true);
      setPopular(false);
    }
  }, [type]);

  const showData = () => {
    if (moviesList.loading) {
      return (
        <div className="loading">
          <h2>Loading...</h2>
          <div className="loading__loader"></div>
        </div>
      );
    }

    if (!_.isEmpty(moviesList.data) && _.isEmpty(searchList.data)) {
      return (
        <div className="movies">
          {moviesList.data.results.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                onClick={(e) => {
                  setId(movie.id);
                }}
              >
                <div className="movie">
                  <img
                    className="movie__thumbnail"
                    src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <p className="movie__title">{movie.title}</p>
                  <p className="movie__ratings">{movie.vote_average}</p>
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else if (!_.isEmpty(searchList.data)) {
      return (
        <div className="movies">
          {searchList.data.results.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                onClick={(e) => {
                  setId(movie.id);
                }}
              >
                <div className="movie">
                  <img
                    className="movie__thumbnail"
                    src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <p className="movie__title">{movie.title}</p>
                  <p className="movie__ratings">{movie.vote_average}</p>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="movie__filters">
        <button
          className={`movie__filter movie__filter--${topRated ? "active" : ""}`}
          onClick={(e) => {
            searchList.data = [];
            setSearch("");
            setType("top_rated");
            setPage(1);
            setSearchPage(1);
          }}
        >
          Top Rated Movies
        </button>
        <button
          className={`movie__filter movie__filter--${popular ? "active" : ""}`}
          onClick={(e) => {
            searchList.data = [];
            setSearch("");
            setType("popular");
            setPage(1);
            setSearchPage(1);
          }}
        >
          Popular Movies
        </button>
        <button
          className={`movie__filter movie__filter--${upcoming ? "active" : ""}`}
          onClick={(e) => {
            searchList.data = [];
            setSearch("");
            setType("upcoming");
            setPage(1);
            setSearchPage(1);
          }}
        >
          Upcoming Movies
        </button>
      </div>
      <div className="search-box">
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          placeholder="Search Movies..."
          className="search-box__input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchPage(1);
            if (e.target.value.length == 0) {
              searchList.data = [];
            }
          }}
        />
        <button
          className="search-box__btn"
          onClick={() => {
            setSearchPage(1);
            dispatch(SearchMovie(search));
          }}
        >
          Search
        </button>
      </div>
      {showData()}
      {_.isEmpty(searchList.data) && (
        <ReactPaginate
          pageCount={moviesList.data.total_pages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          containerClassName={"pagination"}
          onPageChange={(data) => {
            setPage(data.selected + 1);
            dispatch(GetMovieLists(type, data.selected + 1));
          }}
          initialPage={page - 1}
        />
      )}
      {!_.isEmpty(searchList.data) && (
        <ReactPaginate
          pageCount={searchList.data.total_pages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          containerClassName={"pagination"}
          onPageChange={(data) => {
            setSearchPage(data.selected + 1);
            dispatch(SearchMovie(search, data.selected + 1));
          }}
          initialPage={searchPage - 1}
        />
      )}
    </div>
  );
};
