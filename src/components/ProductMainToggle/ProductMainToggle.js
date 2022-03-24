import React from 'react'
import {getCapacityChoices, getColorChoices} from '../../admin/AdditionalFunctions/AdditionalFunctions'
import OrderForm from '../OrderForm/OrderForm'

const ProductMainToggle = ({productDataObj}) => {
  const colorChoices = getColorChoices(productDataObj.model)
  const capacityChoices = getCapacityChoices(productDataObj.model)

  return(
    <div>
      {colorChoices.length > 0 && 
        <div className="product__main__color">
          <span className="product__main__color__text">Цвет</span>
          {colorChoices.map((colorObj, index) => 
            <div 
              key={index}
              className={`product__main__color__option ${productDataObj.color === colorObj.name ? "product__main__color__option_active" : ""}`} 
            >
              <div className='product__main__color__option__value' style={{background: colorObj.name.toLocaleLowerCase()}}></div>
            </div> 
          )}
        </div>
      }
      {capacityChoices.length > 0 && 
        <div className="product__main__capacity">
          <span className="product__main__capacity__text">Память</span>
          {capacityChoices.map((capacityObj, index) => 
            <div 
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