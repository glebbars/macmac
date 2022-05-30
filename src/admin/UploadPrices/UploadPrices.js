import React, { useEffect, useState } from "react";
import {useRefresh} from 'react-admin'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { useSelector } from "react-redux";
import {getPriceOfProductFromDB} from '../AdditionalFunctions/AdditionalFunctions'

const UploadPrices = () => {
  const refresh = useRefresh()
  const productsArr = useSelector(store => store.app.productsArr);

  console.log('array', productsArr)

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
    .then(data => axios.put('http://localhost:5000/prices/1', data))
    .then(res => updateProductsPrices(allPricesObj))
    .then(res => refresh())
  }

  
  const updateProductsPrices = async (priceListDB) => {
    const allUpdatedProducts = await Promise.all(
      productsArr.map(async product => {
        const newPrice = await getPriceOfProductFromDB(product, priceListDB)

        if(product.price !== newPrice){
          console.log(product.id, product.fullName, product.price, '--->', newPrice)
          // const response = await axios.patch(`http://localhost:5000/posts/${product.id}`, {"price": newPrice})
          // console.log(product.id, response)
          // return response
          // product.newPrice = newPrice
          // return product
        }
      }
    ))

    // const filteredArr = allUpdatedProducts.filter(el => el)

    // if(filteredArr.length > 0){
    //   const updateProducts = await updateProductsByChunks(filteredArr)
    //   console.log(updateProducts)
    //   return updateProducts
    // }
  }

  // const updateProductsByChunks = (arr) => {
  //   const chunkSize = 15;
  //   for (let i = 0; i < arr.length; i += chunkSize) {
  //     const chunk = arr.slice(i, i + chunkSize);
  //     return Promise.all(chunk.map(product => axios.patch(`http://localhost:5000/posts/${product.id}`, {"price": product.newPrice}) ))
  //   }
  // }


  return (
    <label className="admin__upload-file">
      <input className="admin__upload-file__input" type="file" onChange={e => updateObjPricesWithExcel(e)}/>
        <span className="admin__upload-file__text">Upload prices</span>
    </label>
  )
}

export default UploadPrices