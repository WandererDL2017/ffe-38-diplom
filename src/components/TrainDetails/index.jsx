import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import './TrainDetails.css';

function TrainDetails(props) {
  const { direction } = props;
  const { route } = useSelector((state) => state.seats);

  return (
    <div className="TrainDetails__routeContainer">
      <div className="TrainDetails__routeTrainPic" />
      <div className="TrainDetails__routePath">
        <div className="TrainDetails__routeName">{route.departure.train.name}</div>
        <div className="TrainDetails__routeItinerary">
          <div className="Routes__routeItineraryFromBox">
            <div>{route.departure.from.city.name}</div>
            <div className="Routes__routeItineraryAroow" />
          </div>
          <div>{route.departure.to.city.name}</div>
        </div>
      </div>
      <div className="TrainDetails__routeDetails">
        <div className="Routes__timingItinerary">
          <div className="Routes__timingTime">{format(new Date(route.departure.from.datetime * 1000), 'hh:mm')}</div>
          <div className="Routes__timingCity">{route.departure.from.city.name}</div>
          <div className="Routes__timingStation">{route.departure.from.railway_station_name}</div>
        </div>
        <div className={`Routes__yellowArrowPic Routes__yellowArrowPic-${direction}`} />
        <div className="Routes__timingItinerary">
          <div className="Routes__timingTime">{format(new Date(route.departure.to.datetime * 1000), 'hh:mm')}</div>
          <div className="Routes__timingCity">{route.departure.to.city.name}</div>
          <div className="Routes__timingStation">{route.departure.to.railway_station_name}</div>
        </div>
      </div>
      <div className="TrainDetails__duration">
        <div className="TrainDetails__watch" />
        <div className="TrainDetails__durationTime">
          <div>
            {`
                        ${Math.trunc(route.departure.duration / 3600)}
                        ${Math.trunc(route.departure.duration / 3600) > 4 && Math.trunc(route.departure.duration / 3600) < 20 ? 'часов'
              : (Math.trunc(route.departure.duration / 3600)) % 10 === 1 ? 'час'
                : (Math.trunc(route.departure.duration / 3600)) % 10 > 1 && (Math.trunc(route.departure.duration / 3600)) % 10 < 5 ? 'часа' : 'часов'}
                    `}
          </div>
          <div>
            {`
                        ${(route.departure.duration % 3600) / 60} 
                        ${((route.departure.duration % 3600) / 60) > 4 && ((route.departure.duration % 3600) / 60) < 20 ? 'минут'
              : ((route.departure.duration % 3600) / 60) % 10 === 1 ? 'минутa'
                : ((route.departure.duration % 3600) / 60) % 10 > 1 && ((route.departure.duration % 3600) / 60) % 10 < 5 ? 'минуты' : 'минут'}
                    `}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainDetails;
