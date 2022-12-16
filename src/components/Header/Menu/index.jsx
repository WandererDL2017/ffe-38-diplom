import './Menu.css';

function Menu() {
  return (
    <div className="Menu" id="mainMenu">
      <a href="/#aboutUs" className="Menu__item">О нас</a>
      <a href="/#howItWorks" className="Menu__item">Как это работает</a>
      <a href="/#reviews" className="Menu__item">Отзывы</a>
      <a href="/#contacts" className="Menu__item">Контакты</a>
    </div>
  );
}

export default Menu;
