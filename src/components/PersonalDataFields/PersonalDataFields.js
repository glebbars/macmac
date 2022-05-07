import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";

const PersonalDataFields = ({register, errors, control}) => {

  return(
    <>
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
      <label htmlFor="phone" className='pop-up__one-click__form__label'>Номер телефона</label>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: true,
          validate: (value) => isValidPhoneNumber(value)
        }}

        render={({ field: { onChange, value } }) => (
          <Input
            className='pop-up__one-click__form__input pop-up__one-click__form__input_phone'
            country="UA"
            placeholder="+38(0__)-___-__-__"
            international
            withCountryCallingCode
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors["phone"] && <p className="pop-up__one-click__form__error">Неверный номер телефона</p>}
    </>
  )
  
}

export default PersonalDataFields