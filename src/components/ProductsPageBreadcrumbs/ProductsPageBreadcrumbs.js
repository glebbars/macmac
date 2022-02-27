import react, {useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import {routesNames, initialCrumbs} from '../additionalObjects/additionalObjects'


const ProductsPageBreadcrumbs = () => {
  const location = useLocation()
  const [crumbsNames, setCrumbsNames] = useState(initialCrumbs)

  useEffect(() => {
    const categoryName = location.pathname.split('/category/')[1]
    if(categoryName!== 'all-products'){
      const newCrumbObj = {
        name: routesNames[categoryName],
        link: location.pathname
      }
      setCrumbsNames([...initialCrumbs, newCrumbObj ])
    } else{
      setCrumbsNames(initialCrumbs)
    }
  }, [location])

  return(
    <div className='products__header__crumbs__wrapper'>
      {crumbsNames.map((crumb, index) => <Link className='products__header__crumbs__link' to={`${crumb.link}`} key={index}>{crumb.name}</Link>)}
    </div>
  )
}

export default ProductsPageBreadcrumbs