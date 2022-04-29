import React, {useState, useMemo, useLayoutEffect} from "react";
import {NavLink, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCTS_LIST_FILTER
} from '../../redux/actions/types'
import { useEffect } from "react";
import ProductsEditComplition from '../ProductsEditComplition/ProductsEditComplition'
import { Range, getTrackBackground } from "react-range";
import { useParams } from "react-router-dom";


export const CustomDropDownLinks = ({ header, options, headerClass, listClass}) => {
  const [clickedBtn, setClickedBtn] = useState(true)

  // useEffect(() => {
  //   if(window.innerWidth <= 480){
  //     setClickedBtn(false)
  //   }
  // }, [])
  
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


  const removeAllFilters = (filterName) => {
    
    dispatch({
      type: 'REMOVE_PRODUCTS_LIST_FILTER',
      payload: productsListFilters.filter(filter => filter.filterName !== filterName)      ,
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
          handleReset={() => removeAllFilters(options[0].filterName)}
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

  const removeAllFilters = (filterName) => {
    dispatch({
      type: 'REMOVE_PRODUCTS_LIST_FILTER',
      payload: productsListFilters.filter(filter => filter.filterName !== filterName),
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
        <PriceRange productsListFilters={productsListFilters} handlePriceChange={handleComplete}/>

        <ProductsEditComplition 
          handleComplete={closeSideBar} 
          handleReset={() => removeAllFilters('Цена')}
        />
      </div>
    </>
  )
}

export const PriceRange = ({handlePriceChange, productsListFilters}) => {
  const step = 100;
  const [priceLimits, setPriceLimits] = useState([1, 100000])
  const [values, setValues] = useState([1, 100000])
  const [inputValues, setInputValues] = useState([1, 100000])
  const {categoryName, searchResult} = useParams()
  const productsArr = useSelector((store) => store.app.productsArr);

  const filteredByCategoryArr = productsArr.filter(product => {
    if(categoryName){
      if(categoryName !== "all-products"){
        return product.category.toLowerCase() === categoryName
      } else{
        return product
      }
    } else if(searchResult){
      const fullProductName = `${product.brand.toLowerCase()} ${product.category.toLowerCase()} ${product.model.toLowerCase()} ${product.capacity.toLowerCase()} ${product.color.toLowerCase()}`
      return fullProductName.includes(searchResult)
    }
  })

  const categoryFilters = productsListFilters.filter(filter => filter.filterName === 'Категория').map(filter => filter.value)
  const modelFilters = productsListFilters.filter(filter => filter.filterName === 'Модель').map(filter => filter.value)
  const colorFilters = productsListFilters.filter(filter => filter.filterName === 'Цвет').map(filter => filter.value)
  const capacityFilters = productsListFilters.filter(filter => filter.filterName === 'Память').map(filter => filter.value)

  const filteredProductsArr = filteredByCategoryArr.filter(product => {
    const fullModelName = `${product.category} ${product.model}`

    return (categoryFilters.length > 0 ? categoryFilters.includes(product.category) : product) && 
      (modelFilters.length > 0 ? modelFilters.includes(fullModelName) : product) && 
      (colorFilters.length > 0 ? colorFilters.includes(product.color) : product) &&
      (capacityFilters.length > 0 ? capacityFilters.includes(product.capacity) : product)
  })

  const productPrices = filteredProductsArr.map(product => product.price).sort((a, b) => b - a)

  const maxPriceFromFilters = productPrices[0]

  useEffect(() => {
    if(!productsListFilters.find(filter => filter.filterName === 'Цена')){
      setValues(priceLimits)
      setInputValues(priceLimits)
    }
  }, [productsListFilters])

  useEffect(() => {
    if(maxPriceFromFilters && maxPriceFromFilters !== priceLimits[1]){
      setPriceLimits([1, maxPriceFromFilters])
      setValues([1, maxPriceFromFilters])
      setInputValues([1, maxPriceFromFilters])
    }
  }, [maxPriceFromFilters])


  const handleSubmit = (finalValues) => handlePriceChange('Цена', `${finalValues[0]}-${finalValues[1]}`)

  const changeAllValues = (valuesArr) => {
    handleSubmit(valuesArr)
    setInputValues(valuesArr)
    setValues(valuesArr)
  }


  const handleValues = () => {
    const min = +inputValues[0]
    const max = +inputValues[1]
    
    if(min && max){
      if( min >= priceLimits[0] && min < max && max <= priceLimits[1] ){
        changeAllValues([min, max])
      }  else if(min < priceLimits[0]){
        changeAllValues([priceLimits[0], inputValues[1]])
      } else if(max > priceLimits[1]){
        changeAllValues([inputValues[0], priceLimits[1]])
      } else if(max <= min){
        changeAllValues([max, max])
      }
    } else {
      changeAllValues([priceLimits[0], priceLimits[1]])
    }
  }

  const handleInputSubmit = (e) => {  
    if(e.key === 'Enter'){
      handleValues()
    }
  }


  return (

    <div className="price-range">
      <div className="price-range__prices-wrapper">
        <input onKeyDown={handleInputSubmit} onBlur={handleValues}  onChange={(e) => setInputValues([e.target.value, inputValues[1]])} type='text' className="price-range__price-value" value={inputValues[0]}/>
        <span>-</span>
        <input onKeyDown={handleInputSubmit} onBlur={handleValues} onChange={(e) => setInputValues([inputValues[0], e.target.value])} type='text' className="price-range__price-value" value={inputValues[1]} />
      </div>

      <Range
        values={values}
        step={step}
        min={priceLimits[0]}
        max={priceLimits[1]}
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
                  min: priceLimits[0],
                  max: priceLimits[1]
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
