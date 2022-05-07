import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import axios from 'axios'
import PersonalDataFields from '../PersonalDataFields/PersonalDataFields'

export const sendToTelegramBot = (data) => {
  axios.post('http://localhost:5000/orders', data).then(res => {

    const dataToTelBot = () => {
      let data = `<strong>Заказ: ${res.data.order} (${res.data.price})</strong> %0AИмя: ${res.data.fullName}`

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
      fullName: "",
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
      <PersonalDataFields register={register} errors={errors} control={control}/>   
      <p className='pop-up__one-click__form__contact'>Мы перезвоним вам и уточним детали</p>
      <button className='pop-up__one-click__form__btn' type='submit'>Сделать заказ</button>
    </form>
  );
}

export default OrderForm