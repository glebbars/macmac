import react, {useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import {routesNames, initialCrumbs} from '../additionalObjects/additionalObjects'


const ProductsPageBreadcrumbs = ({modelCurmb}) => {
  const [crumbsNames, setCrumbsNames] = useState(initialCrumbs)
  const currentLocation = window.location.pathname

  console.log("*")

  useEffect(() => {
    const categoryName = currentLocation.split('/category/')[1]

    if(categoryName !== 'all-products'){
      const newCrumbObj = {
        name: routesNames[categoryName],
        link: currentLocation
      }
      setCrumbsNames([...initialCrumbs, newCrumbObj ])

      if(modelCurmb){
        return setCrumbsNames([...crumbsNames, modelCurmb])
      }
    } else{
     return setCrumbsNames(initialCrumbs)
    }
  }, [currentLocation])

  useEffect(() => {
    console.log(modelCurmb)
    if(modelCurmb){
      const crumbs = crumbsNames
      crumbs[2] = modelCurmb
      console.log(crumbs)
    }
  }, [modelCurmb])

  return(
    <div className='products__header__crumbs__wrapper' style={{left: `${modelCurmb ? '15px' : '120px'}`}}>
      {crumbsNames.map((crumb, index) => <Link className='products__header__crumbs__link' to={`${crumb.link}`} key={index}>{crumb.name}</Link>)}
    </div>
  )
}

export default ProductsPageBreadcrumbs