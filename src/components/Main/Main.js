import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Card from "../Card/Card";
import OrderForm from "../OrderForm/OrderForm";
import ProductsList from '../ProductsList/ProductsList'
import { useSelector } from "react-redux";
import CustomSlider from '../CustomSlider/CustomSlider'
import watchImg from "../../img/watch-banner.png"
import phoneImg from "../../img/phone-banner.png"
import macImg from "../../img/mac-banner.png"
import tvImg from "../../img/tv-banner.png"
import podsImg from "../../img/pods-banner.png"


const Main = () => {

  const cardsArr = useSelector(store => store.app.cardsArr)
  const favorites = useSelector(store => store.app.cardsArr)
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("addedToBag", JSON.stringify(addedToBag));
  }, []);

  return (
    <div className="main">
      <CustomSlider/>
      <div className="main__banners-container">
        <Link className="main__banner" to="watch">
          <img src={watchImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">Watch</span>
        </Link>
        <Link className="main__banner" to="iphone">
          <img src={phoneImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">iPhone</span>
        </Link>
        <Link className="main__banner" to="mac">
          <img src={macImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">Mac</span>
        </Link>
        <Link className="main__banner" to="tv">
          <img src={tvImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">TV</span>
        </Link>
        <Link className="main__banner" to="airpods">
          <img src={podsImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">AirPods</span>
        </Link>
      </div>
    </div>



    // <OrderForm/>
    // <ProductsList ableToBeRemoved={false} cardsArr={cardsArr}/>
  );
};


export default Main;
