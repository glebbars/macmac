import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import List from '../List/List'
import {bagCrumbs} from '../additionalObjects/additionalObjects'
import { Link } from 'react-router-dom'
import bagIcon from '../../img/bag-zero-length.svg'
import BagMain from '../BagMain/BagMain'

const Bag = () => {
  const addedToBag = useSelector((store) => store.app.addedToBag);

  useEffect(() => {
    localStorage.setItem("macmac-addedToBag", JSON.stringify(addedToBag));
  }, [addedToBag]);

  return (
    <div className="bag">
      <div className="bag__header__wrapper">
        <div className="bag__header__content">
          <div className="bag__header__crumbs-wrapper">
            {bagCrumbs.map((crumb, index) => (
              <Link to={crumb.link} key={index} className="bag__header__crumb">{crumb.name}</Link>
              )
            )}
          </div>
          <h1 className="bag__header__text">
            Корзина 
            {addedToBag.length > 0 && <span className="bag__header__text__length">{addedToBag.length}</span>}
          </h1>
        </div>
      </div>
      {addedToBag.length > 0 ? <BagMain addedToBag={addedToBag}/>
        :
        <div className="bag__none-items__wrapper">
          <img className="bag__none-items__image" src={bagIcon} alt="" />
          <h1 className="bag__none-items__header">Ваша корзина всё ещё пуста:(</h1>
          <Link className="bag__none-items__btn" to='/category/all-products'>Перейти к каталогу</Link>
        </div>
      }
    </div>
  )
};

export default Bag;
