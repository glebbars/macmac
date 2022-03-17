import React from "react";
import {useLocation} from 'react-router-dom'
import {CustomDropDownLinks, CustomDropDownCheckboxes} from '../CustomDropDown/CustomDropDown'
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsSideBar = ({activeSideBar, closeSideBar}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  
  const categoryRouteName = location.pathname.split('/category/')[1]

  useEffect(() => {
    if(productsListFilters.length > 0){
      dispatch({
        type: 'REMOVE_PRODUCTS_LIST_FILTER',
        payload: [],
      });
    }

  }, [location])

  return(
    <div className={`products__sidebar ${activeSideBar ? 'products__sidebar_active' : ''}`}>
      <h1 className="products__sidebar__header">{categoryRouteName === 'all-products' ? 'Категория' : 'Фильтры'}</h1>
      { categoryRouteName === 'all-products' && <p className="products__sidebar__subheader">Все товары</p> }

      { categoryRouteName === 'all-products' ? 
        <CustomDropDownLinks links options={categoryProductsOptions} header='Apple' headerClass='products__sidebar__category-header' listClass=''/> :
        <CustomDropDownCheckboxes initiallyActive checkboxes options={modelIphoneOptions} header='Модель' headerClass='products__sidebar__category-header products__sidebar__category-header_checkboxes' listClass='products__sidebar__category-list'/> 
      }
      <div onClick={closeSideBar} className="products__sidebar__closing-cross"></div>
  </div>
  )

}

export default ProductsSideBar