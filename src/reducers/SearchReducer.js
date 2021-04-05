const DefaultState = {
  loading: false,
  data: [],
  errorMessage: "",
};

export const SearchReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "MOVIE_SEARCH_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "MOVIE_SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
      };
    case "MOVIE_SEARCH_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Sorry! There was an error!",
      };
    default:
      return state;
  }
};
