import React, { useEffect, useState, useMemo } from "react";
import NovaPoshta from 'novaposhta';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

const customStyles = {

  menu: (provided, state) => ({
    ...provided,
    color: '#343A40',
    backgroundColor: "#FFFFFF",
  }),
  
  control: styles => ({ 
    ...styles, 
    border: "1px solid #DEE2E6",
    borderRadius: "8px",
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #6C757D',
    }
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#FECCB7' : 'white',

      ':hover': {
        ...styles[':hover'],
        backgroundColor: isSelected ? '#FECCB7' : '#FFEEE7'
      },
    };
  },
  placeholder: (styles) => ({ ...styles, color: "#ADB5BD" }),
};

const api = new NovaPoshta({ apiKey: process.env.REACT_APP_NOVA_POSHTA_API_KEY });

const CheckoutDeliveryNovaPoshtaSelects = ({register, errors, control}) => {
  const [warehouseOptions, setWarehouseOptions] = useState([])

  console.log(errors)

  const cityOptions = async (inputValue) => {
    const json = await api.address.getCities()
    console.log(json)
    const citiesArr = json.data.filter(el => el.SettlementTypeDescriptionRu === 'город')
    const options = citiesArr.map(city => {
      return {
        "value": city.DescriptionRu,
        "label": city.DescriptionRu
      }
    })

    const filteredOptions = options.filter(option => option.value.includes(inputValue))
    return filteredOptions
  }



  const handleCityChange = async (city) => {
    const json = await api.address.getWarehouses({ CityName: city})
    const warehouseOptions = json.data.map(warehouse => {
      return {
        "value": warehouse.DescriptionRu,
        "label": warehouse.DescriptionRu
      }
    }) 
    setWarehouseOptions(warehouseOptions)
  }



  return (
    <>
        <div className='pop-up__one-click__form__field-wrapper checkout__order__delivery__nova-poshta__field-wrapper'>
          <label  className='pop-up__one-click__form__label'>Населенный пункт</label>
          <Controller
             control={control}
             name="delivery[1]"
             rules={{
               required: true
             }}
             render={({ field: { onChange, onBlur, value } }) => (
              <AsyncSelect 
                styles={customStyles}
                onBlur={onBlur}
                selected={value}
                onChange={(data) => {
                  onChange(data.value)
                  handleCityChange(data.value)
                }} 
                noOptionsMessage={() => 'Нет результатов'}
                loadingMessage={() => 'Загрузка...'} 
                cacheOptions 
                defaultOptions 
                loadOptions={cityOptions} 
                placeholder="Пункт доставки"
                className='checkout__order__delivery__nova-poshta__controller'
                classNamePrefix="checkout__order__delivery__nova-poshta"
              />
            )}
          />

          {errors.delivery &&  errors.delivery[1] && <p className='pop-up__one-click__form__error'>Выберите населенный пункт</p>}
        </div>


      {warehouseOptions.length > 0 && (
        <div className='pop-up__one-click__form__field-wrapper checkout__order__delivery__nova-poshta__field-wrapper'>
          <label  className='pop-up__one-click__form__label'>Отделение</label>

          <Controller
             control={control}
             name="delivery[2]"
             rules={{
               required: true
             }}
             render={({ field: { onChange, onBlur, value } }) => (
              <Select
                styles={customStyles}
                onBlur={onBlur}
                onChange={(data) => {
                  onChange(data.value)
                }}
                selected={value}
                noOptionsMessage={() => 'Нет результатов'}
                placeholder="Отделение доставки"
                className='checkout__order__delivery__nova-poshta__controller'
                classNamePrefix="checkout__order__delivery__nova-poshta"
                options={warehouseOptions}
              />
            )}
          />

          {errors.delivery && <p className='pop-up__one-click__form__error'>Выберите отделение доставки</p>}
        </div>
      )}
    </>
  )

}

export default CheckoutDeliveryNovaPoshtaSelects