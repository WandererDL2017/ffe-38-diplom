import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearOrder, clearPassengers, clearSeats } from '../../actions/actionCreators';
import Footer from '../Footer';
import Menu from '../Header/Menu';
import './SuccessOrder.css';

function SuccessOrder() {
  const { totalPrice } = useSelector((state) => state.order);
  const { first_name, patronymic } = useSelector((state) => state.user);

  const [estimation, setEstimation] = useState(0);
  const allStars = [1, 2, 3, 4, 5];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const estimate = (figure) => {
    setEstimation(figure);
  };

  const backHome = () => {
    navigate('/');
    dispatch(clearOrder());
    dispatch(clearPassengers());
    dispatch(clearSeats());
  };

  return (
    <div className="SuccessOrder">
      <header className="SuccessOrder__header">
        <a href="/#logo" id="logo" className="logo">Лого</a>
        <Menu />
        <div className="SuccessOrder__headerContainer">
          <div className="SuccessOrder__headerText">Благодарим Вас за заказ!</div>
        </div>
      </header>
      <div className="SuccessOrder__wrapper">
        <div className="SuccessOrder__container">
          <div className="SuccessOrder__orderDetails">
            <div className="SuccessOrder__orderDetailsText">№Заказа 285АА</div>
            <div className="SuccessOrder__orderDetailsSumm">
              сумма
              <div className="SuccessOrder__orderDetailsFigure">{totalPrice.toLocaleString()}</div>
              <div className="seatsPriceСurrency SuccessOrder__priceСurrency" />
            </div>
          </div>
          <div className="SuccessOrder__services">
            <div className="SuccessOrder__servicesItem">
              <div className="SuccessOrder__servicesItemPic SuccessOrder__servicesItemPic_first" />
              <div className="SuccessOrder__servicesItemText">билеты будут отправлены на ваш e-mail</div>
            </div>
            <div className="SuccessOrder__servicesItem">
              <div className="SuccessOrder__servicesItemPic SuccessOrder__servicesItemPic_second" />
              <div className="SuccessOrder__servicesItemText">распечатайте и сохраняйте билеты до даты поездки</div>
            </div>
            <div className="SuccessOrder__servicesItem">
              <div className="SuccessOrder__servicesItemPic SuccessOrder__servicesItemPic_third" />
              <div className="SuccessOrder__servicesItemText">предьявите распечатанные билеты при посадке</div>
            </div>
          </div>
          <div className="SuccessOrder__notification">
            <div className="SuccessOrder__userName">{`${first_name} ${patronymic}!`}</div>
            <div>
              <p className="SuccessOrder__text">Ваш заказ успешно оформлен.</p>
              <p className="SuccessOrder__text">В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
            </div>
            <div className="SuccessOrder__thanksText">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</div>
          </div>
          <div className="SuccessOrder__bottom">
            <div className="SuccessOrder__estimation">
              Оценить сервис
              <div className="SuccessOrder__estimationStars">
                {allStars.map((star) => (
                  <div key={star} onClick={() => estimate(star)} className={estimation >= star ? 'SuccessOrder__estimationStarPicFull' : 'SuccessOrder__estimationStarPic'} />
                ))}
              </div>
            </div>
            <button className="yellowBtn SuccessOrder__btn" onClick={backHome} type="submit">ВЕРНУТЬСЯ НА ГЛАВНУЮ</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SuccessOrder;
