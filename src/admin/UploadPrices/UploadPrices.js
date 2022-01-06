import React, { useEffect, useState } from "react";
import axios from 'axios'
import readXlsxFile from 'read-excel-file'

const UploadPrices = () => {
  const [usdExchangeRate, setUsdExchangeRate] = useState('')

  useEffect(() => {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(res => {
    res.data.find(obj => obj.ccy === 'USD' && obj.base_ccy === 'UAH' ? setUsdExchangeRate(+obj.sale) : null)
  })
  }, [])

  return (
    <label className="admin-upload-file">
      <input className="admin-upload-file__input" type="file" onChange={e => {
            const allPricesObj = {}
            readXlsxFile(e.target.files[0], { sheet: 1 }).then( rows => {
              rows.forEach(row => {
                if(row[0] && row[1] && typeof row[1] === 'number'){
                  const formattedPrice = Math.round(Math.ceil(row[1] * usdExchangeRate)/5)*5
                  allPricesObj[row[0]] = formattedPrice
                }
              })
              return allPricesObj
            }).then(data => axios.patch('http://localhost:5000/prices/1', data)).then(res => console.log(res))
        }}/>
        <span className="admin-upload-file__text">Upload prices</span>
    </label>
  )
}

export default UploadPrices