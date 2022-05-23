import React from "react";
import PersonalDataFields from '../PersonalDataFields/PersonalDataFields'

const CheckoutOrderPersonalData = ({register, errors, control}) => {

  return(
    <div className="checkout__order__person">
      <h2 className="checkout__order__subheader">Шаг 1 - Информация пользователя</h2>
      <PersonalDataFields register={register} errors={errors} control={control} /> 
      <label className="checkout__order__person__callback__label">
        <input {...register('notCallBack')} type="checkbox" className="checkout__order__person__callback__checkbox" />
        <span className="checkout__order__person__callback__text">Не перезванивать мне</span>
      </label>
    </div>
  )
}

export default CheckoutOrderPersonalData