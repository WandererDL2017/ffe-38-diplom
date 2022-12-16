import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import TripDetailsRoute from '../TripDetailsRoute';
import './TripDetails.css';

function TripDetails() {
  const { route, quantity, choosenSeats } = useSelector((state) => state.seats);
  const [allPlaces, setAllPlaces] = useState([]);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [vision, setVision] = useState({
    start: false,
    end: false,
    passengers: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const allPlacesNew = [];
    if (choosenSeats.length > 0) {
      choosenSeats.forEach((item) => {
        if (item.seats.length > 0) {
          item.seats.forEach((place) => allPlacesNew.push(place));
        }
      });
    }
    setAllPlaces(allPlacesNew);
  }, [choosenSeats]);

  useEffect(() => {
    let priceAdult = 0; let
      priceChild = 0;
    if (allPlaces.length > 0) {
      if (quantity.childQuantity * 1 > 0) {
        for (let i = 0; i < quantity.childQuantity * 1; i += 1) {
          priceChild += allPlaces[i].price;
        }
        if (quantity.adultQuantity * 1 > 0) {
          for (let i = quantity.childQuantity * 1; i < (quantity.adultQuantity * 1 + quantity.childQuantity * 1); i += 1) {
            priceAdult += allPlaces[i].price;
          }
        }
      } else if (quantity.adultQuantity > 0) {
        for (let i = 0; i < quantity.adultQuantity; i += 1) {
          priceAdult += allPlaces[i].price;
        }
      }
    }
    setAdultPrice(priceAdult);
    setChildPrice(priceChild);
  }, [quantity, allPlaces, dispatch]);

  const togglevision = (tool) => {
    setVision((prevState) => (vision[tool] === false ? { ...prevState, [tool]: true } : { ...prevState, [tool]: false }));
  };

  return (
    <div className="TripTools TripDetails">
      <div className="TripTools__section">
        <div className="formDiscription">ДЕТАЛИ ПОЕЗДКИ</div>
      </div>
      <div className="TripTools__section">
        <div className="TripTools__sectionHeader">
          <div className="TripTools__sectionHeaderBox">
            <div className="TripTools__sectionHeaderPicThere"> </div>
            <div className="TripTools__sectionHeaderText">Туда</div>
            <div className="TripDetails__headerText">{format(new Date(route.departure.from.datetime * 1000), 'dd.MM.yyyy')}</div>
          </div>
          <div onClick={() => togglevision('start')} className={vision.start 
            ? 'TripTools__sectionHeaderToggle opened' 
            : 'TripTools__sectionHeaderToggle closed'}> </div>
        </div>
        {vision.start && <TripDetailsRoute train={route.departure} direction="trainStart" />}
      </div>
      <div className="TripTools__section">
        <div className="TripTools__sectionHeader">
          <div className="TripTools__sectionHeaderBox">
            <div className="TripTools__sectionHeaderPicThere"> </div>
            <div className="TripTools__sectionHeaderText">Обратно</div>
            <div className="TripDetails__headerText">{format(new Date(route.departure.to.datetime * 1000), 'dd.MM.yyyy')}</div>
          </div>
          <div onClick={() => togglevision('end')} className={vision.end 
            ? 'TripTools__sectionHeaderToggle opened' 
            : 'TripTools__sectionHeaderToggle closed'}></div>
        </div>
        {vision.end && <TripDetailsRoute train={route.departure} direction="trainEnd" />}
      </div>
      <div className="TripTools__section">
        <div className="TripTools__sectionHeader">
          <div className="TripTools__sectionHeaderBox">
            <div className="TripTools__sectionHeaderPicPassenger"> </div>
            <div className="TripTools__sectionHeaderText">Пассажиры</div>
          </div>
          <div onClick={() => togglevision('passengers')} className={vision.passengers 
            ? 'TripTools__sectionHeaderToggle opened' 
            : 'TripTools__sectionHeaderToggle closed'}> </div>
        </div>
        {vision.passengers && (
          <div>
            <div className="TripDetails__sectionRow">
              <div className="TripDetails__sectionRowPart">
                <div className="TripDetails__passQuantity">{quantity.adultQuantity}</div>
                <div>{quantity.adultQuantity * 1 === 1 ? 'Взрослый' : 'Взрослых'}</div>
              </div>
              <div className="TripDetails__sectionRowPart">
                <div className="TripDetails__trainPrice">{adultPrice.toLocaleString()}</div>
                <div className="seatsPriceСurrency"> </div>
              </div>
            </div>
            {quantity.childQuantity > 0 && (
            <div className="TripDetails__sectionRow">
              <div className="TripDetails__sectionRowPart">
                <div className="TripDetails__passQuantity">{quantity.childQuantity}</div>
                <div>{quantity.childQuantity * 1 === 1 ? 'Ребенок' : 'Детей'}</div>
              </div>
              <div className="TripDetails__sectionRowPart">
                <div className="TripDetails__trainPrice">{childPrice.toLocaleString()}</div>
                <div className="seatsPriceСurrency"> </div>
              </div>
            </div>
            )}
          </div>
        )}
      </div>
      <div className="TripTools__section">
        <div className="TripTools__sectionHeader TripDetails__sectionTotalPrice">
          <div className="TripTools__sectionHeaderText">ИТОГ</div>
          <div className="TripDetails__sectionRowPart">
            <div className="TripDetails__trainTotalPrice">{(childPrice + adultPrice).toLocaleString()}</div>
            <div className="seatsPriceСurrency TripDetails__totalPriceСurrency"> </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
