import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const List = ({ productsArr, className, productClassName }) => {
  return (
    <>
      {productsArr.length > 0 && (
        <div className={`products-list ${className}`}>
          {productsArr.map(
            (product) =>
              product?.pictures && (
                <ProductCard
                  product={product}
                  key={product.id}
                  productClassName={productClassName}
                />
              )
          )}
        </div>
      )}
    </>
  );
};

export default List;
