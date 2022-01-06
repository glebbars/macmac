import React, { useEffect, useState } from "react";
import axios from 'axios'
import readXlsxFile from 'read-excel-file'

const UploadPrices = () => {
  const [usdExchangeRate, setUsdExchangeRate] = useState('')


  axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').then(res => {
    res.data.find(obj => obj.ccy === 'USD' && obj.base_ccy === 'UAH' ? setUsdExchangeRate(+obj.sale) : null
  )})

  return (
    <label className="admin-upload-file">
      <input className="admin-upload-file__input" type="file" onChange={e => {
          readXlsxFile(e.target.files[0], { getSheets: true }).then(async sheets => {
            const allPricesObj = {}
            await Promise.all( 
              sheets.map(async sheet => {
                await readXlsxFile(e.target.files[0], { sheet: sheet.name }).then( rows => {
                  rows.map(row => {
                    if(row[0] && row[1] && typeof row[1] === 'number'){
                      console.log(row[0])
                      allPricesObj[row[0]] = row[1] * usdExchangeRate
                    }
                  })
                })
              })
            )
            return allPricesObj
          }).then(pricesToDB => axios.patch('http://localhost:5000/prices/1', pricesToDB)
          .then(res => console.log(res)
          ))
        }}/>
        <span className="admin-upload-file__text">Upload prices</span>
    </label>
  )
}

export default UploadPrices