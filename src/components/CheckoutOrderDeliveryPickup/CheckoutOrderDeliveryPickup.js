import React from "react";
import adressIcon from '../../img/adress-icon.svg'

const CheckoutOrderDeliveryPickup = ({register, delivery, setDelivery, setValue}) => {

  return(
    <div className="checkout__order__delivery__pickup">
      <label className='checkout__order__label'>
        <input 
          defaultChecked 
          value='Самовывоз' 
          className='checkout__order__input' 
          type="radio" 
          {...register('delivery[0]')}
          onChange={() => {
            setDelivery('Самовывоз') 
            setValue('delivery', ['Самовывоз'])
          }}
        />
        <span className='checkout__order__input_custom'></span>
          Самовывоз
      </label>

      <p className="checkout__order__delivery__subtext">
        Стоимость доставки: 
        <span className="checkout__order__delivery__subtext_bold">Бесплатно</span>
      </p>
      {delivery === 'Самовывоз' && (
        <div className="checkout__order__delivery__pickup__content">
          <div className="checkout__order__delivery__pickup__adress">
            <img className="checkout__order__delivery__pickup__adress__img" src={adressIcon} alt="" />
            <span className="checkout__order__delivery__pickup__adress__text">г. Днепр, ул. Московская 8</span>
          </div>
          
          <div className="checkout__order__delivery__pickup__adress">
            <img className="checkout__order__delivery__pickup__adress__img" src={adressIcon} alt="" />
            <span className="checkout__order__delivery__pickup__adress__text">г. Киев, ул. Гетьмана 30</span>
          </div>

          <div className="checkout__order__delivery__warning">
            <span className="checkout__order__delivery__warning__text">Поставка товара на точку выдачи займёт 1-5 дней. После поступления товара с вами свяжется менеджер нашего магазина</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutOrderDeliveryPickup