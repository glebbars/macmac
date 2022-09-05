import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import List from "../List/List";

const RecentlyViewed = ({ className = "" }) => {
  const recentlyViewed = useSelector((store) => store.app.recentlyViewed);
  const productsArr = useSelector((store) => store.app.productsArr);

  useEffect(() => {
    localStorage.setItem(
      "macmac-recentlyViewed",
      JSON.stringify(recentlyViewed)
    );
  }, [recentlyViewed]);

  const filteredArr = productsArr.filter((product) =>
    recentlyViewed.includes(product.id)
  );

  const sortedArr = filteredArr.sort((a, b) => {
    return recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id);
  });

  return (
    <>
      {recentlyViewed.length > 0 && (
        <div className={`recently-viewed ${className}`}>
          <h1 className="recently-viewed__header">Недавно просмотренные</h1>
          <List
            className={`recently-viewed__list ${className}__list`}
            productsArr={sortedArr}
            productClassName=""
          />
        </div>
      )}
    </>
  );
};

export default React.memo(RecentlyViewed);
