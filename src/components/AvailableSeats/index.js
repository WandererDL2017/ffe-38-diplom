import { useState } from 'react';
import './AvailableSeats.css';

function AvailableSeats(props) {
  const {
    type, quantity, price, top, bottom, side,
  } = props;
  const [vision, setVision] = useState(false);

  const toggleVision = () => {
    setVision((prevState) => !prevState);
  };

  return (
    <div className="AvailableSeats" onMouseEnter={toggleVision} onMouseLeave={toggleVision}>
      <div className="AvailableSeats__type">{type}</div>
      <div className="AvailableSeats__details">
        <div className="AvailableSeats__quantity">{quantity}</div>
        <div className="AvailableSeats__price">
          <div>от</div>
          <div className="AvailableSeats__priceFigure">{price.toLocaleString()}</div>
          <div className="AvailableSeats__priceСurrency"> </div>
        </div>
      </div>
      {vision && (type === 'Плацкарт' || type === 'Купе')
        && (
        <div className="AvailableSeats__tipBox">
          <div className="AvailableSeats__tipRow">
            <div className="AvailableSeats__type">верхнее</div>
            <div className="AvailableSeats__details">
              <div className="AvailableSeats__quantity">{type === 'Плацкарт' ? (quantity / 3) : (quantity / 2)}</div>
              <div className="AvailableSeats__price">
                <div>от</div>
                <div className="AvailableSeats__priceFigure">{top.toLocaleString()}</div>
                <div className="AvailableSeats__priceСurrency"> </div>
              </div>
            </div>
          </div>
          <div className="AvailableSeats__tipRow">
            <div className="AvailableSeats__type">нижнее</div>
            <div className="AvailableSeats__details">
              <div className="AvailableSeats__quantity">{type === 'Плацкарт' ? (quantity / 3) : (quantity / 2)}</div>
              <div className="AvailableSeats__price">
                <div>от</div>
                <div className="AvailableSeats__priceFigure">{bottom.toLocaleString()}</div>
                <div className="AvailableSeats__priceСurrency"> </div>
              </div>
            </div>
          </div>
          {type === 'Плацкарт'
            && (
            <div className="AvailableSeats__tipRow">
              <div className="AvailableSeats__type">боковое</div>
              <div className="AvailableSeats__details">
                <div className="AvailableSeats__quantity">{type === 'Плацкарт' ? (quantity / 3) : (quantity / 2)}</div>
                <div className="AvailableSeats__price">
                  <div>от</div>
                  <div className="AvailableSeats__priceFigure">{side.toLocaleString()}</div>
                  <div className="AvailableSeats__priceСurrency"> </div>
                </div>
              </div>
            </div>
            )}
        </div>
        )}
    </div>
  );
}

export default AvailableSeats;
