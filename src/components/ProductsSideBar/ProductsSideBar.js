import React from "react";
import {useLocation} from 'react-router-dom'
import CustomDropDown from '../CustomDropDown/CustomDropDown'
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const ProductsSideBar = () => {
  const location = useLocation()
  const categoryRouteName = location.pathname.split('/category/')[1]
  const productsListFilters = useSelector((store) => store.app.productsListFilters);

  const dispatch = useDispatch()

  useEffect(() => {
    if(productsListFilters.length > 0){
      dispatch({
        type: 'REMOVE_PRODUCTS_LIST_FILTER',
        payload: [],
      });
    }

  }, [location])

  return(
    <div className="products__sidebar">
    <h1 className="products__sidebar__header">{categoryRouteName === 'all-products' ? 'Категория' : 'Фильтры'}</h1>
    { categoryRouteName === 'all-products' && <p className="products__sidebar__subheader">Все товары</p> }

    { categoryRouteName === 'all-products'  ? 
      <CustomDropDown links initiallyActive options={categoryProductsOptions} header='Apple' headerClass='products__sidebar__category-header' listClass='drop-down__list_products'/> :
      <>
       <CustomDropDown checkboxes initiallyActive options={modelIphoneOptions} header='Модель' headerClass='products__sidebar__category-header' listClass='drop-down__list_products'/> 
      </> 
    }
  </div>
  )

}

export default ProductsSideBar