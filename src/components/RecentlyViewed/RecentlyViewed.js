import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import List from '../List/List'

const RecentlyViewed = ({className}) => {
  const recentlyViewed = useSelector((store) => store.app.recentlyViewed);
  const productsArr = useSelector((store) => store.app.productsArr);

  useEffect(() => {
    localStorage.setItem('macmac-recentlyViewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const filteredArr = productsArr.filter(product => recentlyViewed.includes(product.id))

  const sortedArr = filteredArr.sort((a, b) => {
    return recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id)
  })

  return (
    <div className={`recently-viewed ${className}`}>
      <h1 className='recently-viewed__header'>Недавно просмотренные</h1>
      <List className={`recently-viewed__list ${className}__list`} productsArr={sortedArr}/>
    </div>
  )
}

export default React.memo(RecentlyViewed)