import React, { useEffect, useRef } from "react";

const CheckoutOrderDeliveryCity = ({register, delivery, setDelivery, errors, setValue}) => {

  return(
    <div className="checkout__order__delivery__city">
      <label className='checkout__order__delivery__label'>
        <input 
          className='checkout__order__delivery__input' 
          {...register('delivery[0]')} 
          value='Доставка по г. Днепр'
          type="radio" 
          onChange={() => {
            setDelivery('Доставка по г. Днепр')
            setValue('delivery', ['Доставка по г. Днепр'])
          }}
        />
        <span className='checkout__order__delivery__input_custom'></span>
          Доставка по г. Днепр
      </label>

      <p className="checkout__order__delivery__subtext">
        Стоимость доставки: от 50 до 200 грн (подъем на этаж - бесплатно!)
      </p>

      {delivery === 'Доставка по г. Днепр' && (
        <div className='pop-up__one-click__form__field-wrapper checkout__order__delivery__city__field-wrapper'>
        <label  className='pop-up__one-click__form__label'>Адресс доставки</label>
        <input
          type='text'
          placeholder="Ваш адресс доставки"
          className='pop-up__one-click__form__input'
          {...register("delivery[1]", {
            required: "Введите ваш адресс доставки",
          })}
        />
        {errors.delivery && <p className='pop-up__one-click__form__error'>{errors.delivery[1].message}</p>}
      </div>
      )}
    </div>
  )
}

export default CheckoutOrderDeliveryCity