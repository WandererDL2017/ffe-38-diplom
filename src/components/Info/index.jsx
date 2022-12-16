import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeError, closeInfo } from '../../actions/actionCreators';
import './Info.css';

function Info() {
  const {
    error, messageMain, messageDetails, type,
  } = useSelector((state) => state.showMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closePopup = () => {
    if (error) {
      dispatch(closeError());
      navigate('/');
    } else {
      dispatch(closeInfo());
    }
  };

  return (
    <div className="Info__popup">
      <div className="Info__popupBox">
        <div className={`Info__popupHeader_${type}`}>
          <div className="Info__popupHeaderPic" />
        </div>
        <div className="Info__popupText">
          <div className={`Info__popupMessageMain_${type}`}>{messageMain}</div>
          <div className="Info__messageDetails">{messageDetails}</div>
        </div>
        <div className="btnBox_popup">
          <button onClick={closePopup} className="whiteBtn" type="submit">Понятно</button>
        </div>
      </div>
    </div>
  );
}

export default Info;
