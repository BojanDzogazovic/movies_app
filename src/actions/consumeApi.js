import axios from "axios";

export const GetMovieLists = (type, page) => async (dispatch) => {
  try {
    dispatch({ type: "MOVIES_LOADING" });

    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/${type}?api_key=f3e3f5a585f49807aa021686153ceaf6&language=en-US&page=${page}`
    );

    dispatch({ type: "MOVIES_SUCCESS", payload: results.data });
  } catch (e) {
    dispatch({ type: "MOVIES_FAILED" });
  }
};

export const GetMovie = (movie_id) => async (dispatch) => {
  try {
    dispatch({ type: "MOVIE_LOADING" });

    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=f3e3f5a585f49807aa021686153ceaf6&language=en-US`
    );

    dispatch({
      type: "MOVIE_SUCCESS",
      payload: results.data,
      movieID: movie_id,
    });
  } catch (e) {
    dispatch({ type: "MOVIE_FAILED" });
  }
};

export const SearchMovie = (query, page) => async (dispatch) => {
  try {
    dispatch({ type: "MOVIE_SEARCH_LOADING" });

    const results = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=f3e3f5a585f49807aa021686153ceaf6&language=en-US&query=${query}&page=${page}&include_adult=false`
    );

    dispatch({
      type: "MOVIE_SEARCH_SUCCESS",
      payload: results.data,
    });
  } catch (e) {
    dispatch({ type: "MOVIE_SEARCH_FAILED" });
  }
};
