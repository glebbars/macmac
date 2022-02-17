import React from "react";
import {useLocation} from 'react-router-dom'
import CustomDropDown from '../CustomDropDown/CustomDropDown'
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects'


const ProductsSideBar = () => {
  const location = useLocation()
  const categoryRouteName = location.pathname.split('/category/')[1]


  return(
    <div className="products__sidebar">
    <CustomDropDown checkboxes initiallyActive options={modelIphoneOptions} header='Модель' headerClass='products__sidebar__category-header' listClass='drop-down__list_products'/>
  </div>
  )

}

export default ProductsSideBar