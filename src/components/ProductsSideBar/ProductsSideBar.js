import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  CustomDropDownLinks,
  CustomDropDownCheckboxes,
  CustomDropDownPriceRange,
} from "../CustomDropDown/CustomDropDown";
import {
  appleCategoryProductsOptions,
  getFilteringOptions,
} from "../additionalObjects/additionalObjects";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsSideBar = ({ activeSideBar, closeSideBar }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const productsListFilters = useSelector(
    (store) => store.app.productsListFilters
  );
  const { categoryName, searchResult } = useParams();

  useEffect(() => {
    if (productsListFilters.length > 0) {
      dispatch({
        type: "REMOVE_PRODUCTS_LIST_FILTER",
        payload: [],
      });
    }
  }, [location]);

  const categoryOptions = getFilteringOptions(
    "category",
    categoryName,
    searchResult
  );

  const initialModelOptions = useMemo(
    () => getFilteringOptions("model", categoryName, searchResult),
    [categoryName, searchResult]
  );

  const colorOptions = getFilteringOptions("color", categoryName, searchResult);

  const capacityOptions = getFilteringOptions(
    "capacity",
    categoryName,
    searchResult
  );

  const diagonalOptions = getFilteringOptions(
    "diagonal",
    categoryName,
    searchResult
  );

  const memoryOptions = getFilteringOptions(
    "memory",
    categoryName,
    searchResult
  );

  const wifiOptions = getFilteringOptions("wifi", categoryName, searchResult);

  // const modelChoices = initialModelOptions(model => model.text)

  return (
    <div
      className={`products__sidebar ${
        activeSideBar ? "products__sidebar_active" : ""
      }`}
    >
      <h1 className="products__sidebar__header">
        {categoryName === "all-products" ? "Категория" : "Фильтры"}
      </h1>
      {categoryName === "all-products" && (
        <p className="products__sidebar__subheader">Все товары</p>
      )}

      {categoryName === "all-products" && (
        <CustomDropDownLinks
          options={appleCategoryProductsOptions}
          header="Apple"
          listClass=""
          headerClass="products__sidebar__category-header"
        />
      )}

      {(categoryName !== "all-products" || searchResult) && (
        <CustomDropDownPriceRange
          activeSideBar={activeSideBar}
          closeSideBar={closeSideBar}
          initiallyActive
          listClass="products__sidebar__category-list"
          headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
        />
      )}

      {/* why is category options are here ?? They are supposed to be when we are on all products route which means that there must be links (iphone, ipad, macbook) instead of checkboxes */}

      {(categoryName !== "all-products" || searchResult) &&
        initialModelOptions.length > 0 && (
          <CustomDropDownCheckboxes
            activeSideBar={activeSideBar}
            closeSideBar={closeSideBar}
            initiallyActive={false}
            options={initialModelOptions}
            header="Модель"
            listClass="products__sidebar__category-list"
            headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
          />
        )}

      {(categoryName !== "all-products" || searchResult) &&
        colorOptions.length > 0 && (
          <CustomDropDownCheckboxes
            activeSideBar={activeSideBar}
            closeSideBar={closeSideBar}
            options={colorOptions}
            initiallyActive={false}
            header="Цвет"
            listClass="products__sidebar__category-list"
            headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
          />
        )}

      {(categoryName !== "all-products" || searchResult) &&
        capacityOptions.length > 0 && (
          <CustomDropDownCheckboxes
            activeSideBar={activeSideBar}
            closeSideBar={closeSideBar}
            options={capacityOptions}
            initiallyActive={false}
            header="Память"
            listClass="products__sidebar__category-list"
            headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
          />
        )}

      {(categoryName !== "all-products" || searchResult) &&
        diagonalOptions.length > 0 && (
          <CustomDropDownCheckboxes
            activeSideBar={activeSideBar}
            closeSideBar={closeSideBar}
            options={diagonalOptions}
            initiallyActive={false}
            header="Диагональ"
            listClass="products__sidebar__category-list"
            headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
          />
        )}

      {(categoryName !== "all-products" || searchResult) &&
        memoryOptions.length > 0 && (
          <CustomDropDownCheckboxes
            activeSideBar={activeSideBar}
            closeSideBar={closeSideBar}
            options={memoryOptions}
            initiallyActive={false}
            header="Оперативная память"
            listClass="products__sidebar__category-list"
            headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
          />
        )}

      {(categoryName !== "all-products" || searchResult) &&
        wifiOptions.length > 0 && (
          <CustomDropDownCheckboxes
            activeSideBar={activeSideBar}
            closeSideBar={closeSideBar}
            options={wifiOptions}
            initiallyActive={false}
            header="Wi-Fi"
            listClass="products__sidebar__category-list"
            headerClass="products__sidebar__category-header products__sidebar__category-header_checkboxes"
          />
        )}

      <div
        onClick={closeSideBar}
        className="products__sidebar__closing-cross"
      ></div>
    </div>
  );
};

export default ProductsSideBar;
