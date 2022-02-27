import lightpurpleLine from '../../img/lightpurple-line.svg'
import greenLine from '../../img/green-line.svg'
import blueLine from '../../img/blue-line.svg'

export const routesNames = {
  "all-products": "Все товары",
  "iphone": 'iPhone',
  "imac": 'iMac',
  "airpods": 'AirPods',
  "ipad": 'iPad',
  "macbook": 'Macbook',
  "watch": 'Apple Watch',
  "accessories": 'Аксессуары',
  "apple-tv": 'Apple TV',
  "sony-tv": 'Sony TV',
}

export const bgImgObj = [
  {
    lineImg: lightpurpleLine,
    bgColor: '#f2e0f5'
  },
  {
    lineImg: greenLine,
    bgColor: '#DBECCE'
  },
  {
    lineImg: blueLine,
    bgColor: '#E2F1F4'
  },
]

export const categoryProductsOptions = [
  {
    link: "/category/iphone",
    text: 'iPhone',
    class: "products__sidebar__category-text"
  },
  {
    link: '/category/airpods',
    text: 'AirPods',
    class: "products__sidebar__category-text"
  },
  {
    link: '/category/ipad',
    text: 'iPad',
    class: "products__sidebar__category-text"
  },
  {
    link: '/category/imac',
    text: 'iMac',
    class: "products__sidebar__category-text"
  },
  {
    link: '/category/macbook',
    text: 'Macbook',
    class: "products__sidebar__category-text"
  },
  {
    link: '/category/watch',
    text: 'Watch',
    class: "products__sidebar__category-text"
  },
]

export const modelIphoneOptions = [
  {
    text: 'iPhone 12',
  },
  {
    text: 'iPhone 12 Pro',
  },
  {
    text: 'iPhone 12 Pro Max',
  },
  {
    text: 'iPhone 11',
  },
  {
    text: 'iPhone 11 Pro',
  },
  {
    text: 'iPhone 11 Pro Max',
  }
]

export const initialCrumbs = [
  {
    name: 'MacMac',
    link: '/'
  },
  {
    name: 'Все товары',
    link: '/category/all-products'
  }
]