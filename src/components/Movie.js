import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMovie } from "../actions/consumeApi";
import _ from "lodash";
import gotoIcon from "../resources/goto-icon.svg";

export const Movie = (props) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.Movie);

  let ID = props.id || window.location.href.split("/").pop();

  useEffect(() => {
    dispatch(GetMovie(ID));
  }, []);

  const showData = () => {
    if (movie.loading) {
      return (
        <div className="loading">
          <h2>Loading...</h2>
          <div className="loading__loader"></div>
        </div>
      );
    }

    if (movie.errorMessage !== "") {
      return (
        <div className="error-message">
          <h1>{Movie.errorMessage}</h1>
        </div>
      );
    }

    if (!_.isEmpty(movie.data)) {
      const data = movie.data;
      console.log(data);
      return (
        <div className="single_movie">
          <img
            className="single_movie__image"
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          />
          <div className="single_movie__infos">
            <h1 className="single_movie__title">{data.title}</h1>
            <p className="single_movie__info">Description: {data.overview}</p>
            <div className="single_movie__info-box">
              <div className="single_movie__info">
                Genres:
                {data.genres.map((genre, index) => {
                  return <p key={index}>{genre.name}</p>;
                })}
              </div>
              <p className="single_movie__info">Status: {data.status}</p>
              <p className="single_movie__info">
                Release date: {data.release_date}
              </p>
              <p className="single_movie__info">
                Runtime: {Math.round((data.runtime / 60) * 100) / 100} h
              </p>
            </div>
            <div className="single_movie__info-box">
              <p className="single_movie__info">
                Budget: ${data.budget / 1000000} million
              </p>
              <p className="single_movie__info">Revenue: ${data.revenue}</p>
              <p className="single_movie__info">Ratings: {data.vote_average}</p>
              <a className="single_movie__info" href={data.homepage}>
                <img
                  src={gotoIcon}
                  alt="go to website"
                  className="single_movie__icon"
                />
                Go to website
              </a>
            </div>
            <div className="single_movie__info">
              Production:
              {data.production_companies.map((company, index) => {
                return <p key={index}>{company.name}</p>;
              })}
            </div>
          </div>
        </div>
      );
    }
  };
  return <div>{showData()}</div>;
};
