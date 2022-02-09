import React from "react";
import {NavLink} from 'react-router-dom'

const CategoryDropDown = ({brand, options, headerClass, listClass}) => {

  return(
    <>
      <h4 className={headerClass}>{brand}</h4>
      <div className={`drop-down__list ${listClass}`}>
        {options.map((option, index) => <NavLink key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink>)}
      </div>
    </>
  )
}

export default CategoryDropDown