import React, { useEffect, useRef, useState } from "react";

const CheckoutOrderDeliveryCity = ({register, delivery, setDelivery, errors}) => {
  const [adress, setAdress] = useState('')

  return(
    <div className="checkout__order__delivery__city">
      <label className='checkout__order__delivery__label'>
        <input 
          className='checkout__order__delivery__input' 
          value={`Доставка по г. Днепр:  ${adress}`} 
          type="radio" 
          {...register('delivery')} 
          onChange={() => setDelivery('Доставка по г. Днепр')}
        />
        <span className='checkout__order__delivery__input_custom'></span>
          Доставка по г. Днепр
      </label>

      <p className="checkout__order__delivery__subtext">
        Стоимость доставки: от 50 до 200 грн (подъем на этаж - бесплатно!)
      </p>

      {delivery === 'Доставка по г. Днепр' && (
        <div className='pop-up__one-click__form__field-wrapper'>
        <label htmlFor="fullName" className='pop-up__one-click__form__label'>Имя и Фамилия</label>
        <input
          placeholder="Ваше имя"
          className='pop-up__one-click__form__input'
          {...register("fullName", {
            required: "Введите имя",
          })}
        />
        {errors.fullName && <p className='pop-up__one-click__form__error'>{errors.fullName.message}</p>}
      </div>
      )}
    </div>
  )
}

export default CheckoutOrderDeliveryCity