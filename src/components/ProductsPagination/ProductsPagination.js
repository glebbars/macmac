import React from 'react';
import classnames from 'classnames';
import { useProductsPagination, DOTS } from '../useProductsPagination/useProductsPagination';

const ProductsPagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

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
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
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
        <div className="arrow left" />
      </li>
      <div className='pagination__content-wrapper'>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={index} className="pagination__item dots">&#8230;</li>;
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
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default ProductsPagination;