import React, {useState, useMemo, useEffect} from "react";
import {categoryProductsOptions, modelIphoneOptions} from '../additionalObjects/additionalObjects';
import ProductsPagination from '../ProductsPagination/ProductsPagination';
import List from '../List/List'
import { useSelector } from "react-redux";


const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsArr = useSelector((store) => store.app.productsArr);
  const productsListFilters = useSelector((store) => store.app.productsListFilters);
  const sortType = useSelector(store => store.app.sortType)


  useEffect(() => {
    setCurrentPage(1)
  }, [productsListFilters])

  const filteredProductsArr = productsArr.filter(product => {
    const fullProductName = `${product.category} ${product.model} ${product.capacity} ${product.color}`
    if(productsListFilters.length > 0){
      return productsListFilters.some(filter => fullProductName.includes(filter))
    } else{
      return product
    }
  })

  const sortedProductsArr = filteredProductsArr.sort((a, b) => {
    switch (sortType){
      case '': return;
      case 'popularity': return;
      case 'price-decrease': return b.price - a.price;
      case 'price-increase': return a.price - b.price;
    }
  })

  const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * 4;
      const lastPageIndex = firstPageIndex + 4;
      console.log(firstPageIndex, lastPageIndex, productsArr.slice(firstPageIndex, lastPageIndex))
      return sortedProductsArr.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedProductsArr]);


  return (
    <>
      {/* <ProductsPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={sortedProductsArr.length}
        pageSize={4}
        onPageChange={page => setCurrentPage(page)}
      /> */}
      {/* {currentTableData && <List productsArr={currentTableData}/> } */}
    </>
  );
};

export default ProductsList;