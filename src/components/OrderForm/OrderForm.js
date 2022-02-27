import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import axios from 'axios'

const OrderForm = () => {
  const { handleSubmit, formState: { errors }, register, control } = useForm()

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/orders', data).then(res => {

      const dataToBot = `<strong>Заказ: ${res.data.order}</strong>  %0AИмя: ${res.data.firstName} %0AФамилия: ${res.data.lastName} %0AEmail: ${res.data.email} %0A%0A<a href=+'${res.data.phone}'>Телефон: ${res.data.phone}</a>`


      if(res.data.id > 0){
        axios.post(`https://api.telegram.org/bot5001793522:AAGlAAbTMuMUUx-TqP_uWJfBf22nHw44Fys/sendMessage?chat_id=634614891&text=${dataToBot}&parse_mode=html`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        {...register("firstName", {
          required: "this is a required",
        })}
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        {...register("lastName", {
          required: "this is required",
        })}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

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
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="phone">Phone Number</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: true,
            validate: (value) => isValidPhoneNumber(value)
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              country="UA"
              international
              withCountryCallingCode
              value={value}
              onChange={onChange}/>
              )}
          />
          {errors["phone"] && (
            <p className="error-message">Invalid Phone</p>
          )}
      <label htmlFor="phone">Order</label>

        <input
        type="text"
        {...register("order", {
          required: "this is required",
        })}
      />
      <input type="submit" />
    </form>
  );
}

export default OrderForm