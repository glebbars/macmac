import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import axios from 'axios'

export const sendToTelegramBot = (data) => {
  axios.post('http://localhost:5000/orders', data).then(res => {

    const dataToBot = `<strong>Заказ: ${res.data.order}</strong>  %0AИмя: ${res.data.firstName} %0AФамилия: ${res.data.lastName} %0AEmail: ${res.data.email} %0A%0A<a href=+'${res.data.phone}'>Телефон: ${res.data.phone}</a>`

    if(res.data.id > 0){
      axios.post(`https://api.telegram.org/bot5001793522:AAGlAAbTMuMUUx-TqP_uWJfBf22nHw44Fys/sendMessage?chat_id=634614891&text=${dataToBot}&parse_mode=html`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  })
}

const OrderForm = ({closePopUp}) => {
  const { handleSubmit, formState: { errors }, register, control } = useForm()

  return (
    <form className='product__pop-up__form' onSubmit={handleSubmit(sendToTelegramBot)}>
      <div className='product__pop-up__form__closing-cross' onClick={closePopUp}></div>
      <h1 className='product__pop-up__form__header'>Купить в один клик</h1>
      <label htmlFor="firstName" className='product__pop-up__form__label'>Имя</label>
      <input
        className='product__pop-up__form__input'
        {...register("firstName", {
          required: "Введите имя",
        })}
      />
      {errors.firstName && <p className='product__pop-up__form__error'>{errors.firstName.message}</p>}

      {/* <label htmlFor="lastName">Last Name</label>
      <input
        {...register("lastName", {
          required: "this is required",
        })}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>} */}
{/* 
      <label htmlFor="email">Email</label>
      <input
        type="text"
        {...register("email", {
          required: "this is required",
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email address"
          }
        })}
      />
      {errors.email && <p>{errors.email.message}</p>} */}

      <label htmlFor="phone" className='product__pop-up__form__label'>Номер телефона</label>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: true,
          validate: (value) => isValidPhoneNumber(value)
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className='product__pop-up__form__input product__pop-up__form__input_phone'
            country="UA"
            international
            withCountryCallingCode
            value={value}
            onChange={onChange}/>
          )}
      />
      {errors["phone"] && <p className="error-message">Неверный номер телефона</p>}
        
        
      <p className='product__pop-up__form__contact'>Мы перезвоним вам и уточним детали</p>
      <button className='product__pop-up__form__btn' type='submit'>Сделать заказ</button>
    </form>
  );
}

export default OrderForm