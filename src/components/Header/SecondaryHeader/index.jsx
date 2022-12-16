import HeaderForm from '../HeaderForm';
import Menu from '../Menu';
import './SecondaryHeader.css';

function SecondaryHeader() {
  return (
    <header className="SecondaryHeader">
      <a href="/#logo" id="logo" className="logo">Лого</a>
      <Menu />
      <div className="SecondaryHeader__container">
        <HeaderForm typeForm="SecondaryHeader__form" lines="inOneLine" />
      </div>
    </header>
  );
}

export default SecondaryHeader;
