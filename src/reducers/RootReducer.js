import { combineReducers } from "redux";
import { MoviesReducer } from "./MoviesReducer";
import { MovieReducer } from "./MovieReducer";
import { SearchReducer } from "./SearchReducer";

const RootReducer = combineReducers({
  MoviesList: MoviesReducer,
  Movie: MovieReducer,
  Search: SearchReducer,
});

export default RootReducer;
