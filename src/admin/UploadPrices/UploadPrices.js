import React, { useEffect, useState } from "react";
import {useRefresh} from 'react-admin'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { useSelector } from "react-redux";
import {getPriceOfProductFromDB} from '../AdditionalFunctions/AdditionalFunctions'



const UploadPrices = () => {

  const refresh = useRefresh()

  const cardsArr = useSelector(store => store.app.cardsArr);

  const [usdExchangeRate, setUsdExchangeRate] = useState('')


  useEffect(() => {
    console.log('=')
    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(res => {
      res.data.find(obj => obj.ccy === 'USD' && obj.base_ccy === 'UAH' ? setUsdExchangeRate(+obj.sale) : null)
    })
  }, [])

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
  })
  .then(data => axios.patch('http://localhost:5000/prices/1', data))
  .then(res => updateProductsPrices())
  }
  
  const updateProductsPrices = () => {
    if(cardsArr.length > 0){
      cardsArr.map(obj => getPriceOfProductFromDB(obj)
        .then(data => axios.patch(`http://localhost:5000/posts/${obj.id}`, {price: data}) )
        .then(res => refresh())
      )
    }
  }

  return (
    <label className="admin-upload-file">
      {/* <div onClick={updateProductsPrices}>21</div> */}
      <input className="admin-upload-file__input" type="file" onChange={e => updateObjPricesWithExcel(e, usdExchangeRate)}/>
        <span className="admin-upload-file__text">Upload prices</span>
    </label>
  )
}

export default UploadPrices