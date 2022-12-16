import {
  CLEAR_ORDER,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  SET_TOTAL_PRICE,
} from '../actions/actionTypes';

const initialState = {
  totalPrice: '',
  response: '',
  loadingStatus: 'idle',
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_PRICE:
      const { price } = action.payload;
      console.log(price);
      return {
        ...state,
        totalPrice: price,
      };
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loadingStatus: 'pending',
      };
    case FETCH_ORDER_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loadingStatus: 'error',
        error,
      };
    case FETCH_ORDER_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        response: data,
        loadingStatus: 'success',
      };
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
}
