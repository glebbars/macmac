import React, { useMemo } from "react";
import {useLocation, useParams} from 'react-router-dom'
import {CustomDropDownLinks, CustomDropDownCheckboxes, CustomDropDownPriceRange} from '../CustomDropDown/CustomDropDown'
import {appleCategoryProductsOptions, getOptions} from '../additionalObjects/additionalObjects'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsSideBar = ({activeSideBar, closeSideBar}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const {categoryName, searchResult} = useParams()

  useEffect(() => {
    if(productsListFilters.length > 0){
      dispatch({
        type: 'REMOVE_PRODUCTS_LIST_FILTER',
        payload: [],
      });
    }
  }, [location])

  const categoryOptions = getOptions('category', categoryName, searchResult)
  const modelOptions = getOptions('model', categoryName, searchResult)
  const colorOptions = getOptions('color', categoryName, searchResult)
  const capacityOptions = getOptions('capacity', categoryName, searchResult)

  return(
    <div className={`products__sidebar ${activeSideBar ? 'products__sidebar_active' : ''}`}>
      <h1 className="products__sidebar__header">{categoryName === 'all-products' ? 'Категория' : 'Фильтры'}</h1>
      { categoryName === 'all-products' && <p className="products__sidebar__subheader">Все товары</p> }

      {categoryName === 'all-products' && (
        <CustomDropDownLinks 
          options={appleCategoryProductsOptions} 
          header='Apple' 
          listClass=''
          headerClass='products__sidebar__category-header' 
        /> 
      )}

      {(categoryName !== 'all-products' || searchResult) && (
        <CustomDropDownPriceRange 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          initiallyActive
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 
        /> 
      )}
      
      {(categoryName !== 'all-products' && searchResult) && categoryOptions.length > 0 && (
        <CustomDropDownCheckboxes 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          initiallyActive
          options={categoryOptions}
          header='Категория'
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 
        /> 
      )}

      {(categoryName !== 'all-products' || searchResult) && modelOptions.length > 0 && (
        <CustomDropDownCheckboxes 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          initiallyActive={false}
          options={modelOptions}
          header='Модель'
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 
        /> 
      )}

      {(categoryName !== 'all-products' || searchResult) && colorOptions.length > 0 && (
        <CustomDropDownCheckboxes 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          options={colorOptions}
          initiallyActive={false}
          header='Цвет'
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 
        /> 
      )}

      {(categoryName !== 'all-products' || searchResult) && capacityOptions.length > 0 && (
        <CustomDropDownCheckboxes 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          options={capacityOptions}
          initiallyActive={false}
          header='Память'
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 
        /> 
      )}

      <div onClick={closeSideBar} className="products__sidebar__closing-cross"></div>
  </div>
  )

}

export default ProductsSideBar