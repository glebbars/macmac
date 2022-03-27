import React, { useEffect, useState } from 'react'
import {getCapacityChoices, getColorChoices, colorForToggle} from '../../admin/AdditionalFunctions/AdditionalFunctions'
import OrderForm from '../OrderForm/OrderForm'
import axios from 'axios';

const ProductMainToggle = ({productDataObj, setProductDataObj}) => {
  const [similarProducts, setSimilarProducts] = useState([])
  const colorChoices = getColorChoices(productDataObj.model)
  const capacityChoices = getCapacityChoices(productDataObj.model)

  useEffect(() => {
    axios.get(`http://localhost:5000/posts`).then(res => res.data)
    .then(data => data.filter(productFromDB => productFromDB.model === productDataObj.model && productFromDB.category === productDataObj.category))
    .then(data => setSimilarProducts(data))
  }, [])
  

  const toggleColor = (color) => {
    const newProduct = similarProducts.find(product => product.color === color && product.capacity === productDataObj.capacity)
    if(newProduct){
      setProductDataObj(newProduct)
    }
  }

  const toggleCapacity = (capacity) => {
    console.log(capacity)
    const newProduct= similarProducts.find(product => product.capacity === capacity && product.color === productDataObj.color)
    if(newProduct){
      setProductDataObj(newProduct)
    }
  }

  return(
    <div>
      {colorChoices.length > 0 && 
        <div className="product__main__color">
          <span className="product__main__color__text">Цвет</span>
          {colorChoices.map((colorObj, index) => 
            <div 
              onClick={() => toggleColor(colorObj.name)}
              key={index}
              className={`product__main__color__option ${productDataObj.color === colorObj.name ? "product__main__color__option_active" : ""}`} 
            >
              <div className='product__main__color__option__value' style={{background: colorForToggle[colorObj.name]}}></div>
            </div> 
          )}
        </div>
      }
      {capacityChoices.length > 0 && 
        <div className="product__main__capacity">
          <span className="product__main__capacity__text">Память</span>
          {capacityChoices.map((capacityObj, index) => 
            <div 
              onClick={() => toggleCapacity(capacityObj.name)}
              key={index}
              className={`product__main__capacity__option ${productDataObj.capacity === capacityObj.name ? "product__main__capacity__option_active" : ""}`}
            >
              {capacityObj.name}
            </div> 
          )}
        </div>
      }  
    </div>
    

  )
}

export default ProductMainToggle