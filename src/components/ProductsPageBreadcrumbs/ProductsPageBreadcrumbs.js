import react, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import {routesNames, initialCrumbs} from '../additionalObjects/additionalObjects'


const ProductsPageBreadcrumbs = ({modelCurmb}) => {
  const [crumbsNames, setCrumbsNames] = useState(initialCrumbs)
  const {categoryName, id} = useParams()

  useEffect(() => {
    if(categoryName !== 'all-products'){
      const categoryCrumb = {
        name: routesNames[categoryName],
        link: `/category/${categoryName}`
      }

      if(id){
        setCrumbsNames([...initialCrumbs, categoryCrumb, modelCurmb ])
      } else{
        setCrumbsNames([...initialCrumbs, categoryCrumb ])
      }
      
    } else{
     return setCrumbsNames(initialCrumbs)
    }
  }, [categoryName, modelCurmb])

  return(
    <div className={`${modelCurmb ? "product__crumbs" : "products__header__crumbs__wrapper" }`}>
      {crumbsNames.map((crumb, index) => <Link className='products__header__crumbs__link' to={`${crumb.link}`} key={index}>{crumb.name}</Link>)}
    </div>
  )
}

export default ProductsPageBreadcrumbs