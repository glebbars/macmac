import React, {useState} from "react";
import {NavLink, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCTS_LIST_FILTER
} from '../../redux/actions/types'
import { useEffect } from "react";

export const CustomDropDownLinks = ({links, checkboxes, initiallyActive, header, options, headerClass, listClass}) => {
  const [clickedBtn, setClickedBtn] = useState(false)
  
  return(
    <>
      <h4 
        onClick={() => setClickedBtn(!clickedBtn)} 
        className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''} ${headerClass} ${clickedBtn ?  `${headerClass}_active` : '' }`}
      >
        {header}
      </h4>
      
      <div className={`drop-down__list ${listClass}  ${clickedBtn ? 'drop-down__list_active' : ''}`}>
        {options.map((option, index) => <NavLink  key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink> )}
      </div>
    </>
  )
}



// export const CustomDropDownCheckboxes = () => {

//   const productsListFilters = useSelector((store) => store.app.productsListFilters);
//   const dispatch = useDispatch()

//   const toggleFilters = (filterName, text) => {
//     if(productsListFilters.length > 0) { 
//       productsListFilters.some(filter => {
//         if (filter.text === text) {
//           return dispatch({
//             type: 'REMOVE_PRODUCTS_LIST_FILTER',
//             payload: productsListFilters.filter((filter) => filter.text !== text),
//           });
//         } else {
//           addProductsFilter(text, filterName)
//         }
//       })
//     } else{
//       addProductsFilter(text, filterName)
//     }
//   };

//   const addProductsFilter = (text, filterName) => {
//     dispatch({
//       type: 'ADD_PRODUCTS_LIST_FILTER',
//       payload: [ ...productsListFilters, 
//         {
//           text: text,
//           filterName: filterName
//         }
//       ],
//     });
//   }

//   return(
//     <>
//       <h4 onClick={() => setClickedBtn(!clickedBtn)} className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''}  ${headerClass} ${clickedBtn ?  `${headerClass}_active` : '' }`}>{header}</h4>
//       <div className={`drop-down__list ${listClass}  ${clickedBtn ? 'drop-down__list_active' : ''}`}>
//         {options.map((option, index) => 
//         <label key={index}className="products__sidebar__filter">
//           <input 
//             checked={productsListFilters.some(filter => filter.text === option.text)} 
//             onChange={() => toggleFilters(option.filterName, option.text)} 
//             className="products__sidebar__filter__checkbox"   
//             type="checkbox" 
//           />
//           <span className="products__sidebar__filter__text">{option.text}</span>
//         </label>
//         )}
//       </div>
//     </>
//   )
// }