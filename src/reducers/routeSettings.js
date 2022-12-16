import {
  FETCH_ROUTES_FAILURE,
  FETCH_ROUTES_REQUEST,
  FETCH_ROUTES_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ROUTE_SETTING,
} from '../actions/actionTypes';

const initialState = {
  routeSet: {
    from_city_id: localStorage.getItem('from_city_id') ? localStorage.getItem('from_city_id') : '',
    to_city_id: localStorage.getItem('to_city_id') ? localStorage.getItem('to_city_id') : '',
    date_start: '',
    date_end: '',
    date_start_arrival: null,
    date_end_arrival: null,
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    have_express: false,
    price_from: 0,
    price_to: 10000,
    start_departure_hour_from: 0,
    start_departure_hour_to: 24,
    start_arrival_hour_from: 0,
    start_arrival_hour_to: 24,
    end_departure_hour_from: 0,
    end_departure_hour_to: 24,
    end_arrival_hour_from: 0,
    end_arrival_hour_to: 24,
    limit: 5,
    offset: 0,
    sort: 'date',
  },
  routes: {
    total_count: 0,
    items: [],
  },
  currentPage: 1,
  loadingStatus: 'idle',
  error: null,
};

export default function routeSettingsReducer(state = initialState, action) {
  const { routeSet } = state;
  switch (action.type) {
    case SET_ROUTE_SETTING:
      const { name, value } = action.payload;
      return {
        ...state,
        routeSet: {
          ...routeSet,
          [name]: value,
        },
      };
    case SET_CURRENT_PAGE:
      const { number } = action.payload;
      return {
        ...state,
        currentPage: number,
        routeSet: {
          ...routeSet,
          offset: routeSet.limit * (number - 1),
        },
      };
    case FETCH_ROUTES_REQUEST:
      return {
        ...state,
        loadingStatus: 'pending',
        error: null,
      };
    case FETCH_ROUTES_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loadingStatus: 'error',
        error,
      };
    case FETCH_ROUTES_SUCCESS:
      const { data } = action.payload;
      const { routes } = state;
      return {
        ...state,
        routes: {
          ...routes,
          total_count: data.total_count,
          items: data.items,
        },
        loadingStatus: 'success',
        error: null,
      };
    default:
      return state;
  }
}
