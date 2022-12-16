import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TrainDetails from '../TrainDetails';
import TrainTicketsQuantity from '../TrainTicketsQuantity';
import TrainCoach from '../TrainCoach';
import './Train.css';

function Train(props) {
  const { direction } = props;
  const { seats } = useSelector((state) => state.seats);

  const [type, setType] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [choosenCoaches, setChoosenCoaches] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const newCoaches = [];
    if (seats && type) {
      seats.forEach((item) => {
        if (item.coach.class_type === type) {
          newCoaches.push(item.coach.name.split('-')[1]);
        }
      });
    }
    setCoaches(newCoaches);
    if (newCoaches.length > 0) {
      setChoosenCoaches((prevState) => {
        prevState.push(seats.find((item) => item.coach.name.split('-')[1] === newCoaches[0]));
        return [...prevState];
      });
    }
  }, [seats, type]);

  const changeTrain = () => {
    navigate('/tickets');
  };

  const changeType = (smth) => {
    setType((prevState) => (prevState === smth ? null : smth));
    setChoosenCoaches([]);
  };

  const chooseCoach = (nmb) => {
    setChoosenCoaches((prevState) => {
      const index = prevState.findIndex((item) => item.coach.name.split('-')[1] === nmb);
      if (index === -1) {
        prevState.push(seats.find((item) => item.coach.name.split('-')[1] === nmb));
      } else {
        prevState.splice(index, 1);
      }
      return [...prevState];
    });
  };

  return (
    <div className="Train">
      <div className={`Train__header_${direction}`}>
        <div className={`Train__headerPic_${direction}`} />
        <button onClick={changeTrain} className="whiteBtn" type="submit">Выбрать другой поезд</button>
      </div>
      <TrainDetails direction={direction} />
      <div className="Train__header">Количество билетов</div>
      <TrainTicketsQuantity />
      <div className="Train__header">Тип вагона</div>
      <div className="Train__typesContainer">
        <div onClick={() => changeType('fourth')} className="Train__typesItem">
          <div className={type === 'fourth' ? 'Train__typesPic Train__typesPic_fourthActive' : 'Train__typesPic Train__typesPic_fourth'} />
          <div className="Train__typesName">Сидячий</div>
        </div>
        <div onClick={() => changeType('third')} className="Train__typesItem">
          <div className={type === 'third' ? 'Train__typesPic Train__typesPic_thirdActive' : 'Train__typesPic Train__typesPic_third'} />
          <div className="Train__typesName">Плацкарт</div>
        </div>
        <div onClick={() => changeType('second')} className="Train__typesItem">
          <div className={type === 'second' ? 'Train__typesPic Train__typesPic_secondActive' : 'Train__typesPic Train__typesPic_second'} />
          <div className="Train__typesName">Купе</div>
        </div>
        <div onClick={() => changeType('first')} className="Train__typesItem">
          <div className={type === 'first' ? 'Train__typesPic Train__typesPic_firstActive' : 'Train__typesPic Train__typesPic_first'} />
          <div className="Train__typesName">Люкс</div>
        </div>
      </div>
      {type && coaches.length > 0
                && (
                <div className="Train__seats">
                  <div className="Train__seatsCoaches">
                    <div className="Train__seatsCoachesNumbers">
                      <div>Вагоны</div>
                      {coaches.map((o) => (
                        <div onClick={() => chooseCoach(o)} key={o} className={choosenCoaches.length > 0 && choosenCoaches.some((item) => item.coach.name.split('-')[1] === o) ? 'Train__seatsCoachNumber Train__seatsCoachNumberActive' : 'Train__seatsCoachNumber'}>{o}</div>
                      ))}
                    </div>
                    <div className="Train__seatsCoachesText">Нумерация вагонов начинается с головы поезда</div>
                  </div>
                  {choosenCoaches.length > 0
                        && choosenCoaches.map((o) => <TrainCoach key={o.coach._id} coach={o} type={type} />)}
                </div>
                )}
    </div>
  );
}

export default Train;
