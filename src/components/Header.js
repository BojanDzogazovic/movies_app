import React from "react";
import movieIcon from "../resources/movie-icon.svg";

export const Header = () => {
  return (
    <header className="header">
      <img className="header__icon" src={movieIcon} alt="movie-icon" />
      <h1 className="header__title">Movies app</h1>
    </header>
  );
};
