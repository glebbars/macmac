import React from 'react'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import axios from 'axios'
import PersonalDataFields from '../PersonalDataFields/PersonalDataFields'
import {sendToTelegramBot} from '../sendToTelegramBot/sendToTelegramBot'
import {handlePurchaseSuccess} from '../PopUps/PopUps'

const OrderForm = ({closePopUp, productDataToBot}) => {
  const { handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      order: productDataToBot.order,
      totalPrice: `${productDataToBot.price.toLocaleString()}₴`,
      notCallBack: false
    }
  })

  const hadleConfirm = async (values) => {
    const id = Math.floor(100000 + Math.random() * 900000)

    const allValues = {
      id: id,
      ...values
    }

    const botRes = await sendToTelegramBot(allValues)
    const openPopUp = await (botRes.data && botRes.data.ok) ? handlePurchaseSuccess(id) : null
  }

  return (
    <form className='pop-up__one-click__form' onSubmit={handleSubmit(hadleConfirm)}>
      <div className='pop-up__one-click__form__closing-cross' onClick={closePopUp}></div>
      <h1 className='pop-up__one-click__form__header'>Купить в один клик</h1>
      <PersonalDataFields register={register} errors={errors} control={control}/>   
      <p className='pop-up__one-click__form__contact'>Мы перезвоним вам и уточним детали</p>
      <button className='pop-up__one-click__form__btn' type='submit'>Сделать заказ</button>
    </form>
  );
}

export default OrderForm