const DefaultState = {
  loading: false,
  data: [],
  errorMessage: "",
};

export const MoviesReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "MOVIES_LOADING":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMessage: "",
      };
    case "MOVIES_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: "Sorry! There was an error!",
      };
    default:
      return state;
  }
};
