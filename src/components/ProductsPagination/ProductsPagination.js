import React from 'react';
import classnames from 'classnames';
import { useProductsPagination, DOTS } from '../useProductsPagination/useProductsPagination';
import { useDispatch } from 'react-redux';

const ProductsPagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const dispatch = useDispatch()

  const paginationRange = useProductsPagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    dispatch({
      type: 'UPDATE_PAGE_NUM',
      payload: currentPage + 1
    })
    window.scrollTo(0, 0)
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    dispatch({
      type: 'UPDATE_PAGE_NUM',
      payload: currentPage - 1
    })
    window.scrollTo(0, 0)
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination', { [className]: className })}
    >
      <li
        className={classnames('pagination__item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <span className='pagination__item__arrow'>Предыдущая</span>
      </li>
      <div className='pagination__content-wrapper'>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={index} className="pagination__item pagination__item__dots">&#8230;</li>;
          }

          return (
            <li key={index}
              className={classnames('pagination__item', {
                selected: pageNumber === currentPage
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>
      <li
        className={classnames('pagination__item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <span className='pagination__item__arrow pagination__item__arrow_right'>Следующая</span>
      </li>
    </ul>
  );
};

export default ProductsPagination;