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

export const categoryHeaderOptions = [
  {
    link: "/category/iphone",
    text: 'iPhone',
    class: 'header__menu__link header__menu__link_mr-t',
  },
  {
    link: '/category/airpods',
    text: 'AirPods',
    class: 'header__menu__link',
  },
  {
    link: '/category/ipad',
    text: 'iPad',
    class: 'header__menu__link',
  },
  {
    link: '/category/imac',
    text: 'iMac',
    class: 'header__menu__link',
  },
  {
    link: '/category/macbook',
    text: 'Macbook',
    class: 'header__menu__link header__menu__link_additional',
  },
  {
    link: '/category/watch',
    text: 'Watch',
    class: 'header__menu__link header__menu__link_additional',
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
    filterName: 'Модель',
    text: 'iPhone 12',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 12 Pro',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 12 Pro Max',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 11',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 11 Pro',
  },
  {
    filterName: 'Модель',
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