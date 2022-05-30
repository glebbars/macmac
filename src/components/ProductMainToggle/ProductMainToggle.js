import React, { useEffect, useState } from 'react'
import {getCapacityChoices, getColorChoices, colorForToggle} from '../../admin/AdditionalFunctions/AdditionalFunctions'
import axios from 'axios';

const ProductMainToggle = ({productDataObj, setProductDataObj}) => {
  const [similarProducts, setSimilarProducts] = useState([])
  const colorChoices = getColorChoices(productDataObj.description.category, productDataObj.description.model)
  const capacityChoices = getCapacityChoices(productDataObj.description.category, productDataObj.description.model)

  useEffect(() => {
    axios.get(`https://mac-mac.herokuapp.com/api/posts`).then(res => res.data)
    .then(data => data.filter(productFromDB => productFromDB.description.category === productDataObj.description.category && productFromDB.description.model === productDataObj.description.model))
    .then(data => setSimilarProducts(data))
  }, [])
  

  const toggleColor = (color) => {
    const newProduct = similarProducts.find(product => product.description.color === color && product.description.capacity === productDataObj.description.capacity)
    if(newProduct){
      setProductDataObj(newProduct)
    }
  }

  const toggleCapacity = (capacity) => {
    const newProduct= similarProducts.find(product => product.description.capacity === capacity && product.description.color === productDataObj.description.color)

    if(newProduct){
      setProductDataObj(newProduct)
    }
  }

  return(
    <div>
      {colorChoices.length > 0 && 
        <div className="product__main__color">
          <span className="product__main__color__text">Цвет</span>
          <div className='product__main__color__options-wrapper'>
            {colorChoices.map((colorObj, index) => 
              <div 
                onClick={() => toggleColor(colorObj.name)}
                key={index}
                className={`product__main__color__option ${productDataObj.description.color === colorObj.name ? "product__main__color__option_active" : ""}`} 
              >
                <div className='product__main__color__option__value' style={{background: colorForToggle[colorObj.name]}}></div>
              </div> 
            )}
          </div>
        </div>
      }
      {capacityChoices.length > 0 && 
        <div className="product__main__capacity">
          <span className="product__main__capacity__text">Память</span>
          <div className='product__main__capacity__options-wrapper'>
            {capacityChoices.map((capacityObj, index) => 
              <div 
                onClick={() => toggleCapacity(capacityObj.name)}
                key={index}
                className={`product__main__capacity__option ${productDataObj.description.capacity === capacityObj.name ? "product__main__capacity__option_active" : ""}`}
              >
                {capacityObj.name}
              </div> 
            )}
          </div>
        </div>
      }  
    </div>
    

  )
}

export default ProductMainToggle