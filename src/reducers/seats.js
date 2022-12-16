import {
  CHANGE_QUANTITY_FIELD,
  CLEAR_SEATS,
  FETCH_SEATS_FAILURE,
  FETCH_SEATS_REQUEST,
  FETCH_SEATS_SUCCESS,
  SET_CHOOSEN_SEAT,
  SET_TRAIN,
} from '../actions/actionTypes';

const initialState = {
  route: null,
  seats: null,
  choosenSeats: [],
  loadingStatus: 'idle',
  error: null,
  quantity: {
    adultQuantity: 1,
    childQuantity: 0,
    childWithoutSeatQuantity: 0,
  },
};

export default function seatsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRAIN:
      const { route } = action.payload;
      return {
        ...state,
        route,
      };
    case CHANGE_QUANTITY_FIELD:
      const { name, value } = action.payload;
      const { quantity } = state;
      return {
        ...state,
        quantity: {
          ...quantity,
          [name]: value,
        },
      };
    case FETCH_SEATS_REQUEST:
      return {
        ...state,
        loadingStatus: 'pending',
        error: null,
      };
    case FETCH_SEATS_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loadingStatus: 'error',
        error,
      };
    case FETCH_SEATS_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        seats: data,
        loadingStatus: 'success',
        error: null,
      };
    case SET_CHOOSEN_SEAT:
      const { coach, place, price } = action.payload;
      const { choosenSeats } = state;
      if (choosenSeats.length === 0) {
        return {
          ...state,
          choosenSeats: [{ coach, seats: [{ place, price }] }],
        };
      }
      const idx = choosenSeats.findIndex((item) => item.coach === coach);
      if (idx === -1) {
        return {
          ...state,
          choosenSeats: [...choosenSeats, { coach, seats: [{ place, price }] }],
        };
      }
      const placeIdx = choosenSeats[idx].seats.findIndex((item) => item.place === place);
      if (placeIdx !== -1) {
        choosenSeats[idx].seats = choosenSeats[idx].seats.filter((item) => item.place !== place);
        return {
          ...state,
          choosenSeats: [...choosenSeats],
        };
      }
      choosenSeats[idx].seats.push({ place, price });
      return {
        ...state,
        choosenSeats: [...choosenSeats],

      };
    case CLEAR_SEATS:
      return initialState;
    default:
      return state;
  }
}
