import React from 'react'
import CheckoutConfirm from '../CheckoutConfirm/CheckoutConfirm'
import CheckoutOrder from '../CheckoutOrder/CheckoutOrder'
import { useForm } from 'react-hook-form'

const Checkout = () => {

  const { handleSubmit, formState: { errors }, register, control, setValue } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      callBack: false,
      delivery: ['Самовывоз'],
      payment: 'Наличные при получении',
      comment: ""
    }
  })

  const hadleConfirm = (values) => {
    console.log(values)
  }


  return (
    <form className="checkout" onSubmit={handleSubmit(hadleConfirm)}>
      <CheckoutOrder register={register} errors={errors} control={control} setValue={setValue}/>
      <CheckoutConfirm />
    </form>
  )

}

export default Checkout