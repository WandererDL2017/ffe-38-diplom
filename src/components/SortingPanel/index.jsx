import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setRouteSetting } from '../../actions/actionCreators';
import './SortingPanel.css';

function SortingPanel() {
  const { routeSet, routes } = useSelector((state) => state.routeSettings);
  const [sortTools, setSortTools] = useState(false);
  const dispatch = useDispatch();

  const changeLimit = (number) => {
    dispatch(setRouteSetting('limit', number));
  };

  const showSort = () => {
    setSortTools((prevState) => !prevState);
  };

  const setSorting = (value) => {
    dispatch(setRouteSetting('sort', value));
  };

  return (
    <div className="SortingPanel">
      <div>{`найдено ${routes.total_count}`}</div>
      <div className="SortingPanel__box">
        сортировать по:
        <div className="SortingPanel__sortBy" onClick={showSort}>
          {
                    routeSet.sort === 'date' ? 'дате' : routeSet.sort === 'price_min' ? 'стоимости' : 'длительности'
                }
          {sortTools
                    && (
                    <ul className="SortingPanel__list">
                      <li className="SortingPanel__item" onClick={() => setSorting('date')}>времени</li>
                      <li className="SortingPanel__item" onClick={() => setSorting('price_min')}>стоимости</li>
                      <li className="SortingPanel__item" onClick={() => setSorting('duration')}>длительности</li>
                    </ul>
                    )}
        </div>
        <div className="SortingPanel__limitsBox">
          показывать по:
          <span onClick={() => changeLimit(5)} className={routeSet.limit === 5 
            ? 'SortingPanel__limitNumber SortingPanel__choosenSortItem' 
            : 'SortingPanel__limitNumber'}>5</span>
          <span onClick={() => changeLimit(10)} className={routeSet.limit === 10 
            ? 'SortingPanel__limitNumber SortingPanel__choosenSortItem' 
            : 'SortingPanel__limitNumber'}>10</span>
          <span onClick={() => changeLimit(20)} className={routeSet.limit === 20 
            ? 'SortingPanel__limitNumber SortingPanel__choosenSortItem' 
            : 'SortingPanel__limitNumber'}>20</span>
        </div>
      </div>
    </div>
  );
}

export default SortingPanel;
