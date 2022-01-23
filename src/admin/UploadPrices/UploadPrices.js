import React, { useEffect, useState } from "react";
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { useSelector } from "react-redux";
import {getPriceOfProductFromDB} from '../AdditionalFunctions/AdditionalFunctions'

const allPricesObj = {}

const updateObjPricesWithExcel = (e, usdExchangeRate) => {
  readXlsxFile(e.target.files[0], { sheet: 1 }).then( rows => {
    rows.forEach(row => {
      if(row[0] && row[1] && typeof row[1] === 'number'){
        const formattedPrice = Math.round(Math.ceil(row[1] * usdExchangeRate)/5)*5
        const formattedNames = row[0].toLowerCase()
        allPricesObj[formattedNames] = formattedPrice
      }
    })
    return allPricesObj
  }).then(data => axios.patch('http://localhost:5000/prices/1', data)).then(res => console.log(res))
}


const UploadPrices = () => {
  const [usdExchangeRate, setUsdExchangeRate] = useState('')

  const cardsArr = useSelector(store => store.app.cardsArr);

  useEffect(() => {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(res => {
    res.data.find(obj => obj.ccy === 'USD' && obj.base_ccy === 'UAH' ? setUsdExchangeRate(+obj.sale) : null)
  })
  }, [])

  if(cardsArr.length > 0){
    cardsArr.map(obj => getPriceOfProductFromDB(obj).then(data => console.log(data)))
  }
  
  // const updateProductsPrices = () => {
  // }

  return (
    <label className="admin-upload-file">
      <input className="admin-upload-file__input" type="file" onChange={e => updateObjPricesWithExcel(e, usdExchangeRate)}/>
        <span className="admin-upload-file__text">Upload prices</span>
    </label>
  )
}

export default UploadPrices