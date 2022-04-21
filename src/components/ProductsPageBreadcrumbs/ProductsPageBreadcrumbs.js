import react, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import {routesNames, initialProductCrumbs} from '../additionalObjects/additionalObjects'


const ProductsPageBreadcrumbs = ({modelCurmb, searchCrumbs}) => {
  const [crumbsNames, setCrumbsNames] = useState(initialProductCrumbs)
  const {categoryName, id, searchResult} = useParams()

  useEffect(() => {
   identifyPageCrumbs()
  }, [categoryName, modelCurmb, searchResult])

  const identifyPageCrumbs = () => {
    if(categoryName){
      if(categoryName !== 'all-products'){
        const categoryCrumb = {
          name: routesNames[categoryName],
          link: `/category/${categoryName}`
        }
        if(id){
          setCrumbsNames([...initialProductCrumbs, categoryCrumb, modelCurmb ])
        } else{
          setCrumbsNames([...initialProductCrumbs, categoryCrumb ])
        }
        
      } else{
       return setCrumbsNames(initialProductCrumbs)
      }
    } else if(searchResult){
      return setCrumbsNames(searchCrumbs)
    }
  }

  return(
    <div className={`${modelCurmb ? "product__crumbs" : "products__header__crumbs__wrapper" }`}>
      {crumbsNames.map((crumb, index) => <Link className='products__header__crumbs__link' to={`${crumb.link}`} key={index}>{crumb.name}</Link>)}
    </div>
  )
}

export default ProductsPageBreadcrumbs