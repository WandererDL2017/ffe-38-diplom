import { format } from 'date-fns';

function TripDetailsRoute(props) {
  const { train, direction } = props;

  return (
    <div>
      <div className="TripDetails__sectionRow">
        <div>№ поезда</div>
        <div className="TripDetails__trainNumber">{train.train.name}</div>
      </div>
      <div className="TripDetails__sectionRow">
        <div>Название</div>
        <div className="TripDetails__trainName">
          <div>{train.from.city.name}</div>
          <div>{train.to.city.name}</div>
        </div>
      </div>
      <div className="TripDetails__sectionRow TripDetails__duration">
        {`${Math.trunc(train.duration / 3600)}:${((train.duration % 3600) / 60) < 10 ? `0${(train.duration % 3600) / 60}` : (train.duration % 3600) / 60}`}
      </div>
      <div className="TripDetails__sectionRow">
        <div>
          <div className="TripDetails__trainTime">{format(new Date(train.from.datetime * 1000), 'hh:mm')}</div>
          <div className="TripDetails__date">{format(new Date(train.from.datetime * 1000), 'dd.MM.yyyy')}</div>
        </div>
        <div className={`Routes__yellowArrowPic Routes__yellowArrowPic-${direction}`} />
        <div className="TripDetails__sectionRowBoxRight">
          <div className="TripDetails__trainTime">{format(new Date(train.to.datetime * 1000), 'hh:mm')}</div>
          <div className="TripDetails__date">{format(new Date(train.to.datetime * 1000), 'dd.MM.yyyy')}</div>
        </div>
      </div>
      <div className="TripDetails__sectionRow">
        <div>
          <div className="TripDetails__destination">{train.from.city.name}</div>
          <div className="TripDetails__destinationStation">{train.from.railway_station_name}</div>
        </div>
        <div className="TripDetails__sectionRowBoxRight">
          <div className="TripDetails__destination">{train.to.city.name}</div>
          <div className="TripDetails__destinationStation">{train.to.railway_station_name}</div>
        </div>
      </div>
      <div className="TripDetails__sectionRow" />
    </div>
  );
}

export default TripDetailsRoute;
