import React from 'react'
import CheckoutProducts from '../CheckoutProducts/CheckoutProducts'
import CheckoutOrder from '../CheckoutOrder/CheckoutOrder'
import { useForm } from 'react-hook-form'
import { useSelector } from "react-redux";
import {sendToTelegramBot} from '../sendToTelegramBot/sendToTelegramBot'

const Checkout = () => {
  const addedToBag = useSelector((store) => store.app.addedToBag);
  const percentToAdd = useSelector((store) => store.app.percentToAdd)

  const { handleSubmit, formState: { errors }, register, control, setValue } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      notCallBack: false,
      delivery: ['Самовывоз'],
      payment: 'Наличные при получении',
      comment: "",
      order: addedToBag,
      totalPrice: 0
    }
  })

  const hadleConfirm = (values) => {
    const prices = values.order.map(product => product.price * product.quantity)
    const total = prices.reduce((a, c) => a + c)

    const percentToNum = Math.round(total / 100 * percentToAdd)
    const totalWithPercent = (total + percentToNum).toLocaleString()

    const deliveryAdress = values.delivery.join(';  ') 

    const finalOrderArr = values.order.map(product => `- ${product.category} ${product.model} ${product.capacity} ${product.color} x${product.quantity} (${product.price.toLocaleString()}₴)`)

    const finalOrderStr = finalOrderArr.join(';%0A')

    console.log(finalOrderStr)

    const allValues = {
      ...values,
      order: finalOrderStr,
      delivery: deliveryAdress,
      totalPrice: `${totalWithPercent}₴`
    }

    sendToTelegramBot(allValues)
  }


  return (
    <form className="checkout" onSubmit={handleSubmit(hadleConfirm)}>
      <CheckoutOrder register={register} errors={errors} control={control} setValue={setValue}/>
      <CheckoutProducts addedToBag={addedToBag} percentToAdd={percentToAdd} />
    </form>
  )

}

export default Checkout