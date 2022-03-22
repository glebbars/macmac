import React, {useState, useMemo, useEffect, useCallback} from "react";
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects';
import ProductsPagination from '../ProductsPagination/ProductsPagination';
import List from '../List/List'
import { useSelector, useDispatch } from "react-redux";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsArr = useSelector((store) => store.app.productsArr);
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const sortType = useSelector(store => store.app.sortType)
  const pageSize = useSelector(store => store.app.pageSize)
  const dispatch = useDispatch()

  useEffect(() => {
    if(currentPage !==1) {
      setCurrentPage(1)
    }
    // window.scrollTo(0, 0)
  }, [productsListFilters, pageSize, sortType])
  
  const filteredByCategoryArr = productsArr.filter(product => {
    const currentPathName = window.location.pathname
    if(currentPathName.includes('/category/') && !currentPathName.includes('/all-products')){
      return product.category === currentPathName.split('/category/')[1]
    } else{
      return product
    }
  })
  
  const filteredProductsArr = filteredByCategoryArr.filter(product => {
    if(productsListFilters.length > 0){
      const fullProductName = `${product.category} ${product.model} ${product.capacity} ${product.color}`
      return productsListFilters.some(filter => fullProductName.includes(filter.text.toLowerCase()))
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
  }, [productsArr, sortedProductsArr])
  
  
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
      {currentTableData && <List productsArr={currentTableData}/> }
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