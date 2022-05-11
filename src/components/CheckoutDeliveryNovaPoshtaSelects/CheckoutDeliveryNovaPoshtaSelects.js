import React, { useEffect, useState } from "react";
import NovaPoshta from 'novaposhta';
import AsyncSelect from 'react-select/async';
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
    borderRadius: "8px"
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#FA530D' : 'white',
      color: 'black',

      ':hover': {
        ...styles[':hover'],
        backgroundColor: isSelected ? '#FA530D' : '#FFEEE7'
      },
    };
  },
  placeholder: (styles) => ({ ...styles, color: "#ADB5BD" }),
};



// const colourStyles: StylesConfig<ColourOption> = {
//   control: (styles) => ({ ...styles, backgroundColor: 'white' }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     // const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: isDisabled
//         ? undefined
//         : isSelected
//         ? data.color
//         : isFocused
//         ? color.alpha(0.1).css()
//         : undefined,
//       color: isDisabled
//         ? '#ccc'
//         : isSelected
//         ? chroma.contrast(color, 'white') > 2
//           ? 'white'
//           : 'black'
//         : data.color,
//       cursor: isDisabled ? 'not-allowed' : 'default',

//       ':active': {
//         ...styles[':active'],
//         backgroundColor: !isDisabled
//           ? isSelected
//             ? data.color
//             : color.alpha(0.3).css()
//           : undefined,
//       },
//     };
//   },
//   input: (styles) => ({ ...styles, ...dot() }),
//   placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
//   singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
// };


const api = new NovaPoshta({ apiKey: '6e746f873caf533d1c241e14437edfcf' });

const CheckoutDeliveryNovaPoshtaSelects = ({register, errors, control}) => {
  const [cityOptions, setCityOptions] = useState([])
  const [wareHouseOptions, setWareHouseOptions] = useState([])
  const [city, setCity] = useState('')
  const [wareHouse, setWareHouse] = useState('')

  console.log(errors)

  const getCityOptions = async () => {
    const json = await api.address.getCities()
    const citiesArr = json.data.filter(el => el.SettlementTypeDescriptionRu === 'город')
    const options = citiesArr.map(city => {
      return {
        "value": city.DescriptionRu,
        "label": city.DescriptionRu
      }
    })
    return options
  }


  const handleCityChange = (selectedOption) => {
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
      {/* {wareHouseOptions.length > 0 && <Select onChange={handleWareHouseChange} options={wareHouseOptions} />} */}

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
                onChange={onChange}
                // onChange={(data) => {
                  // console.log(value)
                  // onChange(data.value)
                  // handleCityChange(data)
                // }} 
                cacheOptions 
                defaultOptions 
                loadOptions={getCityOptions} 
                placeholder="Пункт доставки"
                className='checkout__order__delivery__nova-poshta__controller'
                classNamePrefix="checkout__order__delivery__nova-poshta"
              />
            )}
          />
          <input
            type='text'
            placeholder="Отделение “Нова Пошта”"
            className='pop-up__one-click__form__input'
            {...register("delivery[2]", {
              required: "Выберите отделение “Нова Пошта”",
            })}
          />


          {errors.delivery &&  errors.delivery[1] && <p className='pop-up__one-click__form__error'>Выберите населенный пункт</p>}
        </div>


      {/* {wareHouseOptions.length > 0 && ( */}
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
      {/* )} */}

    </>
  )

}

export default CheckoutDeliveryNovaPoshtaSelects