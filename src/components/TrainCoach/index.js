import { useEffect, useState } from 'react';
import ChoicePlaces from '../ChoicePlaces';
import './TrainCoach.css';

function TrainCoach(props) {
  const { coach, type } = props;

  const [coachSeats, setCoachSeats] = useState({
    bottom: 0,
    top: 0,
    all: 0,
  });
  const [services, setServices] = useState({
    air_conditioning: false,
    wifi: false,
    linens: false,
    food: false,
  });
  const [vision, setVision] = useState({
    air_conditioning: false,
    wifi: false,
    linens: false,
    food: false,
  });
  const random = Math.trunc(Math.random() * (20 - 5));

  useEffect(() => {
    let bottom = 0;
    let top = 0;
    let all = 0;
    if (coach) {
      if (type === 'second' || type === 'third') {
        coach.seats.forEach((item) => {
          if (item.available) {
            if (item.index % 2 === 0) {
              top += 1;
            } else {
              bottom += 1;
            }
          }
        });
      }
    }
    if (coach) {
      coach.seats.forEach((item) => {
        if (item.available) {
          all += 1;
        }
      });
    }
    setCoachSeats((prevState) => ({
      ...prevState, bottom, top, all,
    }));
  }, [coach, type]);

  const handleChange = (service) => {
    if (type !== 'first') {
      setServices((prevState) => (services[service] === false ? { ...prevState, [service]: true } : { ...prevState, [service]: false }));
    }
    if (type === 'first' && service === 'food') {
      setServices((prevState) => (services[service] === false ? { ...prevState, [service]: true } : { ...prevState, [service]: false }));
    }
  };

  const toggleVision = (service) => {
    setVision((prevState) => (vision[service] === false ? { ...prevState, [service]: true } : { ...prevState, [service]: false }));
  };

  return (
    <div>
      <div className="TrainCoach__coachDetails">
        <div className="TrainCoach__coachDetails-coach">
          <div className="TrainCoach__coachDetails-number">{coach.coach.name.split('-')[1]}</div>
          <div>вагон</div>
        </div>
        <div className="TrainCoach__coachDetails-item">
          <div className="TrainCoach__coachDetails-itemHeader">
            <div>Места</div>
            <div className="TrainCoach__coachDetails-itemNumber">{coachSeats.all}</div>
          </div>
          {coachSeats.top !== 0 && (
            <div className="TrainCoach__coachDetails-itemText">
              <div>Верхние</div>
              <div className="TrainCoach__coachDetails-itemTextQuantity">{coachSeats.top}</div>
            </div>
          )}
          {coachSeats.bottom !== 0 && (
            <div className="TrainCoach__coachDetails-itemText">
              <div>Нижние</div>
              <div className="TrainCoach__coachDetails-itemTextQuantity">{coachSeats.bottom}</div>
            </div>
          )}
        </div>
        <div className="TrainCoach__coachDetails-item">
          <div className="TrainCoach__coachDetails-itemHeader">Стоимость</div>
          {coachSeats.top !== 0 && (
            <div className="TrainCoach__coachDetails-itemText">
              <div className="TrainCoach__coachDetails-price">{coach.coach.top_price.toLocaleString()}</div>
              <div className="seatsPriceСurrency" />
            </div>
          )}
          {coachSeats.bottom !== 0 && (
            <div className="TrainCoach__coachDetails-itemText">
              <div className="TrainCoach__coachDetails-price">{coach.coach.bottom_price.toLocaleString()}</div>
              <div className="seatsPriceСurrency" />
            </div>
          )}
          {type === 'first' && (
            <div className="TrainCoach__coachDetails-itemText">
              <div className="TrainCoach__coachDetails-price">{coach.coach.price.toLocaleString()}</div>
              <div className="seatsPriceСurrency" />
            </div>
          )}
        </div>
        <div className="TrainCoach__coachDetails-item">
          <div className="TrainCoach__coachDetails-itemHeader">
            <div>Обслуживание </div>
            <div className="TrainCoach__coachDetails-itemHeaderText">ФПК</div>
          </div>
          <div className="TrainCoach__coachDetails-servises">
            <div
              onClick={() => handleChange('air_conditioning')}
              className={type === 'first' ? 'TrainCoach__coachDetails-serviceBox serviceBox_notActive'
                : services.air_conditioning ? 'TrainCoach__coachDetails-serviceBox TrainCoach__coachDetails-serviceBox_active' : 'TrainCoach__coachDetails-serviceBox'}
              onMouseEnter={() => toggleVision('air_conditioning')}
              onMouseLeave={() => toggleVision('air_conditioning')}
            >
              <div className={type === 'first' ? 'TrainCoach__coachDetails-servicePic_notActive servicePic_air_conditioning'
                : services.air_conditioning ? 'TrainCoach__coachDetails_servicePic servicePic_air_conditioning_active' : 'TrainCoach__coachDetails-servicePic servicePic_air_conditioning'}
              />
              {vision.air_conditioning && <div className="tipBox tipBox_services">кондиционер</div>}
            </div>
            <div
              onClick={() => handleChange('wifi')}
              className={type === 'first' ? 'TrainCoach__coachDetails-serviceBox serviceBox_notActive'
                : services.wifi ? 'TrainCoach__coachDetails-serviceBox TrainCoach__coachDetails-serviceBox_active' : 'TrainCoach__coachDetails-serviceBox'}
              onMouseEnter={() => toggleVision('wifi')}
              onMouseLeave={() => toggleVision('wifi')}
            >
              <div className={type === 'first' ? 'TrainCoach__coachDetails-servicePic_notActive servicePic_wifi'
                : services.wifi ? 'TrainCoach__coachDetails-servicePic servicePic_wifi_active' : 'TrainCoach__coachDetails-servicePic servicePic_wifi'}
              />
              {vision.wifi && <div className="tipBox tipBox_services">WI&#8209;FI</div>}
            </div>
            <div
              onClick={() => handleChange('linens')}
              className={type === 'first' ? 'TrainCoach__coachDetails-serviceBox serviceBox_notActive'
                : services.linens ? 'TrainCoach__coachDetails-serviceBox TrainCoach__coachDetails-serviceBox_active' : 'TrainCoach__coachDetails-serviceBox'}
              onMouseEnter={() => toggleVision('linens')}
              onMouseLeave={() => toggleVision('linens')}
            >
              <div className={type === 'first' ? 'TrainCoach__coachDetails-servicePic_notActive servicePic_linen'
                : services.linens ? 'TrainCoach__coachDetails-servicePic servicePic_linen_active' : 'TrainCoach__coachDetails-servicePic servicePic_linen'}
              />
              {vision.linens && <div className="tipBox tipBox_services">белье</div>}
            </div>
            <div
              onClick={() => handleChange('food')}
              className={services.food ? 'TrainCoach__coachDetails-serviceBox TrainCoach__coachDetails-serviceBox_active' : 'TrainCoach__coachDetails-serviceBox'}
              onMouseEnter={() => toggleVision('food')}
              onMouseLeave={() => toggleVision('food')}
            >
              <div className={services.food ? 'TrainCoach__coachDetails-servicePic servicePic_food_active' : 'TrainCoach__coachDetails-servicePic servicePic_food'} />
              {vision.food && <div className="tipBox tipBox_services">питание</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="TrainCoach__lookingPeople">{`${random} человек выбирают места в этом поезде`}</div>
      <ChoicePlaces key={coach.coach._id} coach={coach} />
    </div>
  );
}

export default TrainCoach;
