import react, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  routesNames,
  initialProductCrumbs,
  headerCatalogCategories,
} from "../additionalObjects/additionalObjects";

const ProductsPageBreadcrumbs = ({ modelCurmb, searchCrumbs }) => {
  const [crumbsNames, setCrumbsNames] = useState(initialProductCrumbs);
  const { categoryName, id, searchResult } = useParams();

  useEffect(() => {
    identifyPageCrumbs();
  }, [categoryName, modelCurmb, searchResult]);

  const getCatalogCrumb = () => {
    const catalogCategoryObj = headerCatalogCategories.find((obj) =>
      obj.options.find((option) => option.link.includes(categoryName))
    );

    if (catalogCategoryObj) {
      const catalogCrumb = catalogCategoryObj.options.find((option) =>
        option.link.includes(categoryName)
      );

      return catalogCrumb;
    } else {
      return [];
    }
  };

  const identifyPageCrumbs = () => {
    if (categoryName) {
      if (categoryName !== "all-products") {
        const categoryCrumb = {
          name: routesNames[categoryName],
          link: `/category/${categoryName}`,
        };

        const primaryCrumb = routesNames[categoryName]
          ? categoryCrumb
          : getCatalogCrumb();

        if (id) {
          setCrumbsNames([...initialProductCrumbs, primaryCrumb, modelCurmb]);
        } else {
          console.log("[");
          setCrumbsNames([...initialProductCrumbs, primaryCrumb]);
        }
      } else {
        return setCrumbsNames(initialProductCrumbs);
      }
    } else if (searchResult) {
      return setCrumbsNames(searchCrumbs);
    }
  };

  return (
    <div
      className={`${
        modelCurmb ? "product__crumbs" : "products__header__crumbs__wrapper"
      }`}
    >
      {crumbsNames.map((crumb, index) => (
        <Link
          className="products__header__crumbs__link"
          to={`${crumb.link}`}
          key={index}
        >
          {crumb.name}
        </Link>
      ))}
    </div>
  );
};

export default ProductsPageBreadcrumbs;
