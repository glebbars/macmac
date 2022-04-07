import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import ProductMain from '../ProductMain/ProductMain'
import ProductSlider from '../ProductSlider/ProductSlider'
import ProductsPageBreadcrumbs from '../ProductsPageBreadcrumbs/ProductsPageBreadcrumbs';
import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';

const Product = () => {
  const {id} = useParams()

  const [productDataObj, setProductDataObj] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`).then(res => setProductDataObj(res.data))
  }, [id])

  const modelCrumb = {
    name: `${productDataObj.category} ${productDataObj.model} ${productDataObj.capacity} ${productDataObj.color}`,
    link: window.location.pathname
  }

  return(
    <div className='product'>
    {productDataObj.category && <ProductsPageBreadcrumbs modelCurmb={modelCrumb}/> }
    <div className='product__content'>
      {productDataObj.pictures && <ProductSlider productImgs={productDataObj.pictures } productId={productDataObj.id} /> }
      {productDataObj.category && <ProductMain setProductDataObj={setProductDataObj} productDataObj={productDataObj}/>}
    </div>
    <RecentlyViewed className=''/>
  </div>
  )
}

export default Product