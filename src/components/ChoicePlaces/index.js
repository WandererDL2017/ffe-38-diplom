import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChoosenSeat, setInfo } from '../../actions/actionCreators';
import './ChoicePlaces.css';

function ChoicePlaces(props) {
  const { coach } = props;
  const { choosenSeats, quantity } = useSelector((state) => state.seats);
  const [seatsInCoach, setSeats] = useState([]);
  const [totalPrice, setTotalPice] = useState(0);

  const first = [0, 2, 4, 6, 8, 10, 12, 14];
  const second = [0, 4, 8, 12, 16, 20, 24, 28];
  const third = [32, 34, 36, 38, 40, 42, 44, 46];
  const fourth1 = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
  const fourth2 = [33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59];
  const type = coach.coach.class_type;

  const dispatch = useDispatch();

  useEffect(() => {
    let price = 0;
    const seats = [];
    if (choosenSeats.length > 0) {
      if (choosenSeats.findIndex((item) => item.coach === coach.coach._id) !== -1) {
        choosenSeats.find((item) => item.coach === coach.coach._id).seats.forEach((item) => {
          seats.push(item.place);
          price += item.price;
        });
      }

      setSeats(seats);
      setTotalPice(price);
    }
  }, [coach.coach._id, choosenSeats]);

  const chooseSeat = (seat) => {
    let price = 0;
    if (coach.seats.find((item) => item.index === seat)?.available) {
      if (type === 'second' || type === 'third') {
        if (seat % 2 === 0) {
          price = coach.coach.top_price;
        } else {
          price = coach.coach.bottom_price;
        }
      } else if (type === 'first') {
        price = coach.coach.price;
      } else {
        price = coach.coach.bottom_price;
      }
      let totalSeats = 0;
      if (choosenSeats.length > 0) {
        choosenSeats.forEach((item) => {
          totalSeats += item.seats.length;
        });
        if (totalSeats >= (quantity.adultQuantity * 1 + quantity.childQuantity * 1)) {
          if (seatsInCoach.includes(seat)) {
            dispatch(setChoosenSeat(coach.coach._id, seat, price));
          } else {
            dispatch(setInfo(
              '???????????????????? ???????????????????? ?????????????????? ????????.',
              '???????? ?????? ???????????????????? ?????????????? ?????? ??????????, ???????????????????? ???????????????? ???????????????????? ?????????????? (???????????????? ?????? ??????????????).',
              'info',
            ));
          }
        } else {
          dispatch(setChoosenSeat(coach.coach._id, seat, price));
        }
      } else {
        dispatch(setChoosenSeat(coach.coach._id, seat, price));
      }
    }
  };

  return (
    <div className="??hoicePlaces">
      <div className={type !== 'fourth' 
        ? '??hoicePlaces__pic ??hoicePlaces__pic-123' 
        : '??hoicePlaces__pic ??hoicePlaces__pic-4'} />
      <div className="??hoicePlaces__coachNumber">{coach.coach.name.split('-')[1]}</div>
      <div className="??hoicePlaces__placesContainer">
        {(type === 'first') && first.map((o) => (
          <div className="??hoicePlaces__placesBox" key={o}>
            <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find((item) => item.index === 1 + o)
              ?.available 
              ? '??hoicePlaces__placeFirst ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(1 + o) ? '??hoicePlaces__placeFirst ??hoicePlaces__placeChoosenFirst' 
              : '??hoicePlaces__placeFirst'}>{1 + o}</div>
            <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find((item) => item.index === 2 + o)
              ?.available 
              ? '??hoicePlaces__placeFirst ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(2 + o) 
              ? '??hoicePlaces__placeFirst ??hoicePlaces__placeChoosenFirst' 
              : '??hoicePlaces__placeFirst'}>{2 + o}</div>
          </div>
        ))}
        {(type === 'second' || type === 'third') && second.map((o) => (
          <div className="??hoicePlaces__placesBox" key={o}>
            <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find((item) => item.index === 1 + o)
              ?.available ? '??hoicePlaces__place ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(1 + o) 
              ? '??hoicePlaces__place ??hoicePlaces__placeChoosen' 
              : '??hoicePlaces__place'}>{1 + o}</div>
            <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find((item) => item.index === 2 + o)
              ?.available ? '??hoicePlaces__place ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(2 + o) 
              ? '??hoicePlaces__place ??hoicePlaces__placeChoosen' 
              : '??hoicePlaces__place'}>{2 + o}</div>
            <div onClick={() => chooseSeat(3 + o)} className={!coach.seats.find((item) => item.index === 3 + o)
              ?.available 
              ? '??hoicePlaces__place ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(3 + o) ? '??hoicePlaces__place ??hoicePlaces__placeChoosen' 
              : '??hoicePlaces__place'}>{3 + o}</div>
            <div onClick={() => chooseSeat(4 + o)} className={!coach.seats.find((item) => item.index === 4 + o)
              ?.available 
              ? '??hoicePlaces__place ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(4 + o) 
              ? '??hoicePlaces__place ??hoicePlaces__placeChoosen' : '??hoicePlaces__place'}>{4 + o}</div>
          </div>
        ))}
        {(type === 'fourth') && fourth1.map((o) => (
          <div className="??hoicePlaces__placesBoxFourth" key={o}>
            <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find((item) => item.index === 1 + o)
              ?.available 
              ? '??hoicePlaces__placeFourth ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(1 + o) 
              ? '??hoicePlaces__placeFourth ??hoicePlaces__placeChoosenFourth' 
              : '??hoicePlaces__placeFourth'}>{1 + o}</div>
            <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find((item) => item.index === 2 + o)
              ?.available 
              ? '??hoicePlaces__placeFourth ??hoicePlaces_placeOccupied' 
              : seatsInCoach.includes(2 + o) 
              ? '??hoicePlaces__placeFourth ??hoicePlaces_placeChoosenFourth' 
              : '??hoicePlaces__placeFourth'}>{2 + o}</div>
          </div>
        ))}
      </div>
      <div className="??hoicePlaces__placesContainerThird">
        {type === 'third' && third.map((o) => (
          <div className="??hoicePlaces__placesBoxThird" key={o}>
            <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find((item) => item.index === 1 + o)
              ?.available 
              ? '??hoicePlaces__placeThird ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(1 + o) 
              ? '??hoicePlaces__placeThird ??hoicePlaces__placeChoosen' 
              : '??hoicePlaces__placeThird'}>{1 + o}</div>
            <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find((item) => item.index === 2 + o)
              ?.available 
              ? '??hoicePlaces__placeThird ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(2 + o) 
              ? '??hoicePlaces__placeThird ??hoicePlaces__placeChoosen' 
              : '??hoicePlaces__placeThird'}>{2 + o}</div>
          </div>
        ))}
      </div>
      <div className="??hoicePlaces__placesSecondContainerForFourth">
        {(type === 'fourth') && (
        <div className="??hoicePlaces__placesBoxFourth">
          <div onClick={() => chooseSeat(33)} className={!coach.seats.find((item) => item.index === 33)?.available 
            ? '??hoicePlaces__placeFourth ??hoicePlaces__placeOccupied' 
            : seatsInCoach.includes(33) 
            ? '??hoicePlaces__placeFourth ??hoicePlaces__placeChoosenFourth' 
            : '??hoicePlaces__placeFourth'}>33</div>
        </div>
        )}
        {(type === 'fourth') && fourth2.map((o) => (
          <div className="??hoicePlaces__placesBoxFourth" key={o}>
            <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find((item) => item.index === 1 + o)
              ?.available 
              ? '??hoicePlaces__placeFourth ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(1 + o) 
              ? '??hoicePlaces__placeFourth ??hoicePlaces__placeChoosenFourth' 
              : '??hoicePlaces__placeFourth'}>{1 + o}</div>
            <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find((item) => item.index === 2 + o)
              ?.available 
              ? '??hoicePlaces__placeFourth ??hoicePlaces__placeOccupied' 
              : seatsInCoach.includes(2 + o) 
              ? '??hoicePlaces__placeFourth ??hoicePlaces__placeChoosenFourth' 
              : '??hoicePlaces__placeFourth'}>{2 + o}</div>
          </div>
        ))}
        {(type === 'fourth') && (
        <div className="??hoicePlaces__placesBoxFourth">
          <div onClick={() => chooseSeat(62)} className={!coach.seats.find((item) => item.index === 62)
            ?.available 
            ? '??hoicePlaces__placeFourth ??hoicePlaces__placeOccupied' 
            : seatsInCoach.includes(62) 
            ? '??hoicePlaces__placeFourth ??hoicePlaces__placeChoosenFourth' 
            : '??hoicePlaces__placeFourth'}>62</div>
        </div>
        )}
      </div>
      {totalPrice > 0 && (
        <div className="??hoicePlaces__totalPrice">
          <div className="??hoicePlaces__totalPriceFigure">{totalPrice.toLocaleString()}</div>
          <div className="seatsPrice??urrency" />
        </div>
      )}
    </div>
  );
}

export default ChoicePlaces;
