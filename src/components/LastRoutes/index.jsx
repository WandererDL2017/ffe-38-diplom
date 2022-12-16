import { useSelector, useDispatch } from 'react-redux';
import { changeCityField, fetchRoutes, setRouteSetting } from '../../actions/actionCreators';
import './LastRoutes.css';

function LastRoutes() {
  const { lastRoutes } = useSelector((state) => state.lastRoutes);
  const { routeSet } = useSelector((state) => state.routeSettings);
  const dispatch = useDispatch();

  const getTickets = (from, to, fromCityId, toCityId) => {
    dispatch(changeCityField('cityFrom', from));
    dispatch(changeCityField('cityTo', to));
    dispatch(setRouteSetting('from_city_id', fromCityId));
    dispatch(setRouteSetting('to_city_id', toCityId));
    dispatch(fetchRoutes(routeSet));
  };

  return (
    <section className="LastRoutes">
      <div className="LastRoutes__header">ПОСЛЕДНИЕ БИЛЕТЫ</div>
      {lastRoutes.length > 0 && (
        <div className="LastRoutes__box">
          {lastRoutes.map((o) => (
            <div
              key={o.departure._id}
              className="LastRoutes__item"
              onClick={() => getTickets(
                o.departure.from.city.name,
                o.departure.to.city.name,
                o.departure.from.city._id,
                o.departure.to.city._id,
              )}
            >
              <div className="LastRoutes__cities">
                <div>{o.departure.from.city.name}</div>
                <div>{o.departure.to.city.name}</div>
              </div>
              <div className="LastRoutes__stations">
                <div className="LastRoutes__stationsFrom">{o.departure.from.railway_station_name}</div>
                <div className="LastRoutes__stationsTo">{o.departure.to.railway_station_name}</div>
              </div>
              <div className="LastRoutes__details">
                <div className="LastRoutes__detailsPics"> </div>
                <div className="LastRoutes__detailsPrice">
                  <div>от</div>
                  <div className="LastRoutes__detailsPriceFigure">{o.min_price.toLocaleString()}</div>
                  <div className="LastRoutes__detailsPriceСurrency"> </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LastRoutes;
