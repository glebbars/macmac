import React from "react";
import {useLocation, useParams} from 'react-router-dom'
import {CustomDropDownLinks, CustomDropDownCheckboxes} from '../CustomDropDown/CustomDropDown'
import {categoryProductsOptions, getModelChoices} from '../additionalObjects/additionalObjects'
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

  const getOptions = () => {
    if(categoryName){
      return getModelChoices(categoryName)
    } else if(searchResult){
      return getModelChoices(searchResult.toLowerCase())
    }

  }

  return(
    <div className={`products__sidebar ${activeSideBar ? 'products__sidebar_active' : ''}`}>
      <h1 className="products__sidebar__header">{categoryName === 'all-products' ? 'Категория' : 'Фильтры'}</h1>
      { categoryName === 'all-products' && <p className="products__sidebar__subheader">Все товары</p> }

      {categoryName === 'all-products' && (
        <CustomDropDownLinks 
          options={categoryProductsOptions} 
          header='Apple' 
          headerClass='products__sidebar__category-header' 
          listClass=''
        /> 
      )}
      {(categoryName !== 'all-products' || searchResult) && (
        <CustomDropDownCheckboxes 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          initiallyActive 
          options={getOptions()}
          header='Модель'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' listClass='products__sidebar__category-list'
        /> 
      )}
      <div onClick={closeSideBar} className="products__sidebar__closing-cross"></div>
  </div>
  )

}

export default ProductsSideBar