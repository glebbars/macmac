import Reactm, {useState} from "react";
import {NavLink} from 'react-router-dom'

const CategoryDropDown = ({brand, options, headerClass, listClass}) => {

  const [clickedBtn, setClickedBtn] = useState(false)

  return(
    <>
      <h4 onClick={() => setClickedBtn(!clickedBtn)} className={`drop-down__header ${headerClass} ${clickedBtn ? 'drop-down__header_active' : ''}`}>{brand}</h4>
      <div className={`drop-down__list ${listClass}`}>
        {options.map((option, index) => <NavLink key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink>)}
      </div>
    </>
  )
}

export default CategoryDropDown