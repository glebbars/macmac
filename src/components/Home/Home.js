import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import readXlsxFile from 'read-excel-file'
import axios from 'axios'
import OrderForm from "../OrderForm/OrderForm";
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
      <OrderForm/>
      {/* <input type="file" onChange={e => {
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
      }}/> */}
      
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
