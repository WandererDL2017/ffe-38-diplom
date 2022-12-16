import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentPage } from '../../actions/actionCreators';
import './RoutesPages.css';

function RoutesPages() {
  const { routeSet, currentPage, routes } = useSelector((state) => state.routeSettings);
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();
  let quantity = Math.ceil(routes.total_count / routeSet.limit);
  
  if (routes.total_count === 0) {
    quantity = 1;
  }

  useEffect(() => {
    const pagesArray = [];

    if (quantity > 3) {
      if (currentPage > 1) {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pagesArray.push(i);
          if (i === quantity) break;
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          pagesArray.push(i);
          if (i === quantity) break;
        }
      }
    } else {
      for (let i = 1; i <= quantity; i++) {
        pagesArray.push(i);
      }
    }
    setPages(pagesArray);
  }, [quantity, currentPage, routes.total_count, routeSet.limit]);

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const nextPage = () => {
    if ((currentPage + 1) <= quantity) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const changePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <section className="RoutesPages">
      <div className="RoutesPages__boxArrow" onClick={prevPage}>
        <div className="RoutesPages__leftArrow" />
      </div>
      {pages.map((o) => (
        <div
          key={o}
          onClick={() => changePage(o)}
          className={o === currentPage ? 'RoutesPages__number RoutesPages__numberActive' : 'RoutesPages__number'}
        >
          {o}
        </div>
      ))}
      <div className="RoutesPages__boxArrow" onClick={nextPage}>
        <div className="RoutesPages__rightArrow" />
      </div>
    </section>
  );
}

export default RoutesPages;
