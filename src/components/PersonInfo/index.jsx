import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ru from 'date-fns/locale/ru';
import './PersonInfo.css';
import { changePassengerField, setNewPassenger, setPassengerComplete, deletePassenger } from '../../actions/actionCreators';

registerLocale('ru', ru);

function PersonInfo(props) {
  const { number } = props;
  const { passengers } = useSelector((state) => state.passengers);
  const dispatch = useDispatch();

  const [vision, setVision] = useState(number === 1);
  const [index, setIndex] = useState(passengers.findIndex((item) => item.number === number) !== -1 ? passengers.findIndex((item) => item.number === number) : '');
  const [errorText, setErrorText] = useState({
    invalid: null,
    text: null,
    example: null,
  });
  const [completedPassengers, setCompletedPassengers] = useState(0);
  const [show, setShow] = useState({
    is_adult: false,
    document_type: false,
  });

  useEffect(() => {
    let readyPass = 0;
    passengers.forEach((item) => {
      if (item.complete) {
        readyPass += 1;
      }
    });
    setCompletedPassengers(readyPass);
    if (index === '' && passengers.findIndex((item) => item.number === number) === -1) {
      dispatch(setNewPassenger(number));
    }
    if (completedPassengers + 1 >= number) {
      setVision(true);
    }
    if (passengers.length > 0 && index === '') {
      setIndex(passengers.findIndex((item) => item.number === number));
    }
  }, [number, passengers, index, completedPassengers, dispatch]);

  const toggleVision = () => {
    setVision(!vision);
  };

  const showList = (name) => {
    setShow((prevState) => (prevState[name] === true ? { ...prevState, [name]: false } : { ...prevState, [name]: true }));
  };

  const handleChoose = (name, value) => {
    dispatch(changePassengerField(name, value, number));
    showList(name);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changePassengerField(name, value, number));
  };

  const inpitChecking = (evt) => {
    let text = null;
    let example = null;
    let invalid = null;
    const { name, value } = evt.target;
    if (name === errorText.invalid) {
      if (name === 'last_name' || name === 'first_name' || name === 'patronymic') {
        if (passengers[index][name] === '') {
          if (name === 'last_name') {
            text = 'Необходимо ввести данные о фамилии пассажира';
            invalid = 'last_name';
          }
          if (name === 'first_name') {
            text = 'Необходимо ввести данные об имени пассажира';
            invalid = 'first_name';
          }
          if (name === 'patronymic') {
            text = 'Необходимо ввести данные об отчестве пассажира';
            invalid = 'patronymic';
          }
        }
      }
      if (name === 'documentSeries') {
        if (!/^[0-9]{4}/.test(value)) {
          text = 'Cерия паспорта указана некорректно';
          example = '1 2 3 4';
          invalid = 'documentSeries';
        }
      }
      if (name === 'documentNumber') {
        if (passengers[index].document_type === 'Паспорт') {
          if (!/^[0-9]{6}/.test(passengers[index].documentNumber)) {
            text = 'Номер паспорта указан некорректно';
            example = '1 2 3 4 5 6';
            invalid = 'documentNumber';
          }
        } else if (!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}/.test(value)) {
          text = 'Номер свидетельства о рождении указан некорректно';
          example = 'VIII-ЫП-123456';
          invalid = 'documentNumber';
        }
      }
      setErrorText((prevState) => ({
        ...prevState, invalid, text, example,
      }));
    }
  };

  const checkDate = () => {
    let text = null;
    let invalid = null;
    if (passengers[index].birthday === '') {
      text = 'Введите дату рождения пассажира';
      invalid = 'birthday';
    }
    setErrorText((prevState) => ({ ...prevState, invalid, text }));
  };

  const checkingForm = () => {
    let text = null;
    let example = null;
    let invalid = null;
    if (passengers[index].last_name === '') {
      text = 'Необходимо ввести данные о фамилии пассажира';
      invalid = 'last_name';
    } else if (passengers[index].first_name === '') {
      text = 'Необходимо ввести данные об имени пассажира';
      invalid = 'first_name';
    } else if (passengers[index].patronymic === '') {
      text = 'Необходимо ввести данные об отчестве пассажира';
      invalid = 'patronymic';
    } else if (passengers[index].birthday === '') {
      text = 'Введите дату рождения пассажира';
      invalid = 'birthday';
    } else if (passengers[index].document_type === 'Паспорт') {
      if (!/^[0-9]{4}/.test(passengers[index].documentSeries)) {
        text = 'Cерия паспорта указана некорректно';
        example = '1 2 3 4';
        invalid = 'documentSeries';
      } else if (!/^[0-9]{6}/.test(passengers[index].documentNumber)) {
        text = 'Номер паспорта указан некорректно';
        example = '1 2 3 4 5 6';
        invalid = 'documentNumber';
      }
    } else if (passengers[index].document_type === 'Свидетельство о рождении') {
      if (!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}/.test(passengers[index].documentNumber)) {
        text = 'Номер свидетельства о рождении указан некорректно';
        example = 'VIII-ЫП-123456';
        invalid = 'documentNumber';
      }
    }

    setErrorText((prevState) => ({
      ...prevState, invalid, text, example,
    }));
    if (text !== null) {
      return false;
    }
    return true;
  };

  const deletePsngr = () => {
    dispatch(deletePassenger(index));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const check = checkingForm();
    if (check) {
      dispatch(setPassengerComplete(index));
    }
  };

  return (
    <section className="PersonInfo">
      <div className="PersonInfo__header">
        <div className="PersonInfo__headerBox">
          <div onClick={toggleVision} className={vision ? 'PersonInfo__openBtnOpened' : 'PersonInfo__openBtnClosed'}> </div>
          <div>Пассажир</div>
          <div className="PersonInfo__number">{number}</div>
        </div>
        <div onClick={deletePsngr} className="PersonInfo__deleteBtn" />
      </div>
      {vision && (
        <form onSubmit={handleSubmit} className="PersonInfo__form">
          <div className="PersonInfo__choosing PersonInfo__isAdult">
            {passengers[index]?.is_adult === true ? 'Взрослый' : 'Детский'}
            <div className="PersonInfo__choosingArrow" onClick={() => showList('is_adult')} />
            {show.is_adult && (
            <ul className="PersonInfo__list">
              <li className="PersonInfo__listItem" onClick={() => handleChoose('is_adult', true)}>Взрослый</li>
              <li className="PersonInfo__listItem" onClick={() => handleChoose('is_adult', false)}>Детский</li>
            </ul>
            )}
          </div>
          <div className="PersonInfo__formRow PersonInfo__formRowName">
            <div className="PersonInfo__nameBox">
              <label className="PersonInfo__label" htmlFor="last_name">Фамилия</label>
              <input
                className={errorText.invalid === 'last_name' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                onChange={handleChange}
                onBlur={inpitChecking}
                id="last_name"
                value={passengers[index]?.last_name}
                name="last_name"
                required
              />
            </div>
            <div className="PersonInfo__nameBox">
              <label className="PersonInfo__label" htmlFor="first_name">Имя</label>
              <input
                className={errorText.invalid === 'first_name' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                onChange={handleChange}
                onBlur={inpitChecking}
                id="first_name"
                value={passengers[index]?.first_name}
                name="first_name"
                required
              />
            </div>
            <div className="PersonInfo__nameBox">
              <label className="PersonInfo__label" htmlFor="patronymic">Отчество</label>
              <input
                className={errorText.invalid === 'patronymic' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                onChange={handleChange}
                onBlur={inpitChecking}
                id="patronymic"
                value={passengers[index]?.patronymic}
                name="patronymic"
                required
              />
            </div>
          </div>
          <div className="PersonInfo__formRow">
            <div>
              <div className="PersonInfo__label">Пол</div>
              <div className="PersonInfo__chooseGender">
                <div
                  className={passengers[index]?.gender ? 'PersonInfo__genderItem PersonInfo__genderItemActive' : 'PersonInfo__genderItem'}
                  onClick={() => handleChoose('gender', true)}
                >
                  М
                </div>
                <div
                  className={passengers[index]?.gender ? 'PersonInfo__genderItem' : 'PersonInfo__genderItem PersonInfo__genderItemActive'}
                  onClick={() => handleChoose('gender', false)}
                >
                  Ж
                </div>
              </div>
            </div>
            <div>
              <div className="PersonInfo__label">Дата рождения</div>
              <div>
                <DatePicker
                  dateFormat="dd.MM.yyyy"
                  locale="ru"
                  selected={passengers[index]?.birthday}
                  onChange={(date) => handleChoose('birthday', date)}
                  className={errorText.invalid === 'birthday' ? 'PersonInfo__formControl PersonInfo__formControlInvalid' : 'PersonInfo__formControl'}
                  placeholderText="ДД/ММ/ГГ"
                  onBlur={checkDate}
                />
              </div>
            </div>
          </div>
          <div className="PersonInfo__formRow">
            <input className="PersonInfo__checkbox" type="checkbox" />
            <div className="PersonInfo__text">ограниченная подвижность</div>
          </div>
          <div className="PersonInfo__formRow PersonInfo__formRowDocs">
            <div>
              <div className="PersonInfo__label">Тип документа</div>
              <div className="PersonInfo__choosing PersonInfo__documentType">
                {passengers[index]?.document_type}
                <div className="PersonInfo__choosingArrow" onClick={() => showList('document_type')}> </div>
                {show.document_type && (
                <ul className="PersonInfo__list">
                  <li className="PersonInfo__listItem" onClick={() => handleChoose('document_type', 'Паспорт')}>Паспорт</li>
                  <li className="PersonInfo__listItem" onClick={() => handleChoose('document_type', 'Свидетельство о рождении')}>Свидетельство о рождении</li>
                </ul>
                )}
              </div>
            </div>
            {passengers[index]?.document_type === 'Паспорт' && (
            <div className="PersonInfo__docsBox">
              <label className="PersonInfo__label" htmlFor="documentSeries">Серия</label>
              <input
                className={errorText.invalid === 'documentSeries' ? 'PersonInfo__formControl formcontrolPassort PersonInfo__formControlInvalid' : 'PersonInfo__formControl formcontrolPassort'}
                onChange={handleChange}
                id="documentSeries"
                value={passengers[index]?.documentSeries}
                placeholder="_ _ _ _"
                pattern="[0-9]{4}"
                maxLength="4"
                onBlur={inpitChecking}
                required
                name="documentSeries"
              />
            </div>
            )}
            <div className="PersonInfo__docsBox">
              <label className="PersonInfo__label" htmlFor="documentNumber">Номер</label>
              {passengers[index]?.document_type === 'Паспорт' && (
              <input
                className={errorText.invalid === 'documentSeries' ? 'PersonInfo__formControl formcontrolPassort PersonInfo__formControlInvalid' : 'PersonInfo__formControl formcontrolPassort'}
                onChange={handleChange}
                id="documentNumber"
                value={passengers[index]?.documentNumber}
                placeholder="_ _ _ _ _ _"
                pattern="[0-9]{6}"
                maxLength="6"
                name="documentNumber"
                onBlur={inpitChecking}
                required
              />
              )}
              {passengers[index]?.document_type === 'Свидетельство о рождении' && (
              <div className="formcontrolСertificate">
                <input
                  className={errorText.invalid === 'documentNumber' ? 'PersonInfo__formControl formcontrolСertificateInput PersonInfo__formControlInvalid' : 'PersonInfo__formControl formcontrolСertificateInput'}
                  onChange={handleChange}
                  id="documentNumber"
                  value={passengers[index]?.documentNumber}
                  name="documentNumber"
                  onBlur={inpitChecking}
                  maxLength="14"
                  required
                  pattern="M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}"
                />
                {passengers[index]?.documentNumber === null && (
                <div className="formcontrolСertificatePlaceholder">
                  12 символов
                  <br />
                  _ _ _ _ _ _ _ _ _ _ _ _
                </div>
                )}
              </div>
              )}
            </div>
          </div>
          {errorText.text === null && (
          <div className={passengers[index]?.complete ? 'btnBox PersonInfo__btnBox PersonInfo__btnBoxFormComplete' : 'btnBox PersonInfo__btnBox'}>
            {passengers[index]?.complete && (
            <div className="PersonInfo__completeBox">
              <div className="PersonInfo__completePic" />
              <div className="PersonInfo__completeText">Готово</div>
            </div>
            )}
            <button className={passengers[index]?.complete ? 'whiteBtn PersonInfo__completeBtn' : 'whiteBtn'} type="submit" onClick={handleSubmit}>Следующий пассажир</button>
          </div>
          )}
          {errorText.text && (
          <div className="PersonInfo__errorBox">
            <div className="PersonInfo__errorPic" />
            <div>
              <div>{errorText.text}</div>
              {errorText.example && (
              <div>
                Пример:
                <span className="PersonInfo__example">{errorText.example}</span>
              </div>
              )}
            </div>
          </div>
          )}
        </form>
      )}
    </section>
  );
}

export default PersonInfo;
