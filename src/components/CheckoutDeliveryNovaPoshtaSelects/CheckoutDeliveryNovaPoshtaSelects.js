import React, { useEffect, useState } from "react";
import NovaPoshta from 'novaposhta';
import Select from 'react-select'

const api = new NovaPoshta({ apiKey: '6e746f873caf533d1c241e14437edfcf' });

const CheckoutDeliveryNovaPoshtaSelects = ({register, errors}) => {
  const [cityOptions, setCityOptions] = useState([])
  const [wareHouseOptions, setWareHouseOptions] = useState([])
  const [city, setCity] = useState('')
  const [wareHouse, setWareHouse] = useState('')

  
  useEffect(() => {
    api.address.getCities()
      .then(json => {
        const myArr = json.data.filter(el => el.SettlementTypeDescriptionRu === 'город')
        const options = myArr.map(el => (
          {
            "value": el.DescriptionRu,
            "label": el.DescriptionRu
          }
        ))
        setCityOptions(options)
      })
  }, [])

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption.value)

      api.address.getWarehouses({ CityName : selectedOption.value})
      .then(json => {
        const options = json.data.map(el => (
          {
            "value": el.DescriptionRu,
            "label": el.DescriptionRu
          }
        ))

        setWareHouseOptions(options)
      })

  }

  const handleWareHouseChange = (selectedOption) => {
    console.log(selectedOption.value)
  }

  return (
    <>
      {/* {cityOptions.length > 0 && <Select onChange={handleCityChange} options={cityOptions} />}
      {wareHouseOptions.length > 0 && <Select onChange={handleWareHouseChange} options={wareHouseOptions} />} */}
      {cityOptions.length > 0 && (
        <div className='pop-up__one-click__form__field-wrapper checkout__order__delivery__nova-poshta__field-wrapper'>
          <label  className='pop-up__one-click__form__label'>Населенный пункт</label>
          <input
            type='text'
            placeholder="Пункт доставки"
            className='pop-up__one-click__form__input'
            {...register("delivery[1]", {
                required: "Выберите ваш населенный пункт",
            })}
          />
          {errors.delivery && <p className='pop-up__one-click__form__error'>{errors.delivery[1].message}</p>}
        </div>
       )}


      {wareHouseOptions.length > 0 && (
        <div className='pop-up__one-click__form__field-wrapper checkout__order__delivery__nova-poshta__field-wrapper'>
          <label  className='pop-up__one-click__form__label'>Отделение</label>
          <input
            type='text'
            placeholder="Отделение “Нова Пошта”"
            className='pop-up__one-click__form__input'
            {...register("delivery[2]", {
              required: "Выберите отделение “Нова Пошта”",
            })}
          />
          {errors.delivery && <p className='pop-up__one-click__form__error'>{errors.delivery[2].message}</p>}
        </div>
      )}

    </>
  )

}

export default CheckoutDeliveryNovaPoshtaSelects