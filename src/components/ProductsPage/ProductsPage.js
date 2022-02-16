import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useLocation} from 'react-router-dom'
import ProductsSideBar from "../ProductsSideBar/ProductsSideBar";
import ProductsList from "../ProductsList/ProductsList";
import {routesNames, bgImgObj} from '../additionalObjects/additionalObjects'

const ProductsPage = ({ 
  ableToBeRemoved
}) => {
  const location = useLocation()
  const [styledBgObj, setStyledBgObj] = useState({})
  const productsArr = useSelector((store) => store.app.productsArr);

  const [filteredProductsArr, setFilteredProductsArr] = useState(productsArr)

  useEffect(() => {
   const randomIndex = Math.floor(Math.random() * 3);
   const stylesObj = {
     backgroundColor: bgImgObj[randomIndex].bgColor,
     backgroundImage: `url(${(bgImgObj[randomIndex].lineImg)})`,
   }

   setStyledBgObj(stylesObj)
  }, [location])

  useEffect(() => {
    console.log(productsArr)

    setFilteredProductsArr(productsArr)
  }, [productsArr])


  return (
    <div className="products">
      <div style={styledBgObj} className="products__background">
       <h1 className="products__header">{routesNames[location.pathname.split('/category/')[1]]}</h1>
      </div>
      <div className="products__section">

        <ProductsSideBar filteredProductsArr={filteredProductsArr} setFilteredProductsArr={setFilteredProductsArr}/>

        <ProductsList filteredProductsArr={filteredProductsArr}/>

      </div>
    </div>
  );
};

export default ProductsPage;