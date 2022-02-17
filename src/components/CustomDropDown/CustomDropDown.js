import React, {useState} from "react";
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCTS_LIST_FILTER,
  REMOVE_PRODUCTS_LIST_FILTER
} from '../../redux/actions/types'

const CustomDropDown = ({links, checkboxes, initiallyActive, header, options, headerClass, listClass}) => {

  const [clickedBtn, setClickedBtn] = useState(initiallyActive)

  const productsListFilters = useSelector((store) => store.app.productsListFilters);


  const dispatch = useDispatch()
  console.log('%%%')

  const toggleFilters = (newFilter) => {
    if (productsListFilters.includes(newFilter.toLowerCase())) {
      dispatch({
        type: 'REMOVE_PRODUCTS_LIST_FILTER',
        payload: productsListFilters.filter((filter) => filter !== newFilter.toLowerCase()),
      });
    } else {
      dispatch({
        type: 'ADD_PRODUCTS_LIST_FILTER',
        payload: [newFilter.toLowerCase(), ...productsListFilters],
      });
    }
    console.log(newFilter, productsListFilters)
  };



  return(
    <>
      <h4 onClick={() => setClickedBtn(!clickedBtn)} className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''}  ${headerClass} ${clickedBtn ?  `${headerClass}_active` : '' }`}>{header}</h4>
      <div className={`drop-down__list ${listClass}  ${clickedBtn ? 'drop-down__list_active' : ''}`}>
        {options.map((option, index) => {
          return links ? 
          <NavLink key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink> : 
          <label key={index}className="products__sidebar__filter">
              <input onClick={() => toggleFilters(option.text)} className="products__sidebar__filter__checkbox" type="checkbox" />
              <span className="products__sidebar__filter__text">{option.text}</span>
          </label>
        })
      }
      </div>
    </>
  )
}

export default CustomDropDown