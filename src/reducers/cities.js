import {
  CHANGE_CITY_FIELD,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  SWAP_CITIES,
} from '../actions/actionTypes';

const initialState = {
  cityFrom: '',
  cityTo: '',
  citiesListFrom: [],
  citiesListTo: [],
  loadingStatus: 'idle',
  error: null,
};

export default function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CITY_FIELD:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    case SWAP_CITIES:
      const { cityFrom, cityTo } = state;
      return {
        ...state,
        cityFrom: cityTo,
        cityTo: cityFrom,
      };
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loadingStatus: 'pending',
      };
    case FETCH_CITIES_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loadingStatus: 'error',
        error,
      };
    case FETCH_CITIES_SUCCESS:
      const { direction, items } = action.payload;
      return {
        ...state,
        [direction]: items,
        loadingStatus: 'success',
      };
    default:
      return state;
  }
}
