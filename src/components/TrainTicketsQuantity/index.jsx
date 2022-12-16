import { useSelector, useDispatch } from 'react-redux';
import { changeQuantityField } from '../../actions/actionCreators';
import './TrainTicketsQuantity.css';

function TrainTicketsQuantity() {
  const { quantity } = useSelector((state) => state.seats);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeQuantityField(name, value));
  };

  return (
    <div className="TrainTicketsQuantity__quantityBox">
      <div className="TrainTicketsQuantity__quantityItem TrainTicketsQuantity__quantityItem_adult">
        <div className="TrainTicketsQuantity__quantityItemBox">
          <div className="TrainTicketsQuantity__quantityItemSign">Взрослых -</div>
          <input onChange={handleChange} type="number" min="0" max="5" name="adultQuantity" className="TrainTicketsQuantity__quantityItemInput" value={quantity.adultQuantity} />
        </div>
        <div className="TrainTicketsQuantity__quantityItemText">
          {`Можно добавить еще ${5 - quantity.adultQuantity} ${(5 - quantity.adultQuantity) === 1 ? 'пассажира' : 'пассажиров'}`}
        </div>
      </div>
      <div className="TrainTicketsQuantity__quantityItem">
        <div className="TrainTicketsQuantity__quantityItemBox">
          <div className="TrainTicketsQuantity__quantityItemSign">Детских -</div>
          <input onChange={handleChange} type="number" min="0" max="5" name="childQuantity" className="TrainTicketsQuantity__quantityItemInput" value={quantity.childQuantity} />
        </div>
        <div className="TrainTicketsQuantity__quantityItemTextChild">
          {`Можно добавить еще ${5 - quantity.childQuantity} ${(5 - quantity.childQuantity) === 1 ? 'ребенка' : 'детей'} до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%`}
        </div>
      </div>
      <div className="TrainTicketsQuantity__quantityItem">
        <div className="TrainTicketsQuantity__quantityItemBox">
          <div className="TrainTicketsQuantity__quantityItemSign">Детских "без места" -</div>
          <input onChange={handleChange} type="number" min="0" max="5" name="childWithoutSeatQuantity" className="TrainTicketsQuantity__quantityItemInput" value={quantity.childWithoutSeatQuantity} />
        </div>
      </div>
    </div>
  );
}

export default TrainTicketsQuantity;
