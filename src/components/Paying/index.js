import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import SecondaryHeader from '../Header/SecondaryHeader';
import Stage from '../Stage';
import TripDetails from '../TripDetails';
import { changeUserField, setInfo } from '../../actions/actionCreators';
import Info from '../Info';
import './Paying.css';
import links from '../../data/links';

function Paying() {
  const {
    first_name, last_name, patronymic, phone, email, payment_method,
  } = useSelector((state) => state.user);
  const { info } = useSelector((state) => state.showMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorField, setErrorField] = useState(null);

  const checkingForm = () => {
    let invalid = null;
    if (last_name === '') {
      invalid = 'last_name';
    } else if (first_name === '') {
      invalid = 'first_name';
    } else if (patronymic === '') {
      invalid = 'patronymic';
    } else if (phone === '') {
      invalid = 'phone';
    } else if (email === '') {
      invalid = 'email';
    } else if (payment_method === '') {
      invalid = 'payment_method';
    }

    setErrorField(invalid);
    if (invalid !== null) {
      if (invalid === 'payment_method') {
        dispatch(setInfo(
          'Необходимо указать способ оплаты.',
          '',
          'info',
        ));
      }
      return false;
    }
    return true;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeUserField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    goNext();
  };

  const choosePayMethod = (method) => {
    dispatch(changeUserField('payment_method', method));
  };

  const goNext = () => {
    const check = checkingForm();
    if (check) {
      navigate(links.verify);
    }
  };

  return (
    <div>
      {info && <Info />}
      <SecondaryHeader />
      <Stage stage="3" />
      <main className="mainContainer">
        <aside className="leftPanel">
          <TripDetails />
        </aside>
        <aside className="rightPanel">
          <form onSubmit={handleSubmit}>
            <section className="PersonInfo Paying__section">
              <div className="Paying__header">Персональные данные</div>
              <div>
                <div className="PersonInfo__formRow PersonInfo__formRowName">
                  <div className="PersonInfo__nameBox">
                    <label className="PersonInfo__label Paying__label" htmlFor="last_name">Фамилия</label>
                    <input
                      className={errorField === 'last_name' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                      onChange={handleChange}
                      id="last_name"
                      value={last_name}
                      name="last_name"
                      required
                    />
                  </div>
                  <div className="PersonInfo__nameBox">
                    <label className="PersonInfo__label Paying__label" htmlFor="first_name">Имя</label>
                    <input
                      className={errorField === 'first_name' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                      onChange={handleChange}
                      id="first_name"
                      value={first_name}
                      name="first_name"
                      required
                    />
                  </div>
                  <div className="PersonInfo__nameBox">
                    <label className="PersonInfo__label Paying__label" htmlFor="patronymic">Отчество</label>
                    <input
                      className={errorField === 'patronymic' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                      onChange={handleChange}
                      id="patronymic"
                      value={patronymic}
                      name="patronymic"
                      required
                    />
                  </div>
                </div>
                <div className="Paying__formRow">
                  <label className="PersonInfo__label Paying__label" htmlFor="phone">Контактный телефон</label>
                  <input
                    className={errorField === 'phone' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                    type="tel"
                    onChange={handleChange}
                    id="phone"
                    value={phone}
                    name="phone"
                    placeholder="+7 ___ ___ __ __"
                    required
                  />
                </div>
                <div className="Paying__formRow">
                  <label className="PersonInfo__label Paying__label" htmlFor="email">E-mail</label>
                  <input
                    className={errorField === 'email' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                    type="email"
                    onChange={handleChange}
                    id="email"
                    value={email}
                    name="email"
                    placeholder="inbox@gmail.ru"
                    required
                  />
                </div>
              </div>
              <div className="Paying__header">Способ оплаты</div>
              <div className="Paying__radioRow">
                <div className={payment_method === 'null' ? 'customRadio_red' : payment_method === 'online' ? 'customRadio_checked' : 'customRadio'} onClick={() => choosePayMethod('online')} />
                <div className={payment_method === 'online' ? 'Paying__textChecked' : 'Paying__text'}>Онлайн</div>
              </div>
              <div className="Paying__onlineTypes">
                <div className="Paying__onlineTypes-type">Банковской картой</div>
                <div className="Paying__onlineTypes-type">PayPal</div>
                <div className="Paying__onlineTypes-type">Visa QIWI Wallet</div>
              </div>
              <div className="Paying__radioRow">
                <div className={payment_method === 'null' ? 'customRadio_red' : payment_method === 'cash' ? 'customRadio_checked' : 'customRadio'} onClick={() => choosePayMethod('cash')} />
                <div className={payment_method === 'cash' ? 'Paying__textChecked' : 'Paying__text'}>Наличными</div>
              </div>
            </section>
            <div className="btnBox">
              <button onClick={goNext} className="yellowBtn PersonInfo__btn" type="submit">КУПИТЬ БИЛЕТЫ</button>
            </div>
          </form>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Paying;
