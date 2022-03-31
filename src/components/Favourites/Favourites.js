import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import List from '../List/List'
import {favoritesCrumbs} from '../additionalObjects/additionalObjects'
import { Link } from 'react-router-dom'

const Favourites = () => {
  const productsArr = useSelector((store) => store.app.productsArr);
  const favorites = useSelector((store) => store.app.favorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filterredArr = productsArr.filter(product => {
    if(favorites.includes(product.id)){
      return product
    }
  })

  return (
    <div className="favorites">
      <div className="favorites__header__wrapper">
        <div className="favorites__header__content">
          <div className="favorites__header__crumbs-wrapper">
            {favoritesCrumbs.map((crumb, index) => (
              <Link to={crumb.link} key={index} className="favorites__header__crumb">{crumb.name}</Link>
              )
            )}
          </div>
          <h1 className="favorites__header__text">Избранное</h1>
        </div>
      </div>
      <List productsArr={filterredArr} altText='В избранном пока пусто'/>
    </div>
  );
};

export default Favourites;
