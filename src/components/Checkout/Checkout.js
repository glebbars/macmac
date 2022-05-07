import React from 'react'
import CheckoutConfirm from '../CheckoutConfirm/CheckoutConfirm'
import CheckoutOrder from '../CheckoutOrder/CheckoutOrder'
import { useForm } from 'react-hook-form'

const Checkout = () => {

  const { handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      callBack: false
    }
  })

  const hadleConfirm = (values) => {
    console.log(values)
  }


  return (
    <form className="checkout" onSubmit={handleSubmit(hadleConfirm)}>
      <CheckoutOrder register={register} errors={errors} control={control} />
      <CheckoutConfirm />
    </form>
  )

}

export default Checkout