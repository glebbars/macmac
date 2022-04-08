import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import axios from 'axios'

export const sendToTelegramBot = (data) => {
  axios.post('http://localhost:5000/orders', data).then(res => {

    const dataToTelBot = () => {
      let data = `<strong>Заказ: ${res.data.order} (${res.data.price})</strong> %0AИмя: ${res.data.firstName}`

      if(res.data.lastName){
        data = `${data} %0AФамилия: ${res.data.lastName}`
      } 
      if(res.data.email){
        data = `${data} %0AEmail: ${res.data.email}`
      }
      if(res.data.phone){
        data = `${data} %0A%0AТелефон: ${res.data.phone}`
      }
      return data
    }

    if(res.data.id > 0){
      axios.post(`https://api.telegram.org/bot5001793522:AAGlAAbTMuMUUx-TqP_uWJfBf22nHw44Fys/sendMessage?chat_id=634614891&text=${dataToTelBot()}&parse_mode=html`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  })
}

const OrderForm = ({closePopUp, productDataToBot}) => {
  const { handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      order: productDataToBot.order,
      price: productDataToBot.price
    }
  })

  return (
    <form className='pop-up__one-click__form' onSubmit={handleSubmit(sendToTelegramBot)}>
      <div className='pop-up__one-click__form__closing-cross' onClick={closePopUp}></div>
      <h1 className='pop-up__one-click__form__header'>Купить в один клик</h1>
      <div className='pop-up__one-click__form__field-wrapper'>
        <label htmlFor="firstName" className='pop-up__one-click__form__label'>Имя</label>
          <input
            className='pop-up__one-click__form__input'
            {...register("firstName", {
              required: "Введите имя",
            })}
            />
          {errors.firstName && <p className='pop-up__one-click__form__error'>{errors.firstName.message}</p>}
      </div>

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
            international
            withCountryCallingCode
            value={value}
            onChange={onChange}/>
          )}
      />
      {errors["phone"] && <p className="pop-up__one-click__form__error">Неверный номер телефона</p>}
        
        
      <p className='pop-up__one-click__form__contact'>Мы перезвоним вам и уточним детали</p>
      <button className='pop-up__one-click__form__btn' type='submit'>Сделать заказ</button>
    </form>
  );
}

export default OrderForm