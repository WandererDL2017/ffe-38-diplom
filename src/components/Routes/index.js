import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AvailableSeats from '../AvailableSeats';
import { setTrain } from '../../actions/actionCreators';
import './Routes.css';
import links from '../../data/links';

function Routes() {
  const { routes } = useSelector((state) => state.routeSettings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chooseTrain = (route) => {
    dispatch(setTrain(route));
    navigate(links.seats);
  };

  return (
    <section className="Routes">
      {routes.items.map((o) => (
        <div className="Routes__routeContainer" key={o.departure._id}>
          <div className="Routes__routeContainerLeftSide">
            <div className="Routes__routeTrainPicBorder">
              <div className="Routes__routeTrainPic Routes__routeTrainPic-trainStart" />
            </div>
            <div className="Routes__routeName">{o.departure.train.name}</div>
            <div className="Routes__routeItinerary">
              <div className="Routes__routeItineraryFromBox">
                <div>{o.departure.from.city.name}</div>
                <div className="Routes__routeItineraryAroow" />
              </div>
              <div>{o.departure.to.city.name}</div>
            </div>
          </div>
          <div className="Routes__routeDetails">
            <div className="Routes__timing">
              <div className="Routes__timingRow">
                <div className="Routes__timingItinerary">
                  <div className="Routes__timingTime">{format(new Date(o.departure.from.datetime * 1000), 'hh:mm')}</div>
                  <div className="Routes__timingCity">{o.departure.from.city.name}</div>
                  <div className="Routes__timingStation">{o.departure.from.railway_station_name}</div>
                </div>
                <div className="Routes__duration">
                  <div className="Routes__durationTime">
                    <div className="Routes__durationTime">{`${Math.trunc(o.departure.duration / 3600)}:${((o.departure.duration % 3600) / 60) < 10 ? `0${(o.departure.duration % 3600) / 60}` : (o.departure.duration % 3600) / 60}`}</div>
                  </div>
                  <div className="Routes__yellowArrowPic Routes__yellowArrowPic-trainStart" />
                </div>
                <div className="Routes__timingItinerary">
                  <div className="Routes__timingTime">{format(new Date(o.departure.to.datetime * 1000), 'hh:mm')}</div>
                  <div className="Routes__timingCity">{o.departure.to.city.name}</div>
                  <div className="Routes__timingStation">{o.departure.to.railway_station_name}</div>
                </div>
              </div>
              <div className="Routes__timingRow">
                <div className="Routes__timingItinerary">
                  <div className="Routes__timingTime">{format(new Date(o.departure.from.datetime * 1000), 'hh:mm')}</div>
                  <div className="Routes__timingCity">{o.departure.from.city.name}</div>
                  <div className="Routes__timingStation">{o.departure.from.railway_station_name}</div>
                </div>
                <div className="Routes__duration">
                  <div className="Routes__durationTime">
                    <div className="Routes__durationTime">{`${Math.trunc(o.departure.duration / 3600)}:${((o.departure.duration % 3600) / 60) < 10 ? `0${(o.departure.duration % 3600) / 60}` : (o.departure.duration % 3600) / 60}`}</div>
                  </div>
                  <div className="Routes__yellowArrowPic Routes__yellowArrowPic-trainEnd" />
                </div>
                <div className="Routes__timingItinerary">
                  <div className="Routes__timingTime">{format(new Date(o.departure.to.datetime * 1000), 'hh:mm')}</div>
                  <div className="Routes__timingCity">{o.departure.to.city.name}</div>
                  <div className="Routes__timingStation">{o.departure.to.railway_station_name}</div>
                </div>
              </div>
            </div>
            <div className="Routes__seats">
              {o.departure.available_seats_info.fourth
                                && <AvailableSeats type="Сидячий" quantity={o.departure.available_seats_info.fourth} price={o.departure.price_info.fourth.bottom_price} />}
              {o.departure.available_seats_info.third
                                && (
                                <AvailableSeats
                                  type="Плацкарт"
                                  quantity={o.departure.available_seats_info.third}
                                  price={o.departure.price_info.third.bottom_price}
                                  top={o.departure.price_info.third.top_price}
                                  bottom={o.departure.price_info.third.bottom_price}
                                  side={o.departure.price_info.third.side_price}
                                />
                                )}
              {o.departure.available_seats_info.second
                                && (
                                <AvailableSeats
                                  type="Купе"
                                  quantity={o.departure.available_seats_info.second}
                                  price={o.departure.price_info.second.bottom_price}
                                  top={o.departure.price_info.second.top_price}
                                  bottom={o.departure.price_info.second.bottom_price}
                                />
                                )}
              {o.departure.available_seats_info.first
                                && <AvailableSeats type="Люкс" quantity={o.departure.available_seats_info.first} price={o.departure.price_info.first.bottom_price} />}
              <div className="Routes__servicesPics" />
              <button onClick={() => chooseTrain(o)} className="yellowBtn Routes__btn" type="submit">Выбрать места</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Routes;
