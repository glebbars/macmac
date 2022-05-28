import React, { useEffect, useState } from "react";
import {useRefresh} from 'react-admin'
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { useSelector } from "react-redux";
import {getPriceOfProductFromDB} from '../AdditionalFunctions/AdditionalFunctions'

const UploadPrices = () => {

  const refresh = useRefresh()

  const productsArr = useSelector(store => store.app.productsArr);

  // const [usdExchangeRate, setUsdExchangeRate] = useState(0)


  // useEffect(() => {
  //   axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
  //   .then(res => {
  //     res.data.find(obj => obj.ccy === 'USD' && obj.base_ccy === 'UAH' ? setUsdExchangeRate(+obj.sale) : null)
  //   })
  // }, [])

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
      productsArr.map(async (obj) => {
        const newPrice = await getPriceOfProductFromDB(obj, priceListDB)
        if(obj.price !== newPrice){
          return {
            data: obj,
            newPrice: newPrice
          }
          // return await axios.patch(`http://localhost:5000/posts/${obj.id}`, {"price": newPrice}) 
        }
      }
    ))
    const filteredArr = allUpdatedProducts.filter(el => el)
    const updateProducts = updateProductsByChunks(filteredArr)
    console.log(updateProducts)
    return allUpdatedProducts
  }

  const updateProductsByChunks = (arr) => {
    console.log(arr)
    const chunkSize = 10;
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        return chunk.map(product => axios.patch(`http://localhost:5000/posts/${product.data.id}`, {"price": product.newPrice}) )
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