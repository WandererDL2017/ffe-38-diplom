import './Menu.css';
import links from '../../../data/links';

function Menu() {
  return (
    <div className="Menu" id="mainMenu">
      <a href={links.aboutUs} className="Menu__item">О нас</a>
      <a href={links.howItWorks} className="Menu__item">Как это работает</a>
      <a href={links.reviews} className="Menu__item">Отзывы</a>
      <a href={links.contacts} className="Menu__item">Контакты</a>
    </div>
  );
}

export default Menu;
