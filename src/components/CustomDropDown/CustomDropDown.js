import React, {useState} from "react";
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const CustomDropDown = ({links, checkboxes, initiallyActive, header, options, headerClass, listClass, addFilter}) => {

  const [clickedBtn, setClickedBtn] = useState(initiallyActive)

  const productsArr = useSelector((store) => store.app.productsArr);


  const filterProducts = (text) => {
    addFilter(text.toLowerCase())
  }

  return(
    <>
      <h4 onClick={() => setClickedBtn(!clickedBtn)} className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''}  ${headerClass} ${clickedBtn ?  `${headerClass}_active` : '' }`}>{header}</h4>
      <div className={`drop-down__list ${listClass}  ${clickedBtn ? 'drop-down__list_active' : ''}`}>
        {options.map((option, index) => {
          return links ? 
          <NavLink key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink> : 
          <label onClick={() => filterProducts(option.text)} key={index}className="products__sidebar__filter">
              <input className="products__sidebar__filter__checkbox" type="checkbox" />
              <span className="products__sidebar__filter__text">{option.text}</span>
          </label>
        })
      }
      </div>
    </>
  )
}

export default CustomDropDown