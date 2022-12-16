import {
  FETCH_LAST_ROUTES_FAILURE,
  FETCH_LAST_ROUTES_REQUEST,
  FETCH_LAST_ROUTES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  lastRoutes: [],
  loadingStatus: 'idle',
  error: null,
};

export default function lastRoutesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LAST_ROUTES_REQUEST:
      return {
        ...state,
        loadingStatus: 'pending',
      };
    case FETCH_LAST_ROUTES_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loadingStatus: 'error',
        error,
      };
    case FETCH_LAST_ROUTES_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        lastRoutes: data,
        loadingStatus: 'success',
      };

    default:
      return state;
  }
}
