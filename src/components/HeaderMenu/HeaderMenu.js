import React, {useState, usestate} from "react";
import { NavLink } from "react-router-dom";
import logo from '../../img/logo.svg'
import Search from '../Search/Search'
import favorites from '../../img/favorites.svg'
import bag from '../../img/shopping-bag.svg'

const HeaderMenu = () => {

  const [openedBurger, setOpenedBurger] = useState(false)

  const activeClass = openedBurger ? '_active' : ''

  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <div className="header__menu">
        <button onClick={() => setOpenedBurger(true)} className="header__menu__burger-toggle">
          <span className="header__menu__burger-toggle__line"></span>
          <span className="header__menu__burger-toggle__line"></span>
        </button>

        <nav className={`header__menu__nav ${'header__menu__nav' + activeClass}`}>
          <NavLink
            exact
            to="/"
            className="header__menu__link header__menu__link_all"
            activeClassName="header__menu__link_selected header__menu__link_all_selected"
          >
            Все товары
          </NavLink>
          <NavLink
            exact
            to="/"
            className="header__menu__link"
            activeClassName="header__menu__link_selected"
          >
            iPhone
          </NavLink>
          <NavLink
            exact
            to="/"
            className="header__menu__link"
            activeClassName="header__menu__link_selected"
          >
            AirPods
          </NavLink>
          <NavLink
            exact
            to="/"
            className="header__menu__link"
            activeClassName="header__menu__link_selected"
          >
            iPad
          </NavLink>
          <NavLink
            exact
            to="/"
            className="header__menu__link"
            activeClassName="header__menu__link_selected"
          >
            iMac
          </NavLink>

        </nav>

        
      </div>
      <Search />
      <div className="header__favorite-bag-container">
        <NavLink
          exact
          to="/"
          className="header__menu__link header__menu__link_bag"
          activeClassName="header__menu__link_selected"
        >
          Корзина
      </NavLink>
        <NavLink
          exact
          to="/"
          className="header__menu__link header__menu__link_favorite"
          activeClassName="header__menu__link_selected"
        >
          Избранное
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderMenu;
