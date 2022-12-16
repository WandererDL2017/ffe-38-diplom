import { useNavigate } from 'react-router-dom';
import './Stage.css';
import links from '../../data/links';

function Stage(props) {
  const navigate = useNavigate();
  const { stage } = props;

  const goThere = (number) => {
    if (number === 1) {
      navigate(links.tickets);
    } else if (number === 2 && stage > '1') {
      navigate(links.passengers);
    } else if (number === 3 && stage > '2') {
      navigate(links.paying);
    } else if (number === 3 && stage > '2') {
      navigate(links.verify);
    }
  };

  return (
    <section className={stage === '4' ? 'Stage__bar Stage__bar_full' : 'Stage__bar'}>
      <div onClick={() => goThere(1)} className="Stage__item Stage__item_active">
        <div className="Stage__number">1</div>
        <div className="Stage__name">Билеты</div>
      </div>
      <div className={stage === '1' ? 'Stage__arrow_active' : 'Stage__arrow Stage__arrowPrev'} />
      <div onClick={() => goThere(2)} className={stage > '1' ? 'Stage__item Stage__item_active' : 'Stage__item'}>
        <div className="Stage__number">2</div>
        <div className="Stage__name">Пассажиры</div>
      </div>
      <div className={
                stage === '2' ? 'Stage__arrow_active'
                  : stage > '2' ? 'Stage__arrow Stage__arrowPrev' : 'Stage__arrow'
}
      />
      <div onClick={() => goThere(3)} className={stage > '2' ? 'Stage__item Stage__item_active' : 'Stage__item'}>
        <div className="Stage__number">3</div>
        <div className="Stage__name">Оплата</div>
      </div>
      <div className={
                stage === '3' ? 'Stage__arrow_active'
                  : stage > '3' ? 'Stage__arrow Stage__arrowPrev' : 'Stage__arrow'
}
      />
      <div onClick={() => goThere(4)} className={stage > '3' ? 'Stage__item Stage__item_active' : 'Stage__item'}>
        <div className="Stage__number">4</div>
        <div className="Stage__name">Проверка</div>
      </div>
    </section>
  );
}

export default Stage;
