import { configureStore, combineReducers } from '@reduxjs/toolkit';
import citiesReducer from '../reducers/cities';
import emailReducer from '../reducers/email';
import lastRoutesReducer from '../reducers/lastRoutes';
import orderReducer from '../reducers/order';
import passengersReducer from '../reducers/passengers';
import routeSettingsReducer from '../reducers/routeSettings';
import seatsReducer from '../reducers/seats';
import showMessagesReducer from '../reducers/showMessages';
import userReducer from '../reducers/user';

const reducer = combineReducers({
  cities: citiesReducer,
  routeSettings: routeSettingsReducer,
  lastRoutes: lastRoutesReducer,
  email: emailReducer,
  seats: seatsReducer,
  user: userReducer,
  passengers: passengersReducer,
  showMessages: showMessagesReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer,
});

export default store;
