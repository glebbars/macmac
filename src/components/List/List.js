import React from 'react'
import ProductCard from "../ProductCard/ProductCard";

const List = ({productsArr, className}) => {
  
  return (
    <>
     {productsArr.length > 0 &&
     <div className={`products-list ${className}`}>
       {productsArr.map(product => (
        <ProductCard
          product={product}
          key={product.id}
          />
        ))}
      </div>}
    </>
  ) 
}

export default List