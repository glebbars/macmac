import React, {useEffect, useState} from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from '../../img/logo.svg'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import {CustomDropDownLinks} from "../CustomDropDown/CustomDropDown";
import {categoryHeaderOptions} from '../additionalObjects/additionalObjects'
import { useDispatch } from "react-redux";

const HeaderMenu = () => {

  const [openedBurger, setOpenedBurger] = useState(false)

  const dispatch = useDispatch()

  const location = useLocation()

  const activeClass = openedBurger ? '_active' : ''

  useEffect(() =>{
    setOpenedBurger(false)
  }, [location])


  return (
    <div className="header">
      <div className="header__container">
        <Link className="header__logo" to='/'>
          <img className="header__logo__img"  src={logo} alt="Logo" />
        </Link>
        <div className="header__menu">
          <button onClick={() => setOpenedBurger(true)} className="header__menu__burger-toggle">
            <span className="header__menu__burger-toggle__line"></span>
            <span className="header__menu__burger-toggle__line"></span>
          </button>

          <div className={`header__menu__burger-container ${'header__menu__burger-container' + activeClass}`}>
              <nav className="header__menu__nav">
                <NavLink
                  // exact
                  to="/category/all-products"
                  className="header__menu__link header__menu__link_all"
                  activeClassName="link_selected header__menu__link_all_selected"
                >
                  Все товары
                </NavLink>
                <CustomDropDownLinks links initiallyActive options={categoryHeaderOptions} header='Apple' 
                headerClass='header__menu__link header__menu__link_additional_header' listClass='drop-down__list_header'
                />

                <NavLink
                  exact
                  to="/category/accessories"
                  className="header__menu__link header__menu__link_additional header__menu__link_additional_header"
                  activeClassName="link_selected"
                >
                  Аксессуары
                </NavLink>
                <NavLink
                  exact
                  to="/top-heated"
                  className="header__menu__link header__menu__link_additional header__menu__link_additional_header"
                  activeClassName="link_selected"
                >
                  Топ продаж
                </NavLink>

                <NavLink
                  exact
                  to="/category/all-products"
                  className="header__menu__link header__menu__link_all header__menu__link_additional header__menu__link_additional_header"
                  activeClassName="link_selected header__menu__link_all_selected"
                >
                  Все товары
                </NavLink>
              </nav>
            <div onClick={() => setOpenedBurger(false)}  className="header__menu__burger-cross"></div>
          </div>
          
        </div>
        <HeaderSearch/>

        <div className="header__favorite-bag-container">
          <NavLink
            exact
            to="/bag"
            className="header__menu__link header__menu__link_bag"
            activeClassName="link_selected"
          >
            Корзина
          </NavLink>
          <NavLink
            exact
            to="/favourites"
            className="header__menu__link header__menu__link_favorite"
            activeClassName="link_selected"
          >
            Избранное
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
