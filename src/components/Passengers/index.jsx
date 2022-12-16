import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import SecondaryHeader from '../Header/SecondaryHeader';
import Stage from '../Stage';
import TripDetails from '../TripDetails';
import PersonInfo from '../PersonInfo';
import { setInfo, setNewPassenger } from '../../actions/actionCreators';
import Info from '../Info';

function Passengers() {
  const { quantity } = useSelector((state) => state.seats);
  const { passengers } = useSelector((state) => state.passengers);
  const { info } = useSelector((state) => state.showMessages);
  const [passList, setPassList] = useState([]);
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const array = [];
    if (passengers.length > 0) {
      for (let i = 1; i <= passengers.length; i += 1) {
        array.push(i);
      }
    } else {
      for (let i = 1; i <= (quantity.adultQuantity * 1 + quantity.childQuantity * 1 + quantity.childWithoutSeatQuantity * 1); i += 1) {
        array.push(i);
      }
    }
    setPassList(array);
  }, [passengers, quantity.adultQuantity, quantity.childQuantity, quantity.childWithoutSeatQuantity]);

  useEffect(() => {
    let check = true;
    for (let i = 0; i < passengers.length; i += 1) {
      if (passengers[i].complete === false) {
        check = false;
      }
    }
    setComplete(check);
  }, [passengers]);

  const addPassenger = () => {
    dispatch(setNewPassenger(passengers.length + 1));
  };

  const goNext = () => {
    let adults = 0;
    let children = 0;
    passengers.forEach((item) => {
      if (item.is_adult) {
        adults += 1;
      } else {
        children += 1;
      }
    });
    if (quantity.adultQuantity * 1 !== adults) {
      dispatch(setInfo(
        'Проверьте правильность ввода данных по пассажирам.',
        'Количество взрослых пассажиров должно соответствовать указанному ранее количеству взрослых билетов',
        'info',
      ));
    } else if ((quantity.childQuantity * 1 + quantity.childWithoutSeatQuantity * 1) !== children) {
      dispatch(setInfo(
        'Проверьте правильность ввода данных по пассажирам.',
        'Количество детей должно соответствовать указанному ранее количеству детских билетов',
        'info',
      ));
    } else {
      navigate('/paying');
    }
  };

  return (
    <div>
      {info && <Info />}
      <SecondaryHeader />
      <Stage stage="2" />
      <main className="mainContainer">
        <aside className="leftPanel">
          <TripDetails />
        </aside>
        <aside className="rightPanel">
          {passList.map((o) => (
            <PersonInfo number={o} key={o} />
          ))}
          <section className="PersonInfo">
            <div className="PersonInfo__header">
              <div>Добавить пассажира</div>
              <div onClick={addPassenger} className="addPassenger" />
            </div>
          </section>
          <div className="btnBox">
            <button onClick={goNext} disabled={!complete} className="yellowBtn seatsBtn" type="submit">ДАЛЕЕ</button>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Passengers;
