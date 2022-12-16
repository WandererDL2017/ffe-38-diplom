import HeaderForm from '../HeaderForm';
import Menu from '../Menu';
import './HeaderMain.css';

function HeaderMain() {
  return (
    <header className="HeaderMain">
      <a href="/#logo" id="logo" className="logo">Лого</a>
      <Menu />
      <div className="HeaderMain__container">
        <div className="slogan">
          Вся жизнь -
          <span className="bold">путешествие!</span>
        </div>
        <HeaderForm typeForm="HeaderMain__form" lines="inTwoLines" />
      </div>
    </header>
  );
}

export default HeaderMain;
