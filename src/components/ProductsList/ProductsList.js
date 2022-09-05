import React, { useState, useMemo, useEffect, useCallback } from "react";
import ProductsPagination from "../ProductsPagination/ProductsPagination";
import List from "../List/List";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsArr = useSelector((store) => store.app.productsArr);
  const productsListFilters = useSelector(
    (store) => store.app.productsListFilters
  );
  const sortType = useSelector((store) => store.app.sortType);
  const pageSize = useSelector((store) => store.app.pageSize);
  const dispatch = useDispatch();
  const { categoryName, searchResult } = useParams();

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

  const initiallyFilteredArr = productsArr.filter((product) => {
    if (categoryName) {
      if (categoryName !== "all-products") {
        if (categoryName.includes("-")) {
          const routeModel = categoryName.split("-").join(" ");
          return product?.description?.model.toLowerCase() === routeModel;
        } else {
          return product?.description?.category.toLowerCase() === categoryName;
        }
      } else {
        return product;
      }
    } else if (searchResult) {
      const fullProductName = product?.fullName.toLowerCase();
      return fullProductName.includes(searchResult);
    }

    return product;
  });

  const categoryFilters = productsListFilters
    .filter((filter) => filter.filterName === "Категория")
    .map((filter) => filter.value);
  const modelFilters = productsListFilters
    .filter((filter) => filter.filterName === "Модель")
    .map((filter) => filter.value);
  const colorFilters = productsListFilters
    .filter((filter) => filter.filterName === "Цвет")
    .map((filter) => filter.value);
  const capacityFilters = productsListFilters
    .filter((filter) => filter.filterName === "Память")
    .map((filter) => filter.value);
  const priceFilter = productsListFilters
    .filter((filter) => filter.filterName === "Цена")
    .map((filter) => filter.value);
  const diagonalFilters = productsListFilters
    .filter((filter) => filter.filterName === "Диагональ")
    .map((filter) => filter.value);
  const wifiFilters = productsListFilters
    .filter((filter) => filter.filterName === "Wi-Fi")
    .map((filter) => filter.value);

  const priceLimits =
    priceFilter.length > 0 ? priceFilter[0].split("-") : ["0", "1000000"];

  const filteredProductsArr = initiallyFilteredArr.filter((product) => {
    if (productsListFilters.length > 0) {
      return (
        (categoryFilters.length > 0
          ? categoryFilters.includes(product.description.category)
          : product) &&
        (modelFilters.length > 0
          ? modelFilters.includes(product.description.model)
          : product) &&
        (colorFilters.length > 0
          ? colorFilters.includes(product.description.color)
          : product) &&
        (capacityFilters.length > 0
          ? capacityFilters.includes(product.description.capacity)
          : product) &&
        (diagonalFilters.length > 0
          ? diagonalFilters.includes(product.description.diagonal)
          : product) &&
        (wifiFilters.length > 0
          ? wifiFilters.includes(product.description.wifi)
          : product) &&
        product.price >= +priceLimits[0] &&
        product.price <= +priceLimits[1]
      );
    } else {
      return product;
    }
  });

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
