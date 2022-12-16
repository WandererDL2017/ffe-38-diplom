import './Reviews.css';
import { useState } from 'react';

function Reviews() {
  const data = [
    {
      first: {
        author: 'Екатерина Вальнова',
        text: '"Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые."',
      },
      second: {
        author: 'Евгений Стрыкало',
        text: '"СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке."',
      },
    },
    {
      first: {
        author: 'Оля Петрова',
        text: '"СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке."',
      },
      second: {
        author: 'Вася Иванов',
        text: '"Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке."',
      },
    },
    {
      first: {
        author: 'Вика Виктория',
        text: '"Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые."',
      },
      second: {
        author: 'Антон Яблоневый',
        text: '"СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке."',
      },
    },
  ];
  const [number, setNumber] = useState(0);

  return (
    <div className="Reviews" id="reviews">
      <div className="Reviews__title">ОТЗЫВЫ</div>
      <div className="Reviews__container">
        <div className="Reviews__item">
          <div className="Reviews__authorAvatar Reviews__author1" />
          <div className="Reviews__box">
            <div className="Reviews__authorName">{data[number].first.author}</div>
            <blockquote className="Reviews__text">{data[number].first.text}</blockquote>
          </div>
        </div>
        <div className="Reviews__item">
          <div className="Reviews__authorAvatar Reviews__author2" />
          <div className="Reviews__box">
            <div className="Reviews__authorName">{data[number].second.author}</div>

            <blockquote className="Reviews__text">{data[number].second.text}</blockquote>
          </div>
        </div>
      </div>
      <div className="Reviews__controls">
        <div onClick={() => setNumber(0)} className={number === 0 ? 'Reviews__control Reviews__controlActive' : 'Reviews__control'} />
        <div onClick={() => setNumber(1)} className={number === 1 ? 'Reviews__control Reviews__controlActive' : 'Reviews__control'} />
        <div onClick={() => setNumber(2)} className={number === 2 ? 'Reviews__control Reviews__controlActive' : 'Reviews__control'} />
      </div>
    </div>
  );
}

export default Reviews;
