import { useSelector, useDispatch } from 'react-redux';
import { fetchEmail, changeEmailField } from '../../actions/actionCreators';
import Info from '../Info';
import './Footer.css';

function Footer() {
  const { email } = useSelector((state) => state.email);
  const { info } = useSelector((state) => state.showMessages);

  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchEmail(email));
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    dispatch(changeEmailField(value));
  };

  return (
    <footer id="contacts" className="Footer">
      {info && <Info />}
      <div className="Footer__container">
        <div className="Footer__contacts">
          <h3 className="Footer__title">Свяжитесь с нами</h3>
          <ul className="Footer__contactsList">
            <li className="Footer__contactsItem">
              <div className="Footer__contactsItemPicture phone" />
              <div className="Footer__contactsItemText">8 (800) 000 00 00</div>
            </li>
            <li className="Footer__contactsItem">
              <div className="Footer__contactsItemPicture mail" />
              <div className="Footer__contactsItemText">inbox@mail.ru</div>
            </li>
            <li className="Footer__contactsItem">
              <div className="Footer__contactsItemPicture skype" />
              <div className="Footer__contactsItemText">tu.train.tickets</div>
            </li>
            <li className="Footer__contactsItem">
              <div className="Footer__contactsItemPicture address" />
              <div className="Footer__contactsItemText">
                г. Москва
                <br />
                ул. Московская 27-35
                <br />
                555 555
              </div>
            </li>
          </ul>
        </div>
        <div className="Footer__subscription">
          <h3 className="Footer__title">Подписка</h3>
          <form className="Footer__form" onSubmit={handleSubmit}>
            <label className="Footer__formText" htmlFor="footerForm_email">Будьте в курсе событий</label>
            <input className="Footer__formInput" onChange={handleChange} type="email" placeholder="e-mail" value={email} required />
            <button className="subscriptionButton" type="submit">ОТПРАВИТЬ</button>
          </form>
          <h3 className="Footer__title">Подписывайтесь на нас</h3>
          <ul className="Footer__socialLinks">
            <li className="socialLink">
              <a href="http://somewhere" className="socialLinkItem youtube">
                <span className="visually-hidden">youtube</span>
              </a>
            </li>
            <li className="socialLink">
              <a href="http://somewhere" className="socialLinkItem linkedin">
                <span className="visually-hidden">linkedin</span>
              </a>
            </li>
            <li className="socialLink">
              <a href="http://somewhere" className="socialLinkItem googlePlus">
                <span className="visually-hidden">googlePlus</span>
              </a>
            </li>
            <li className="socialLink">
              <a href="http://somewhere" className="socialLinkItem facebook">
                <span className="visually-hidden">facebook</span>
              </a>
            </li>
            <li className="socialLink">
              <a href="http://somewhere" className="socialLinkItem twitter">
                <span className="visually-hidden">twitter</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <div className="Footer__logo">Лого</div>
        <a href="/#mainMenu" className="up"> </a>
        <div className="copyrightText">2022 WEB</div>
      </div>
    </footer>
  );
}

export default Footer;
