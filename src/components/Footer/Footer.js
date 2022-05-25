import React from 'react'
import monoColoredLogo from '../../img/monocolor.png'
import instagramIcon from '../../img/instagram.png'
import facebookIcon from '../../img/facebook.png'
import { NavLink, Link } from "react-router-dom";

const Footer = () => {

  return(
    <div className='footer'>
      <div className='container footer__container'>
        <div className='footer__social'>
          <img src={monoColoredLogo} alt="" />
          <p className='footer__social__text'>Интернет-магазин аксессуаров и техники Apple и Samsung</p>
          <div className='footer__social__networks-container'>
            <a href="1">
              <img className='footer__social__network' src={instagramIcon} alt="" />
            </a>
            <a href="1">
              <img className='footer__social__network' src={facebookIcon} alt="" />
            </a>
          </div>
        </div>
        <div className='footer__info'>
         <h6 className='footer__header'>Информация</h6>
         <div className='footer__info__table'>
         <NavLink
            to="/delivery-payment"
            className='footer__link'
            activeClassName='link_selected'
          >
            Доставка и оплата
          </NavLink>
         <NavLink
            to="/garanty"
            className='footer__link'
            activeClassName='link_selected'
          >
          Гарантия
          </NavLink>

          <Link to='/admin' className='footer__link footer__link_admin'>Become an admin</Link>

         </div>

        </div>
        <div className='footer__catalog'>
          <h6 className='footer__header'>Каталог</h6>
          <div className='footer__catalog__table'>
                <NavLink
                  to="/category/all-products"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  Все товары
                </NavLink>
                <NavLink
                  to="/category/iphone"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  iPhone
                </NavLink>
                {/* <NavLink
                  to="/category/imac"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  Mac
                </NavLink> */}
                <NavLink
                  to="/category/ipad"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  iPad
                </NavLink>
                <NavLink
                  to="/category/airpods"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  AirPods
                </NavLink>
                <NavLink
                  to="/category/macbook"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  Macbook
                </NavLink>
                <NavLink
                  to="/category/watch"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  Watch
                </NavLink>
                <NavLink
                  to="/category/apple-tv"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                  Apple TV
                </NavLink>
                <NavLink
                  to="/category/accessories"
                  className='footer__link'
                  activeClassName='footer__link_selected'
                >
                  Аксессуары
                </NavLink>
                <NavLink
                  to="/top-heated"
                  className='footer__link'
                  activeClassName='link_selected'
                >
                Топ продаж
                </NavLink>
          </div>
        </div>
        <div className='footer__contact'>
        <h6 className='footer__header footer__header_contact'>Связаться с нами</h6>
        <div className='footer__contact__table'>
          <a href='tel:+380979549803' className='footer__text footer__text_center'>+38(097)954-98-03</a>
          <a href='tel:+380634936619'  className='footer__text footer__text_center'>+38(063)493-66-19</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=notebuts@gmail.com" target="_blank" rel="noreferrer" className='footer__text footer__text_center'>macmac.brand@gmail.com</a>
          <div className='footer__contact__schedule'>
            <span className='footer__text footer__contact__schedule__text footer__text_center'>Пн.-Пт.: 9:00-19:00</span>
            <span className='footer__text footer__contact__schedule__text footer__text_center'>Сб.-Вс.: Выходной</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer