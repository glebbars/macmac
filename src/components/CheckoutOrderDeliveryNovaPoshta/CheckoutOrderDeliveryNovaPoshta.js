import React from "react";
import adressIcon from '../../img/adress-icon.svg'
import CheckoutDeliveryNovaPoshtaSelects from '../CheckoutDeliveryNovaPoshtaSelects/CheckoutDeliveryNovaPoshtaSelects'

const CheckoutOrderDeliveryNovaPoshta = ({register, delivery, setDelivery, setValue, errors}) => {

  return(
    <div className="checkout__order__delivery__nova-poshta">
      <label className='checkout__order__delivery__label'>
        <input 
          value='Нова Пошта' 
          className='checkout__order__delivery__input' 
          type="radio" 
          {...register('delivery[0]')}
          onChange={() => {
            setDelivery('Нова Пошта') 
            setValue('delivery', ['Нова Пошта'])
          }}
        />
        <span className='checkout__order__delivery__input_custom'></span>
        Доставка в отделение “Нова Пошта”
      </label>

      <p className="checkout__order__delivery__subtext">Стоимость доставки: по тарифам “Нова Пошта”</p>
      <p className="checkout__order__delivery__subtext">Время доставки: 1-5 дней,  предоплата 100%</p>
      {delivery === 'Нова Пошта' && (
        <div className="checkout__order__delivery__nova-poshta__content">
          <CheckoutDeliveryNovaPoshtaSelects register={register} errors={errors} />


          <div className="checkout__order__delivery__warning">
            <span className="checkout__order__delivery__warning__text">Для получения заказа стоимостью свыше 5000 грн. нужно предъявить удостоверение личности. Перед визитом в отделение, не забудьте взять паспорт или водительское удостоверение</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutOrderDeliveryNovaPoshta