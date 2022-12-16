import {
  CHANGE_CITY_FIELD,
  CHANGE_EMAIL_FIELD,
  CHANGE_PASSENGER_FIELD,
  CHANGE_QUANTITY_FIELD,
  CHANGE_USER_FIELD,
  CLEAR_ORDER,
  CLEAR_PASSENGERS,
  CLEAR_SEATS,
  CLOSE_ERROR,
  CLOSE_INFO,
  DELETE_PASSENGER,
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_EMAIL_FAILURE,
  FETCH_EMAIL_REQUEST,
  FETCH_EMAIL_SUCCESS,
  FETCH_LAST_ROUTES_FAILURE,
  FETCH_LAST_ROUTES_REQUEST,
  FETCH_LAST_ROUTES_SUCCESS,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ROUTES_FAILURE,
  FETCH_ROUTES_REQUEST,
  FETCH_ROUTES_SUCCESS,
  FETCH_SEATS_FAILURE,
  FETCH_SEATS_REQUEST,
  FETCH_SEATS_SUCCESS,
  SET_CHOOSEN_SEAT,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_INFO,
  SET_NEW_PASSENGER,
  SET_PASSENGER_COMPLETE,
  SET_ROUTE_SETTING,
  SET_TOTAL_PRICE,
  SET_TRAIN,
  SWAP_CITIES,
} from './actionTypes';

export const changeCityField = (name, value) => ({
  type: CHANGE_CITY_FIELD,
  payload: {
    name,
    value,
  },
});

export const swapCities = () => ({
  type: SWAP_CITIES,
});

export const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST,
});

export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: {
    error,
  },
});

export const fetchCitiesSuccess = (direction, items) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: {
    direction,
    items,
  },
});

export const setRouteSetting = (name, value) => ({
  type: SET_ROUTE_SETTING,
  payload: {
    name,
    value,
  },
});

export const fetchRoutesRequest = () => ({
  type: FETCH_ROUTES_REQUEST,
});

export const fetchRoutesFailure = (error) => ({
  type: FETCH_ROUTES_FAILURE,
  payload: {
    error,
  },
});

export const fetchRoutesSuccess = (data) => ({
  type: FETCH_ROUTES_SUCCESS,
  payload: {
    data,
  },
});

export const fetchLastRoutesRequest = () => ({
  type: FETCH_LAST_ROUTES_REQUEST,
});

export const fetchLastRoutesFailure = (error) => ({
  type: FETCH_LAST_ROUTES_FAILURE,
  payload: {
    error,
  },
});

export const fetchLastRoutesSuccess = (data) => ({
  type: FETCH_LAST_ROUTES_SUCCESS,
  payload: {
    data,
  },
});

export const changeEmailField = (value) => ({
  type: CHANGE_EMAIL_FIELD,
  payload: {
    value,
  },
});

export const fetchEmailRequest = () => ({
  type: FETCH_EMAIL_REQUEST,
});

export const fetchEmailFailure = (error) => ({
  type: FETCH_EMAIL_FAILURE,
  payload: {
    error,
  },
});

export const fetchEmailSuccess = () => ({
  type: FETCH_EMAIL_SUCCESS,
});

export const setCurrentPage = (number) => ({
  type: SET_CURRENT_PAGE,
  payload: {
    number,
  },
});

export const setTrain = (route) => ({
  type: SET_TRAIN,
  payload: {
    route,
  },
});

export const fetchSeatsRequest = () => ({
  type: FETCH_SEATS_REQUEST,
});

export const fetchSeatsFailure = (error) => ({
  type: FETCH_SEATS_FAILURE,
  payload: {
    error,
  },
});

export const fetchSeatsSuccess = (data) => ({
  type: FETCH_SEATS_SUCCESS,
  payload: {
    data,
  },
});

export const changeQuantityField = (name, value) => ({
  type: CHANGE_QUANTITY_FIELD,
  payload: {
    name,
    value,
  },
});

export const setNewPassenger = (number) => ({
  type: SET_NEW_PASSENGER,
  payload: {
    number,
  },
});

export const setPassengerComplete = (idx) => ({
  type: SET_PASSENGER_COMPLETE,
  payload: {
    idx,
  },
});

export const deletePassenger = (nmb) => ({
  type: DELETE_PASSENGER,
  payload: {
    nmb,
  },
});

export const changePassengerField = (name, value, passNumber) => ({
  type: CHANGE_PASSENGER_FIELD,
  payload: {
    name,
    value,
    passNumber,
  },
});

export const changeUserField = (name, value) => ({
  type: CHANGE_USER_FIELD,
  payload: {
    name,
    value,
  },
});

export const setChoosenSeat = (coach, place, price) => ({
  type: SET_CHOOSEN_SEAT,
  payload: {
    coach,
    place,
    price,
  },
});

export const setError = () => ({
  type: SET_ERROR,
});

export const closeError = () => ({
  type: CLOSE_ERROR,
});

export const setInfo = (messageMain, messageDetails, type) => ({
  type: SET_INFO,
  payload: {
    messageMain,
    messageDetails,
    type,
  },
});

export const closeInfo = () => ({
  type: CLOSE_INFO,
});

export const fetchOrderRequest = () => ({
  type: FETCH_ORDER_REQUEST,
});

export const fetchOrderFailure = (error) => ({
  type: FETCH_ORDER_FAILURE,
  payload: {
    error,
  },
});

export const fetchOrderSuccess = (data) => ({
  type: FETCH_ORDER_SUCCESS,
  payload: {
    data,
  },
});

export const setTotalPrice = (price) => ({
  type: SET_TOTAL_PRICE,
  payload: {
    price,
  },
});

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});

export const clearPassengers = () => ({
  type: CLEAR_PASSENGERS,
});

export const clearSeats = () => ({
  type: CLEAR_SEATS,
});

export const fetchCities = (nameList, search) => async (dispatch) => {
  dispatch(fetchCitiesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}routes/cities?name=${search}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchCitiesSuccess(nameList, data));
  } catch (e) {
    dispatch(fetchCitiesFailure(e.message));
    dispatch(setError);
  }
};

export const fetchRoutes = (data) => async (dispatch) => {
  dispatch(fetchRoutesRequest());
  try {
    let dataUrl = '';
    for (const item in data) {
      const value = data[item];
      if (value && value !== 0 && value !== 24) {
        dataUrl += `&${item}=${value}&`;
      }
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}routes?${dataUrl}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const reguest = await response.json();
    dispatch(fetchRoutesSuccess(reguest));
  } catch (e) {
    dispatch(fetchRoutesFailure(e.message));
    dispatch(setError);
  }
};

export const fetchLastRoutes = () => async (dispatch) => {
  dispatch(fetchLastRoutesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}routes/last`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchLastRoutesSuccess(data));
  } catch (e) {
    dispatch(fetchLastRoutesFailure(e.message));
    dispatch(setError);
  }
};

export const fetchEmail = (email) => async (dispatch) => {
  dispatch(fetchEmailRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}subscribe?email=${email}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchEmailSuccess());
    if (data.status) {
      dispatch(setInfo(
        'Вы успешно подписались на рассылку',
        '',
        'info',
      ));
    }
  } catch (e) {
    dispatch(fetchEmailFailure(e.message));
    dispatch(setError);
  }
};

export const fetchSeats = (id, data) => async (dispatch) => {
  dispatch(fetchSeatsRequest());
  try {
    let dataUrl = '';
    for (const item in data) {
      const value = data[item];
      if (value && value !== 0 && value !== 24) {
        dataUrl += `&${item}=${value}&`;
      }
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}routes/${id}/seats?${dataUrl}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const reguest = await response.json();
    dispatch(fetchSeatsSuccess(reguest));
  } catch (e) {
    dispatch(fetchSeatsFailure(e.message));
    dispatch(setError);
  }
};

export const fetchOrder = (order, callback) => async (dispatch) => {
  dispatch(fetchOrderRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}order`, {
      method: 'POST',
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchOrderSuccess(data));
    if (data.status) {
      callback();
    }
  } catch (e) {
    dispatch(fetchOrderFailure(e.message));
    dispatch(setError);
  }
};
