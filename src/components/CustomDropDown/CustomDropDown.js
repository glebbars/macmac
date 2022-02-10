import Reactm, {useState} from "react";
import {NavLink} from 'react-router-dom'

const CustomDropDown = ({links, checkboxes, initiallyActive, header, options, headerClass, listClass}) => {

  const [clickedBtn, setClickedBtn] = useState(initiallyActive)

  return(
    <>
      <h4 onClick={() => setClickedBtn(!clickedBtn)} className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''}  ${headerClass} `}>{header}</h4>
      <div className={`drop-down__list ${listClass}  ${clickedBtn ? 'drop-down__list_active' : ''}`}>
        {options.map((option, index) => {
          if(links){
            return <NavLink key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink>
          } else if (checkboxes) {
            return ( 
            <label className="products__sidebar__filter">
              <input className="products__sidebar__filter__checkbox" type="checkbox" />
              <span key={index} className={option.class}>{option.text}</span>
            </label>)
            
          }
        }
        )}
      </div>
    </>
  )
}

export default CustomDropDown