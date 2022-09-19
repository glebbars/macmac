import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const useFilteredProductsArrByRoute = () => {
  const productsArr = useSelector((store) => store.app.productsArr);
  const { categoryName, searchResult } = useParams();

  return productsArr.filter((product) => {
    if (categoryName) {
      if (categoryName !== "all-products") {
        if (categoryName.includes("-")) {
          const routeModel = categoryName.split("-").join(" ");
          return product?.description?.model.toLowerCase() === routeModel;
        } else {
          return product?.description?.category.toLowerCase() === categoryName;
        }
      } else {
        return product;
      }
    } else if (searchResult) {
      const fullProductName = product?.fullName.toLowerCase();
      return fullProductName.includes(searchResult);
    }

    return product;
  });
};

export const getFilteredProducts = (
  productsListFilters,
  initiallyFilteredArr,
  includePrice
) => {
  const categoryFilters = productsListFilters
    .filter((filter) => filter.filterName === "Категория")
    .map((filter) => filter.value);
  const modelFilters = productsListFilters
    .filter((filter) => filter.filterName === "Модель")
    .map((filter) => filter.value);
  const colorFilters = productsListFilters
    .filter((filter) => filter.filterName === "Цвет")
    .map((filter) => filter.value);
  const capacityFilters = productsListFilters
    .filter((filter) => filter.filterName === "Память")
    .map((filter) => filter.value);
  const priceFilter = productsListFilters
    .filter((filter) => filter.filterName === "Цена")
    .map((filter) => filter.value);
  const diagonalFilters = productsListFilters
    .filter((filter) => filter.filterName === "Диагональ")
    .map((filter) => filter.value);
  const memoryFilters = productsListFilters
    .filter((filter) => filter.filterName === "Оперативная память")
    .map((filter) => filter.value);

  const wifiFilters = productsListFilters
    .filter((filter) => filter.filterName === "Wi-Fi")
    .map((filter) => filter.value);

  const priceLimits =
    priceFilter.length > 0 ? priceFilter[0].split("-") : ["0", "1000000"];

  return initiallyFilteredArr.filter(
    (product) =>
      (categoryFilters.length > 0
        ? categoryFilters.includes(product.description.category)
        : product) &&
      (modelFilters.length > 0
        ? modelFilters.includes(product.description.model)
        : product) &&
      (colorFilters.length > 0
        ? colorFilters.includes(product.description.color)
        : product) &&
      (capacityFilters.length > 0
        ? capacityFilters.includes(product.description.capacity)
        : product) &&
      (diagonalFilters.length > 0
        ? diagonalFilters.includes(product.description.diagonal)
        : product) &&
      (wifiFilters.length > 0
        ? wifiFilters.includes(product.description.wifi)
        : product) &&
      (memoryFilters.length > 0
        ? memoryFilters.includes(product.description.memory)
        : product) &&
      (includePrice
        ? product.price >= +priceLimits[0] && product.price <= +priceLimits[1]
        : product)
    // } else {
    //   return product;
    // }
  );
};
