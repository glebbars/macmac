import React, {useState} from "react";
import {NavLink, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCTS_LIST_FILTER
} from '../../redux/actions/types'
import { useEffect } from "react";
import ProductsEditComplition from '../ProductsEditComplition/ProductsEditComplition'
import { Range, getTrackBackground } from "react-range";


export const CustomDropDownLinks = ({ header, options, headerClass, listClass}) => {
  const [clickedBtn, setClickedBtn] = useState(true)

  useEffect(() => {
    if(window.innerWidth <= 480){
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


  useEffect(() => {
    if(window.innerWidth <= 480 && clickedBtn){
      setClickedBtn(false)
    }
  }, [activeSideBar])

  const addProductsFilter = (filterName, value) => {
    dispatch({
      type: 'ADD_PRODUCTS_LIST_FILTER',
      payload: [ 
        ...productsListFilters, 
        {
          value: value,
          filterName: filterName
        }
      ],
    });
  }

  const handleComplete = (filterName, value) => {
    if(productsListFilters.length > 0) { 
      productsListFilters.some(filter => {
        if (filter.value === value) {
          return dispatch({
            type: 'REMOVE_PRODUCTS_LIST_FILTER',
            payload: productsListFilters.filter((filter) => filter.value !== value),
          });
        } else {
          addProductsFilter(filterName, value)
        }
      })
    } else{
      addProductsFilter(filterName, value)
    }
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
        }}></div>
        <h4 className="products__sidebar__header products__sidebar__header__modal">{header}</h4>

        {options.map((option, index) => 
          <label key={index}className="products__sidebar__filter">
            <input 
              checked={productsListFilters.some(el => el.value === option.text)} 
              onChange={() => handleComplete(option.filterName, option.text)} 
              className="products__sidebar__filter__checkbox"   
              type="checkbox" 
            />
            <span className="products__sidebar__filter__text">{option.text}</span>
          </label>
        )}
        <ProductsEditComplition 
          // actionContent={['filter', filtersTextArr ]}
          handleComplete={closeSideBar} 
          handleClose={removeAllFilters}
        />
      </div>
    </>
  )
}


export const CustomDropDownPriceRange = ({ activeSideBar, closeSideBar, initiallyActive, headerClass, listClass}) => {
  const [clickedBtn, setClickedBtn] = useState(initiallyActive)
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const dispatch = useDispatch()


  useEffect(() => {
    if(window.innerWidth <= 480 && clickedBtn){
      setClickedBtn(false)
    }
  }, [activeSideBar])

  const addProductsFilter = (filterName, value) => {
    dispatch({
      type: 'ADD_PRODUCTS_LIST_FILTER',
      payload: [ 
        ...productsListFilters, 
        {
          value: value,
          filterName: filterName
        }
      ],
    });
  }

  const handleComplete = (filterName, value) => {
    if(productsListFilters.length > 0) { 
      productsListFilters.some(filter => {
        if (filter.filterName === filterName) {
          // console.log(filter)
          filter.value = value
          return dispatch({
            type: 'REMOVE_PRODUCTS_LIST_FILTER',
            payload: productsListFilters,
          });
        } else{
          addProductsFilter(filterName, value)
        }
      })
    } else{
      addProductsFilter(filterName, value)
    }
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
        className={`drop-down__header ${clickedBtn ? 'drop-down__header_active' : ''} ${headerClass}`}
      >
        Цена
      </h4>

      <div className={`drop-down__list ${listClass} ${clickedBtn ? `drop-down__list_active ${listClass}_active` : ''}`}>
        <div className="products__sidebar__arrow-back" onClick={() => { 
          setClickedBtn(false)
        }}></div>
        <h4 className="products__sidebar__header products__sidebar__header__modal">Цена</h4>
        <PriceRange handlePriceChange={handleComplete}/>

        <ProductsEditComplition 
          handleComplete={closeSideBar} 
          handleClose={removeAllFilters}
        />
      </div>
    </>
  )
}

export const PriceRange = ({handlePriceChange}) => {
  const step = 100;
  const minPrice = 1;
  const maxPrice = 100000;
  const [values, setValues] = useState([minPrice, maxPrice]);
  const [inputValues, setInputValues] = useState([minPrice, maxPrice]);

  console.log(inputValues, values)



  const handleSubmit = (finalValues) => handlePriceChange('Цена', `${finalValues[0]}-${finalValues[1]}`)

  const handleValues = () => {
    const min = +inputValues[0]
    const max = +inputValues[1]
    
    if(min && max){
      if( min >= minPrice && min < max && max <= maxPrice ){
        handleSubmit([min, max])
        setInputValues([min, max])
        setValues([min, max])

      }  else if(min < minPrice){
        handleSubmit([minPrice, inputValues[1]])
        setInputValues([minPrice, inputValues[1]])
        setValues([minPrice, inputValues[1]])

      } else if(max > maxPrice){
        handleSubmit([inputValues[0], maxPrice])
        setInputValues([inputValues[0], maxPrice])
        setValues([inputValues[0], maxPrice])

      } else if(max <= min){
        handleSubmit([max, max])
        setInputValues([max, max])
        setValues([max, max])

      }
    } else {
      handleSubmit([minPrice, maxPrice])
      setInputValues([minPrice, maxPrice])
      setValues([minPrice, maxPrice])
      
    }
  }

  const handleInputSubmit = (e) => {  
    if(e.key === 'Enter'){
      handleValues()
    }
  }

  /// onBLUUUUUUURRRRRR

  return (

    <div className="price-range">
      <div className="price-range__prices-wrapper">
        <input onKeyDown={handleInputSubmit}  onChange={(e) => setInputValues([e.target.value, inputValues[1]])} type='text' className="price-range__price-value" value={inputValues[0]}/>
        <span>-</span>
        <input onKeyDown={handleInputSubmit}  onChange={(e) => setInputValues([inputValues[0], e.target.value])} type='text' className="price-range__price-value" value={inputValues[1]} />
      </div>

      <Range
        values={values}
        step={step}
        min={minPrice}
        max={maxPrice}
        onChange={(values) => {
          setValues(values);
          setInputValues(values)
        }}
        onFinalChange={values => handleSubmit([values[0], values[1]])}
        renderTrack={({ props, children }) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className='price-range__scroll__wrapper'
          >
            <div
              ref={props.ref}
              className='price-range__scroll__line'
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#DEE2E6", "#FA530D", "#DEE2E6"],
                  min: minPrice,
                  max: maxPrice
                })
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            className='price-range__scroll__thumb'
            {...props}
            style={{
              ...props.style,
              
            }}
          >
          </div>
        )}
      />
    </div>
  );
}