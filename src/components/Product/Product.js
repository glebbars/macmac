import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import ProductMain from '../ProductMain/ProductMain'
import ProductSlider from '../ProductSlider/ProductSlider'
import ProductsPageBreadcrumbs from '../ProductsPageBreadcrumbs/ProductsPageBreadcrumbs';

const Product = () => {
  const {id} = useParams()

  const [productDataObj, setProductDataObj] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`).then(res => setProductDataObj(res.data))
  }, [id])

  return(
    <div className='product'>
      {/* <ProductsPageBreadcrumbs /> */}
      <div className='product__content'>
        <ProductSlider />
         {productDataObj.category && <ProductMain productDataObj={productDataObj}/>}
      </div>
    </div>
  )
}

export default Product