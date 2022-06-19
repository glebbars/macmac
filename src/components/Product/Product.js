import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import ProductMain from '../ProductMain/ProductMain'
import ProductSlider from '../ProductSlider/ProductSlider'
import ProductsPageBreadcrumbs from '../ProductsPageBreadcrumbs/ProductsPageBreadcrumbs';
import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';

const Product = () => {
  const {id} = useParams()

  const [productDataObj, setProductDataObj] = useState([])

  useLayoutEffect(() => {
    axios.get(`${process.env.REACT_APP_DB_API}/posts/${id}`).then(res => setProductDataObj(res.data))
  }, [id])

  const modelCrumb = {
    name: productDataObj.fullName,
    link: window.location.pathname
  }

  return(
    <div className='product'>
    {productDataObj.description?.category && <ProductsPageBreadcrumbs modelCurmb={modelCrumb}/> }
    <div className='product__content'>
      {productDataObj.pictures && <ProductSlider productImgs={productDataObj.pictures} productId={productDataObj.id} /> }
      {productDataObj.fullName && <ProductMain setProductDataObj={setProductDataObj} productDataObj={productDataObj}/>}
    </div>
    {productDataObj.fullName && <RecentlyViewed />}
  </div>
  )
}

export default Product