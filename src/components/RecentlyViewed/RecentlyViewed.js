import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import List from '../List/List'

const RecentlyViewed = () => {
  const recentlyViewed = useSelector((store) => store.app.recentlyViewed);
  const productsArr = useSelector((store) => store.app.productsArr);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  console.log('rerender')

  const filteredArr = useMemo(() => productsArr.filter(product => recentlyViewed.includes(product.id)), [recentlyViewed])

  return (
    <div>
      <List productsArr={filteredArr}/>
    </div>
  )
}

export default React.memo(RecentlyViewed)