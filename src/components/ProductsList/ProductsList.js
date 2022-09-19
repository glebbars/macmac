import React, { useState, useMemo, useEffect, useCallback } from "react";
import ProductsPagination from "../ProductsPagination/ProductsPagination";
import List from "../List/List";
import { useSelector, useDispatch } from "react-redux";

import {
  useFilteredProductsArrByRoute,
  getFilteredProducts,
} from "../../hooks/useFilteredProductsArrByRoute";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsListFilters = useSelector(
    (store) => store.app.productsListFilters
  );
  const sortType = useSelector((store) => store.app.sortType);
  const pageSize = useSelector((store) => store.app.pageSize);
  const dispatch = useDispatch();

  const onPageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      dispatch({
        type: "UPDATE_PAGE_NUM",
        payload: page,
      });
      window.scrollTo(0, 0);
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
    // window.scrollTo(0, 0)
  }, [productsListFilters, pageSize, sortType]);

  const initiallyFilteredArr = useFilteredProductsArrByRoute();

  const filteredProductsArr = getFilteredProducts(
    productsListFilters,
    initiallyFilteredArr,
    true
  );

  const sortedProductsArr = filteredProductsArr.sort((a, b) => {
    switch (sortType) {
      case "":
      case "popularity":
      case "novelty":
        return filteredProductsArr;
      case "price-decrease":
        return b.price - a.price;
      case "price-increase":
        return a.price - b.price;

      default:
        return filteredProductsArr;
    }
  });

  useEffect(() => {
    dispatch({
      type: "UPDATE_SORTED_PRODUCTS_LENGTH",
      payload: sortedProductsArr.length,
    });
  }, [dispatch, sortedProductsArr]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedProductsArr.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, sortedProductsArr]);

  return (
    <>
      {currentTableData.length > 0 ? (
        <List className="" productClassName="" productsArr={currentTableData} />
      ) : (
        "К сожалению этого товара нет в данный момент"
      )}
      <ProductsPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={sortedProductsArr.length}
        pageSize={pageSize}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  );
};

export default React.memo(ProductsList);
