import React from 'react'
import CheckoutProducts from '../CheckoutProducts/CheckoutProducts'
import CheckoutOrder from '../CheckoutOrder/CheckoutOrder'
import { useForm } from 'react-hook-form'
import { useSelector } from "react-redux";

const Checkout = () => {
  const addedToBag = useSelector((store) => store.app.addedToBag);

  const { handleSubmit, formState: { errors }, register, control, setValue } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      callBack: false,
      delivery: ['Самовывоз'],
      payment: 'Наличные при получении',
      comment: "",
      order: addedToBag
    }
  })

  const hadleConfirm = (values) => {
    console.log(values)
  }


  return (
    <form className="checkout" onSubmit={handleSubmit(hadleConfirm)}>
      <CheckoutOrder register={register} errors={errors} control={control} setValue={setValue}/>
      <CheckoutProducts addedToBag={addedToBag} />
    </form>
  )

}

export default Checkout