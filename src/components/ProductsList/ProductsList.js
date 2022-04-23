import React, {useState, useMemo, useEffect, useCallback} from "react";
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects';
import ProductsPagination from '../ProductsPagination/ProductsPagination';
import List from '../List/List'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsArr = useSelector((store) => store.app.productsArr);
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const sortType = useSelector(store => store.app.sortType)
  const pageSize = useSelector(store => store.app.pageSize)
  const dispatch = useDispatch()
  const {categoryName, searchResult} = useParams()

  useEffect(() => {
    if(currentPage !==1) {
      onPageChange(1)
    }
    // window.scrollTo(0, 0)
  }, [productsListFilters, pageSize, sortType])
  
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



  


  const modelFilters = productsListFilters.filter(filter => filter.filterName === 'Модель').map(filter => filter.value)
  const colorFilters = productsListFilters.filter(filter => filter.filterName === 'Цвет').map(filter => filter.value)
  const priceFilter = productsListFilters.filter(filter => filter.filterName === 'Цена').map(filter => filter.value) 

  const priceLimits =  priceFilter.length > 0 ? priceFilter[0].split('-') : ['0', '1000000']

  // console.log(+priceLimits[0] , +priceLimits[1])

  const filteredProductsArr = filteredByCategoryArr.filter(product => {
    if(productsListFilters.length > 0){
      const fullModelName = `${product.category} ${product.model}`

      // console.log(product.price, product.price >= +priceLimits[0] && product.price <= +priceLimits[1])

      return (modelFilters.length > 0 ? modelFilters.includes(fullModelName) : product) && 
              (colorFilters.length > 0 ? colorFilters.includes(product.color) : product) &&
              (product.price >= +priceLimits[0] && product.price <= +priceLimits[1])


      // if(modelFilters.length > 0){
      //   const fullModelName = `${product.category.toLowerCase()} ${product.model.toLowerCase()}`
      //   return modelFilters.some(filter => filter.value.toLowerCase() === fullModelName )
      // } else if(priceFilter){
      //   const splitStr = priceFilter.value.split('-')
      //   console.log(+splitStr[0], +splitStr[1])
      // }
    } else{
      return product
    }
  })
  
  const sortedProductsArr = filteredProductsArr.sort((a, b) => {
    switch (sortType){
      case '': return;
      case 'popularity': return;
      case 'novelty': return;
      case 'price-decrease': return b.price - a.price;
      case 'price-increase': return a.price - b.price;
    }
  })

  useEffect(() => {
    dispatch({
      type: 'UPDATE_SORTED_PRODUCTS_LENGTH',
      payload: sortedProductsArr.length
    })
  }, [sortedProductsArr])
  // }, [productsArr, sortedProductsArr])
  
  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedProductsArr.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedProductsArr]);

  const onPageChange = (page) => {
    setCurrentPage(page)
    dispatch({
      type: 'UPDATE_PAGE_NUM',
      payload: page
    })
    window.scrollTo(0, 0)
  }
  
  return (
    <>
      {currentTableData.length > 0 ? 
        <List 
          className=''
          productsArr={currentTableData} 
        />  : 'К сожалению этого товара нет в данный момент'
      }
      <ProductsPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={sortedProductsArr.length}
        pageSize={pageSize}
        onPageChange={page => onPageChange(page)}
      />
    </>
  );
};

export default React.memo(ProductsList);