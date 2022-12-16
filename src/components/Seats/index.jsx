import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Footer from '../Footer';
import LastRoutes from '../LastRoutes';
import SecondaryHeader from '../Header/SecondaryHeader';
import Stage from '../Stage';
import Train from '../Train';
import TripTools from '../TripTools';
import { fetchSeats, setInfo } from '../../actions/actionCreators';
import Info from '../Info';
import Loading from '../Loading';
import './Seats.css';

function Seats() {
  const { route, loadingStatus, choosenSeats } = useSelector((state) => state.seats);
  const { routeSet } = useSelector((state) => state.routeSettings);
  const { info } = useSelector((state) => state.showMessages);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeats(route.departure._id, {
      have_first_class: routeSet.have_first_class,
      have_second_class: routeSet.have_second_class,
      have_third_class: routeSet.have_third_class,
      have_fourth_class: routeSet.have_fourth_class,
      have_wifi: routeSet.have_wifi,
      have_air_conditioning: routeSet.have_air_conditioning,
      have_express: routeSet.have_express,
    }));
  }, [route, routeSet, dispatch]);

  const goNext = () => {
    if (choosenSeats.length > 0) {
      navigate('/passengers');
    } else {
      dispatch(setInfo(
        'Необходимо выбрать хотя бы одно место.',
        '',
        'info',
      ));
    }
  };

  return (
    <div>
      {info && <Info />}
      <SecondaryHeader />
      {loadingStatus === 'pending' && <Loading />}
      {loadingStatus === 'error'
                && (
                <main className="mainContainer__error">
                  <Info />
                </main>
                )}
      {(loadingStatus === 'idle' || loadingStatus === 'success')
                && (
                <div>
                  <Stage stage="1" />
                  <main className="mainContainer">
                    <aside className="leftPanel">
                      <TripTools />
                      <LastRoutes />
                    </aside>
                    <aside className="rightPanel">
                      <section className="Seats">
                        <div className="Seats__header">выбор мест</div>
                        <Train direction="trainStart" />
                        <Train direction="trainEnd" />
                        <div className="btnBox">
                          <button onClick={goNext} className="yellowBtn seatsBtn" type="submit">ДАЛЕЕ</button>
                        </div>
                      </section>
                    </aside>
                  </main>
                </div>
                )}
      <Footer />
    </div>
  );
}

export default Seats;
