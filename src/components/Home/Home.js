import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import readXlsxFile from 'read-excel-file'
import axios from 'axios'

const Home = ({ 
  cardsArr,
  setClothId 
}) => {

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [usdExchangeRate, setUsdExchangeRate] = useState('')

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));

    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').then(res => {
      res.data.find(obj => obj.ccy === 'USD' && obj.base_ccy === 'UAH' ? setUsdExchangeRate(+obj.sale) : null
    )})

  }, []);


  const toggleFavorites = (cardId) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter((id) => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };


  return (
    <div className="cards-container">
      <input type="file" onChange={e => {
        
        readXlsxFile(e.target.files[0], { getSheets: true }).then( sheets => {
          const totalPicesArr = {}
          const result = sheets.map(sheet => {
            const pricesArrPerSheet = {}
            readXlsxFile(e.target.files[0], { sheet: sheet.name }).then( rows => {
              rows.map(row => {
                if(row[0] && row[1] && typeof row[1] === 'number'){
                   pricesArrPerSheet[row[0]] = row[1] * usdExchangeRate
                }
              })
              
            }).then( data => {
              if(Object.keys(pricesArrPerSheet).length >= 1) {
                 totalPicesArr[sheet.name] = pricesArrPerSheet
                 console.log(totalPicesArr)
                 return totalPicesArr
              }
            }).then(data => console.log(data))
            return totalPicesArr
          })
          // axios.post('http://localhost:5000/prices/', result).then(res => console.log(res))
          return result
        }).then(data => console.log(data, data[0]))
        // axios.post('http://localhost:5000/prices/', totalArr).then(res => console.log(res))

      }}/>
      
      {/* {cardsArr.map((cloth) => (
        <div className="card" key={cloth.id}>
          <Card
            toggleFavorites={toggleFavorites}
            cloth={cloth}
            filledStar={favorites.includes(cloth.id)}
            cardCross={false}
          />
          <Button
            text="Add to cart"
            clothId={cloth.id}
            bg="black"
          />
        </div>
      ))} */}
    </div>
  );
};

Home.propTypes = {
  cardsArr: PropTypes.array.isRequired,
  // setClothId: PropTypes.func.isRequired,
};

export default Home;
