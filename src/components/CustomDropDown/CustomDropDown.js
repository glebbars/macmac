import React, {useState} from "react";
import {NavLink, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCTS_LIST_FILTER
} from '../../redux/actions/types'
import { useEffect } from "react";
import ProductsEditComplition from '../ProductsEditComplition/ProductsEditComplition'

export const CustomDropDownLinks = ({ header, options, headerClass, listClass}) => {
  const [clickedBtn, setClickedBtn] = useState(true)

  useEffect(() => {
    if(window.innerWidth <= 375){
      setClickedBtn(false)
    }
  }, [])
  
  return(
    <>
      <h4 
        onClick={() => setClickedBtn(!clickedBtn)} 
        className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''} ${headerClass} `}
      >
        {header}
      </h4>
      
      <div className={`drop-down__list ${listClass} ${clickedBtn ? 'drop-down__list_active' : ''}`}>
        {options.map((option, index) => <NavLink  key={index} activeClassName="link_selected" className={option.class} to={option.link}>{option.text}</NavLink> )}
      </div>
    </>
  )
}



export const CustomDropDownCheckboxes = ({ activeSideBar, closeSideBar, initiallyActive, header, options, headerClass, listClass}) => {
  const [clickedBtn, setClickedBtn] = useState(initiallyActive)
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const dispatch = useDispatch()
  const [filtersTextArr, setFiltersTextArr] = useState([])

  console.log('render')


  useEffect(() => {
    if(window.innerWidth <= 480 && clickedBtn){
      setClickedBtn(false)
    }
  }, [activeSideBar])

  useEffect(() => {
    // if(window.innerWidth > 480){
      updateFiltersTextArr()
    // }
  }, [productsListFilters, activeSideBar])


  const updateFiltersTextArr = () => {
    const filteredProductsListArr = productsListFilters.map(el => el.text)
    setFiltersTextArr(filteredProductsListArr)
  }


  const toggleFilters = (filterName, text) => {
    if(window.innerWidth > 480){
      handleComplete(filterName, text)
    } else{
      if(!filtersTextArr.includes(text)){
        setFiltersTextArr([...filtersTextArr, text])
      } else{
        setFiltersTextArr(filtersTextArr.filter(el => el !== text))
      }
    }
  };

  const addProductsFilter = (text, filterName) => {
    dispatch({
      type: 'ADD_PRODUCTS_LIST_FILTER',
      payload: [ 
        ...productsListFilters, 
        {
          text: text,
          filterName: filterName
        }
      ],
    });
  }

  const handleComplete = (filterName, text) => {
    if(productsListFilters.length > 0) { 
      productsListFilters.some(filter => {
        if (filter.text === text) {
          return dispatch({
            type: 'REMOVE_PRODUCTS_LIST_FILTER',
            payload: productsListFilters.filter((filter) => filter.text !== text),
          });
        } else {
          addProductsFilter(text, filterName)
        }
      })
    } else{
      addProductsFilter(text, filterName)
    }
  }

  const handleCompleteMob = (filtersTextArr) => {
    const filterObjectsArr = filtersTextArr.map(text => {
      const filterObj = {
        text: text,
        filterName: options.find(el => el.text === text).filterName
      }
      return filterObj
    })

    dispatch({
      type: 'ADD_PRODUCTS_LIST_FILTER',
      payload: filterObjectsArr
    });
    
    closeSideBar()
  }

  const removeAllFilters = () => {
    dispatch({
      type: 'REMOVE_PRODUCTS_LIST_FILTER',
      payload: [],
    });
  }

  return(
    <>
      <h4 
        onClick={() => setClickedBtn(!clickedBtn)} 
        className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''}  ${headerClass}`}
      >
        {header}
      </h4>

      <div className={`drop-down__list ${listClass} ${clickedBtn ? `drop-down__list_active ${listClass}_active` : ''}`}>
        <div className="products__sidebar__arrow-back" onClick={() => { 
          setClickedBtn(false)
          updateFiltersTextArr()
        }}></div>
        <h4 className="products__sidebar__header products__sidebar__header__modal">{header}</h4>

        {options.map((option, index) => 
          <label key={index}className="products__sidebar__filter">
            <input 
              checked={filtersTextArr.includes(option.text)} 
              onChange={() => toggleFilters(option.filterName, option.text)} 
              className="products__sidebar__filter__checkbox"   
              type="checkbox" 
            />
            <span className="products__sidebar__filter__text">{option.text}</span>
          </label>
        )}
        <ProductsEditComplition 
          handleComplete={() => handleCompleteMob(filtersTextArr)} 
          handleClose={removeAllFilters}
        />
      </div>
    </>
  )
}