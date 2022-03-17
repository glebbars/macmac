import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useLocation} from 'react-router-dom'
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects'
import {routesNames, bgImgObj} from '../additionalObjects/additionalObjects'
import ProductsPageBreadcrumbs from '../ProductsPageBreadcrumbs/ProductsPageBreadcrumbs'

const ProductsPageHeader = () => {

  const location = useLocation()
  const [styledBgObj, setStyledBgObj] = useState({})

  console.log('render')

  useEffect(() => {
   const randomIndex = Math.floor(Math.random() * 3);
   const stylesObj = {
     backgroundColor: bgImgObj[randomIndex].bgColor,
     backgroundImage: `url(${(bgImgObj[randomIndex].lineImg)})`,
   }
   setStyledBgObj(stylesObj)
  }, [location])


  return (
    <div style={styledBgObj} className="products__header__background">
      <div className="products__header__wrapper">
          <ProductsPageBreadcrumbs />
        <h1 className="products__header__text">{routesNames[location.pathname.split('/category/')[1]]}</h1>
      </div>
    </div>
  );
};

export default React.memo(ProductsPageHeader);