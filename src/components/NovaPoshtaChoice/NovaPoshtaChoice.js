import React, { useEffect, useState } from "react";
import NovaPoshta from 'novaposhta';
import Select from 'react-select'

const api = new NovaPoshta({ apiKey: '6e746f873caf533d1c241e14437edfcf' });

const Checkout = () => {
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
    <div className="checkout">
      {cityOptions.length > 0 && <Select onChange={handleCityChange} options={cityOptions} />}
      {wareHouseOptions.length > 0 && <Select onChange={handleWareHouseChange} options={wareHouseOptions} />}
    </div>
  )

}

export default Checkout