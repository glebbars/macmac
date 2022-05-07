import React from "react";
import adressIcon from '../../img/adress-icon.png'

const CheckoutOrderDeliveryPickup = ({register}) => {

  return(
    <div className="checkout__order__delivery__pickup">
      <label className='checkout__order__delivery__pickup__label'>
        <input defaultChecked className='checkout__order__delivery__pickup__input' type="radio" {...register('delivery')}/>
        <span className='checkout__order__delivery__pickup__input_custom'></span>
          Самовывоз
      </label>
      <label className='checkout__order__delivery__pickup__label'>
        <input defaultChecked className='checkout__order__delivery__pickup__input' type="radio" {...register('delivery')}/>
        <span className='checkout__order__delivery__pickup__input_custom'></span>
          Само
      </label>

      <p className="checkout__order__delivery__pickup__text">
        Стоимость доставки: 
        <span className="checkout__order__delivery__pickup__text_bold">Бесплатно</span>
      </p>
      <div className="checkout__order__delivery__pickup__adress">
        <img className="checkout__order__delivery__pickup__adress__img" src={adressIcon} alt="" />
        <span className="checkout__order__delivery__pickup__adress__text">г. Днепр, пр-т Гагарина, 11</span>
      </div>
    </div>
  )
}

export default CheckoutOrderDeliveryPickup