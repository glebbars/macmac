import React, { useEffect, useState } from "react";
import {
  getCapacityChoices,
  getColorChoices,
  getColorForToggle,
} from "../../admin/AdditionalFunctions/AdditionalFunctions";
import axios from "axios";

const ProductMainToggle = ({ productDataObj, setProductDataObj }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const colorChoices = getColorChoices(
    productDataObj.description.category,
    productDataObj.description.model.toLowerCase()
  );

  console.log(similarProducts, colorChoices);
  const capacityChoices = getCapacityChoices(
    productDataObj.description.category,
    productDataObj.description.model.toLowerCase()
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DB_API}/posts`)
      .then((res) => res.data)
      .then((data) =>
        data.filter((productFromDB) => {
          if (
            productFromDB.description.category ===
              productDataObj.description.category &&
            productFromDB.description.model === productDataObj.description.model
          ) {
            const uniqueKeys = Object.keys(productDataObj.description).filter(
              (key) =>
                key !== "brand" &&
                key !== "category" &&
                key !== "model" &&
                key !== "color" &&
                key !== "capacity"
            );

            if (uniqueKeys.length > 0) {
              if (
                uniqueKeys.every(
                  (key) =>
                    productDataObj.description[key] ===
                    productFromDB.description[key]
                )
              ) {
                return productFromDB;
              }
            } else {
              return productFromDB;
            }
          }
          return null;
        })
      )
      .then((data) => setSimilarProducts(data));
  }, [productDataObj.description]);

  const toggleColor = (color) => {
    const newProduct = similarProducts.find(
      (product) =>
        product.description.color === color &&
        product.description.capacity === productDataObj.description.capacity
    );
    if (newProduct) {
      setProductDataObj(newProduct);
    }
  };

  const toggleCapacity = (capacity) => {
    const newProduct = similarProducts.find(
      (product) =>
        product.description.capacity === capacity &&
        product.description.color === productDataObj.description.color
    );

    if (newProduct) {
      setProductDataObj(newProduct);
    }
  };

  return (
    <div>
      {colorChoices.length > 0 && (
        <div className="product__main__color">
          <span className="product__main__color__text">Цвет</span>
          <div className="product__main__color__options-wrapper">
            {colorChoices.map((colorObj, index) => (
              <div
                onClick={() => toggleColor(colorObj.name)}
                key={index}
                className={`product__main__color__option ${
                  productDataObj.description.color === colorObj.name
                    ? "product__main__color__option_active"
                    : ""
                }`}
              >
                <div
                  className="product__main__color__option__value"
                  style={{
                    background: getColorForToggle(
                      productDataObj.description.category,
                      colorObj.name
                    ),
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {capacityChoices.length > 0 && (
        <div className="product__main__capacity">
          <span className="product__main__capacity__text">Память</span>
          <div className="product__main__capacity__options-wrapper">
            {capacityChoices.map((capacityObj, index) => (
              <div
                onClick={() => toggleCapacity(capacityObj.name)}
                key={index}
                className={`product__main__capacity__option ${
                  productDataObj.description.capacity === capacityObj.name
                    ? "product__main__capacity__option_active"
                    : ""
                }`}
              >
                {capacityObj.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMainToggle;
