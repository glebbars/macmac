import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useLocation, useParams} from 'react-router-dom'
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects'
import {routesNames, bgImgObj} from '../additionalObjects/additionalObjects'
import ProductsPageBreadcrumbs from '../ProductsPageBreadcrumbs/ProductsPageBreadcrumbs'

const ProductsPageHeader = () => {
  const [styledBgObj, setStyledBgObj] = useState({})
  const {categoryName, searchResult} = useParams()
  const location = useLocation()

  useEffect(() => {
   const randomIndex = Math.floor(Math.random() * 3);
   const stylesObj = {
     backgroundColor: bgImgObj[randomIndex].bgColor,
     backgroundImage: `url(${(bgImgObj[randomIndex].lineImg)})`,
   }
   setStyledBgObj(stylesObj)
  }, [location])
  

  const searchCrumbs = [
    {
      name: 'MacMac',
      link: '/'
    },
    {
      name: `Результаты поиска для “${searchResult}”`,
      link: location.pathname
    }
  ]


  return (
    <div style={styledBgObj} className="products__header__background">
      <div className="products__header__wrapper">
        <ProductsPageBreadcrumbs searchCrumbs={searchCrumbs}/>
        {categoryName && <h1 className="products__header__text">{routesNames[categoryName]}</h1> }
        {searchResult && <h1 className="products__header__text">Результаты поиска для “{searchResult}"</h1> }
      </div>
    </div>
  );
};

export default React.memo(ProductsPageHeader);