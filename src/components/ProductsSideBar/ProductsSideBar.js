import React from "react";
import {useLocation, useParams} from 'react-router-dom'
import {CustomDropDownLinks, CustomDropDownCheckboxes, CustomDropDownPriceRange} from '../CustomDropDown/CustomDropDown'
import {appleCategoryProductsOptions, getAppleModelChoices, getSimilarCategoryName} from '../additionalObjects/additionalObjects'
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
      return getAppleModelChoices(categoryName)
    } else if(searchResult){
      const similarName = getSimilarCategoryName(searchResult)
      return getAppleModelChoices(similarName)
    }
  }

  const options = getOptions()

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
      
      {(categoryName !== 'all-products' || searchResult) && options.length > 0 && (
        <CustomDropDownCheckboxes 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          initiallyActive 
          options={options}
          header='Модель'
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 
        /> 
      )}

      <CustomDropDownPriceRange 
          activeSideBar={activeSideBar} 
          closeSideBar={closeSideBar} 
          initiallyActive 
          listClass='products__sidebar__category-list'
          headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' 

      />

      <div onClick={closeSideBar} className="products__sidebar__closing-cross"></div>
  </div>
  )

}

export default ProductsSideBar