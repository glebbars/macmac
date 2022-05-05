import React, {useEffect, useRef, useState} from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from '../../img/logo.svg'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import {CustomDropDownLinks} from "../CustomDropDown/CustomDropDown";
import {categoryHeaderOptions} from '../additionalObjects/additionalObjects'
import { useDispatch, useSelector } from "react-redux";
import HeaderCatalog from '../HeaderCatalog/HeaderCatalog'
import { HashLink } from 'react-router-hash-link';

const HeaderMenu = () => {
  const [openedBurger, setOpenedBurger] = useState(false)
  const [activeCatalog, setActiveCatalog] = useState(false)
  const favorites = useSelector((store) => store.app.favorites);
  const addedToBag = useSelector((store) => store.app.addedToBag);

  const dispatch = useDispatch()

  const location = useLocation()


  const activeClass = openedBurger ? '_active' : ''


  useEffect(() =>{
    setOpenedBurger(false)
    setActiveCatalog(false)
  }, [location])


  return (
    <div className="header">
      <HeaderCatalog setActiveCatalog={setActiveCatalog} activeCatalog={activeCatalog} />

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
                <span
                  onClick={() => setActiveCatalog(!activeCatalog)}
                  className={`header__menu__link header__menu__link_all ${activeCatalog ? 'header__menu__link_all_selected' : ''}`}
                >
                  Все товары
                </span>


                <CustomDropDownLinks 
                  links 
                  initiallyActive 
                  options={categoryHeaderOptions}    
                  header='Apple' 
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

                <HashLink 
                  scroll={(el) => el.scrollIntoView({ behavior: 'smooth'})}
                  className="header__menu__link header__menu__link_additional header__menu__link_additional_header"
                  to='/#best-sellers'
                >
                Топ продаж
                </HashLink>

                <Link 
                  to="/category/all-products"
                  className="header__menu__link header__menu__link_all header__menu__link_additional  header__menu__link_additional_header"
                >
                  Все товары
                </Link>
              </nav>
            <div onClick={() => setOpenedBurger(false)}  className="header__menu__burger-cross"></div>
          </div>
          
        </div>
        <HeaderSearch />

        <div className="header__favorite-bag-container">
          <Link
            to="/bag"
            className="header__menu__link header__menu__link_bag"
          >
            {addedToBag.length > 0 && <span className="header__menu__link__length-notification">{addedToBag.length}</span> }
            Корзина
          </Link>
          <Link
            to="/favourites"
            className="header__menu__link header__menu__link_favorite"
          >
            {favorites.length > 0 && <span className="header__menu__link__length-notification">{favorites.length}</span> }
            Избранное
          </Link>
        </div>
    
      </div>
    </div>
  );
};

export default HeaderMenu;