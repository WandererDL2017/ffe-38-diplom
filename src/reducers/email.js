import {
  CHANGE_EMAIL_FIELD, FETCH_EMAIL_FAILURE, FETCH_EMAIL_REQUEST, FETCH_EMAIL_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  email: '',
  loadingStatus: 'idle',
  error: null,
};

export default function emailReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL_FIELD:
      const { value } = action.payload;
      return {
        ...state,
        email: value,
      };
    case FETCH_EMAIL_REQUEST:
      return {
        ...state,
        loadingStatus: 'pending',
        error: null,
      };
    case FETCH_EMAIL_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loadingStatus: 'error',
        error,
      };
    case FETCH_EMAIL_SUCCESS:
      return {
        ...state,
        email: '',
        loadingStatus: 'success',
        error: null,
      };
    default:
      return state;
  }
}
