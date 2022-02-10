import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomSlider from '../CustomSlider/CustomSlider'
import watchImg from "../../img/watch-banner.png"
import phoneImg from "../../img/phone-banner.png"
import macImg from "../../img/mac-banner.png"
import tvImg from "../../img/tv-banner.png"
import podsImg from "../../img/pods-banner.png"
import MainPoster from "../MainPoster/MainPoster";

const Main = () => {

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
        <Link className="main__banner" to="/category/watch">
          <img src={watchImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">Watch</span>
        </Link>
        <Link className="main__banner" to="/category/iphone">
          <img src={phoneImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">iPhone</span>
        </Link>
        <Link className="main__banner" to="/category/macbook">
          <img src={macImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">Mac</span>
        </Link>
        <Link className="main__banner" to="/category/tv">
          <img src={tvImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">TV</span>
        </Link>
        <Link className="main__banner" to="/category/airpods">
          <img src={podsImg} alt="" className="main__banner__img"/>
          <span className="main__banner__title">AirPods</span>
        </Link>
      </div>
      <MainPoster header="Только оригинальная техника Apple" text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident" btnText="Все товары Apple"  modificator="_original-only" link="/category/all-products"/>

      <MainPoster header="Огромное разнообразие аксессуаров Apple" text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident" btnText="Все аксессуары" modificator="_accessories" link="/category/accessories"/>

      <MainPoster header="Телевизоры Sony с технологией SmartTV" text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident" btnText="Все телевизоры Sony" modificator="_sony-tv" link="/category/sony-tv"/>
    </div>



    // <OrderForm/>
    // <ProductsList ableToBeRemoved={false} cardsArr={cardsArr}/>
  );
};


export default Main;
