import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import List from '../List/List'

const RecentlyViewed = () => {
  const recentlyViewed = useSelector((store) => store.app.recentlyViewed);
  const productsArr = useSelector((store) => store.app.productsArr);
  console.log(recentlyViewed)
  
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  return (
    <div>
      <List productsArr={recentlyViewed}/>
    </div>
  )
}

export default React.memo(RecentlyViewed)