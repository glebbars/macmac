import React, {useState, usestate} from "react";
import { NavLink, Link } from "react-router-dom";
import logo from '../../img/logo.svg'
import Search from '../Search/Search'
import favorites from '../../img/favorites.svg'
import bag from '../../img/shopping-bag.svg'

const HeaderMenu = () => {

  const [openedBurger, setOpenedBurger] = useState(false)

  const activeClass = openedBurger ? '_active' : ''

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
                <h4 className="header__menu__link header__menu__link_additional header__menu__link_additional_header">Apple</h4>
                <NavLink
                  // exact
                  to="/category/all-products"
                  className="header__menu__link header__menu__link_all"
                  activeClassName="header__menu__link_selected header__menu__link_all_selected"
                >
                  Все товары
                </NavLink>
                <NavLink
                  exact
                  to="/category/iphone"
                  className="header__menu__link header__menu__link_mr-t"
                  activeClassName="header__menu__link_selected"
                >
                  iPhone
                </NavLink>
                <NavLink
                  exact
                  to="/category/airpods"
                  className="header__menu__link"
                  activeClassName="header__menu__link_selected"
                >
                  AirPods
                </NavLink>
                <NavLink
                  exact
                  to="/category/ipad"
                  className="header__menu__link"
                  activeClassName="header__menu__link_selected"
                >
                  iPad
                </NavLink>
                <NavLink
                  exact
                  to="/category/imac"
                  className="header__menu__link"
                  activeClassName="header__menu__link_selected"
                >
                  iMac
                </NavLink>
                <NavLink
                  exact
                  to="/category/macbook"
                  className="header__menu__link header__menu__link_additional"
                  activeClassName="header__menu__link_selected"
                >
                  Macbook
                </NavLink>
                <NavLink
                  exact
                  to="/category/watch"
                  className="header__menu__link header__menu__link_additional"
                  activeClassName="header__menu__link_selected"
                >
                  Watch
                </NavLink>

                <NavLink
                  exact
                  to="/category/accessories"
                  className="header__menu__link header__menu__link_additional header__menu__link_additional_header"
                  activeClassName="header__menu__link_selected"
                >
                  Аксессуары
                </NavLink>
                <NavLink
                  exact
                  to="/top-heated"
                  className="header__menu__link header__menu__link_additional header__menu__link_additional_header"
                  activeClassName="header__menu__link_selected"
                >
                  Топ продаж
                </NavLink>

                <NavLink
                  exact
                  to="/category/all-products"
                  className="header__menu__link header__menu__link_all header__menu__link_additional header__menu__link_additional_header"
                  activeClassName="header__menu__link_selected header__menu__link_all_selected"
                >
                  Все товары
                </NavLink>
              </nav>
            <div onClick={() => setOpenedBurger(false)}  className="header__menu__burger-cross"></div>
          </div>
          
        </div>
        <Search placeholder='Категория, название товара, артикул'/>

        <div className="header__favorite-bag-container">
          <NavLink
            exact
            to="/bag"
            className="header__menu__link header__menu__link_bag"
            activeClassName="header__menu__link_selected"
          >
            Корзина
          </NavLink>
          <NavLink
            exact
            to="/favourites"
            className="header__menu__link header__menu__link_favorite"
            activeClassName="header__menu__link_selected"
          >
            Избранное
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
