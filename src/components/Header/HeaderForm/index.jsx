import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCityField, fetchCities, fetchLastRoutes, fetchRoutes, setRouteSetting, swapCities,
} from '../../../actions/actionCreators';
import { useEffect, useState } from 'react';
import './HeaderForm.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

function HeaderForm(props) {
  const { typeForm, lines } = props;
  const {
    cityFrom, cityTo, citiesListFrom, citiesListTo,
  } = useSelector((state) => state.cities);
  const { routeSet } = useSelector((state) => state.routeSettings);
  const [inFocus, setFocus] = useState({ from: false, to: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (citiesListFrom.length > 0) {
      const fromCityInList = citiesListFrom.findIndex((o) => o.name === cityFrom);
      if (fromCityInList !== -1) {
        const fromCityId = citiesListFrom[fromCityInList]._id;
        dispatch(setRouteSetting('from_city_id', fromCityId));
        localStorage.setItem('from_city_id', fromCityId);
      }
    }
    if (citiesListTo.length > 0) {
      const toCityInList = citiesListTo.findIndex((o) => o.name === cityTo);
      if (toCityInList !== -1) {
        const toCityId = citiesListTo[toCityInList]._id;
        dispatch(setRouteSetting('to_city_id', toCityId));
        localStorage.setItem('to_city_id', toCityId);
      }
    }
  }, [citiesListFrom, citiesListTo, cityFrom, cityTo, dispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    navigate('/tickets');
    dispatch(fetchRoutes(routeSet));
    dispatch(fetchLastRoutes());
  };

  const handleChangeCity = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeCityField(name, value));
    if (name === 'cityFrom') {
      setFocus((prevState) => ({ ...prevState, from: true, to: false }));
      dispatch(fetchCities('citiesListFrom', value));
    } else if (name === 'cityTo') {
      setFocus((prevState) => ({ ...prevState, from: false, to: true }));
      dispatch(fetchCities('citiesListTo', value));
    } else {
      setFocus((prevState) => ({ ...prevState, from: false, to: false }));
    }
  };

  const swapDirection = () => {
    dispatch(swapCities());
  };

  const chooseCity = (direction, city) => {
    dispatch(changeCityField(direction, city));
    setFocus((prevState) => ({ ...prevState, from: false, to: false }));
  };

  return (
    <form className={typeForm} onSubmit={handleSubmit}>
      <div className={lines}>
        <div>
          <div className="formDiscription">Направление</div>
          <div className="inputGroup">
            <div className="directionInput">
              <input onChange={handleChangeCity} name="cityFrom" autoComplete="off" className="formControl" placeholder="Откуда" value={cityFrom} required />
              {citiesListFrom.length > 0 && inFocus.from
                                && (
                                <ul className="directionsList">
                                  {citiesListFrom.map((o) => (
                                    <li onClick={() => chooseCity('cityFrom', o.name)} key={o._id} className="directionsListItem">{o.name}</li>
                                  ))}
                                </ul>
                                )}
            </div>
            <div onClick={swapDirection} className="swapDirection" />
            <div className="directionInput">
              <input onChange={handleChangeCity} name="cityTo" autoComplete="off" className="formControl" placeholder="Куда" value={cityTo} required />
              {citiesListTo.length > 0 && inFocus.to
                                && (
                                <ul className="directionsList">
                                  {citiesListTo.map((o) => (
                                    <li onClick={() => chooseCity('cityTo', o.name)} key={o._id} className="directionsListItem">{o.name}</li>
                                  ))}
                                </ul>
                                )}
            </div>
          </div>
        </div>
        <div>
          <div className="formDiscription">Дата</div>
          <div className="inputGroup">
            <div className="dateInput">
              <DatePicker
                dateFormat="dd.MM.yyyy"
                locale="ru"
                selected={routeSet.date_start}
                onChange={(date) => dispatch(setRouteSetting('date_start', date))}
                className="formControl"
                placeholderText="ДД/ММ/ГГ"
                shouldCloseOnSelect={false}
              />
            </div>
            <div className="dateInput">
              <DatePicker
                dateFormat="dd.MM.yyyy"
                locale="ru"
                selected={routeSet.date_end}
                onChange={(date) => dispatch(setRouteSetting('date_end', date))}
                className="formControl"
                placeholderText="ДД/ММ/ГГ"
                shouldCloseOnSelect={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="btnBox">
        <button className="yellowBtn searchBtn" type="submit">НАЙТИ БИЛЕТЫ</button>
      </div>
    </form>
  );
}

export default HeaderForm;
