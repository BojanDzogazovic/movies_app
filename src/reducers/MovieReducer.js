const DefaultState = {
  loading: false,
  data: {},
  errorMessage: "",
};

export const MovieReducer = (state = DefaultState, action) => {
  state.data = {};

  switch (action.type) {
    case "MOVIE_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "MOVIE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: "",
        data: action.payload,
      };
    case "MOVIE_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Sorry! There was an error!",
      };
    default:
      return state;
  }
};
