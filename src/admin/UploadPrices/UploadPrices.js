import React, { useEffect, useState } from "react";
import {useRefresh} from 'react-admin'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { useSelector } from "react-redux";
import {getPriceOfProductFromDB} from '../AdditionalFunctions/AdditionalFunctions'

const UploadPrices = () => {
  const refresh = useRefresh()
  const productsArr = useSelector(store => store.app.productsArr);

  const allPricesObj = {}

  const updateObjPricesWithExcel = (e) => {
    readXlsxFile(e.target.files[0], { sheet: 1 }).then( rows => {
      const usdExchangeRate = rows[0][0] === 'Курс' ? rows[0][1] : 0

      rows.forEach(row => {
        if(row[0] && row[1] && row[0] !== 'Курс' && typeof row[1] === 'number'){
          const formattedPrice = Math.round(Math.ceil(row[1] * usdExchangeRate)/5)*5
          const formattedNames = row[0].toLowerCase()
          allPricesObj[formattedNames] = formattedPrice
        }
      })
      return allPricesObj
    })
    .then(data => axios.put(`${process.env.REACT_APP_DB_API}/prices/1`, data))
    .then(res => updateProductsPrices(allPricesObj))
    .then(res => refresh())
  }
  
  const updateProductsPrices = async (priceListDB) => {
    const newPriceObjs = await Promise.all(
      productsArr.map(async product => {
        const newPrice = await getPriceOfProductFromDB(product, priceListDB)

        if(product.price !== 3){
          return {
            id: product.id,
            price: 5
          }
        }
      }
    ))
    const filteredObjs = newPriceObjs.filter(el => el)
    
    if(filteredObjs.length > 0){
      console.log(filteredObjs)
      const updatedPrices = await axios.patch(`${process.env.REACT_APP_DB_API}/patchcollection`, filteredObjs)
      return updatedPrices
    }

  }

  
  return (
    <label className="admin__upload-file">
      <input className="admin__upload-file__input" type="file" onChange={e => updateObjPricesWithExcel(e)}/>
        <span className="admin__upload-file__text">Upload prices</span>
    </label>
  )
}

export default UploadPrices