import React, { useEffect } from 'react'
import CheckoutProducts from '../CheckoutProducts/CheckoutProducts'
import CheckoutOrder from '../CheckoutOrder/CheckoutOrder'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import {sendToTelegramBot} from '../sendToTelegramBot/sendToTelegramBot'
import { PopupboxContainer } from 'react-popupbox';
import {handlePurchaseSuccess} from '../PopUps/PopUps'
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const addedToBag = useSelector((store) => store.app.addedToBag);
  const percentToAdd = useSelector((store) => store.app.percentToAdd)

  useEffect(() => {
    localStorage.setItem("macmac-addedToBag", JSON.stringify(addedToBag));

    if(addedToBag.length === 0){
      window.location.href = '/bag'
    }
  }, [addedToBag])


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

  const handlePopUpClose = () => {
    history.push('/')

    dispatch({
      type: 'ADD_TO_BAG',
      payload: [],
    });
  }

  const hadleConfirm = async (values) => {
    const prices = values.order.map(product => product.price * product.quantity)
    const total = prices.reduce((a, c) => a + c)

    const percentToNum = Math.round(total / 100 * percentToAdd)
    const totalWithPercent = (total + percentToNum).toLocaleString()

    const deliveryAdress = values.delivery.join(';  ') 

    const finalOrderArr = values.order.map(product => `- ${product.fullName} (${product.price.toLocaleString()}₴)`)

    const finalOrderStr = finalOrderArr.join(';%0A')

    const id = Math.floor(100000 + Math.random() * 900000)

    const allValues = {
      ...values,
      id: id,
      order: finalOrderStr,
      delivery: deliveryAdress,
      totalPrice: `${totalWithPercent}₴`
    }

   const botRes = await sendToTelegramBot(allValues)
   window.scrollTo({top: 0, behavior: 'smooth'})
   return await (botRes.data && botRes.data.ok) ? handlePurchaseSuccess(id, handlePopUpClose) : null
  }


  return (
    <form className="checkout" onSubmit={handleSubmit(hadleConfirm)}>
      <CheckoutOrder register={register} errors={errors} control={control} setValue={setValue}/>
      <CheckoutProducts addedToBag={addedToBag} percentToAdd={percentToAdd} />
      <PopupboxContainer />

    </form>
  )

}

export default Checkout