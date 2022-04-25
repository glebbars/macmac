import lightpurpleLine from '../../img/lightpurple-line.svg'
import greenLine from '../../img/green-line.svg'
import blueLine from '../../img/blue-line.svg'

export const routesNames = {
  "all-products": "Все товары",
  "apple": "Apple",
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

export const appleCategoryProductsOptions = [
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


export const getOptions = (optionsType, categoryName, searchResult) => {
  if(categoryName){
    return getRightChoiceFunc(optionsType, categoryName)
  } else if(searchResult){
    const similarName = getSimilarCategoryName(searchResult)
    return getRightChoiceFunc(optionsType, similarName)
  }
}

const getRightChoiceFunc = (optionsType, value) => {
  switch (optionsType){
    case 'category': return getCategoryChoices(value);
    case 'model': return getAppleModelChoices(value);
    case 'color': return getAppleColorChoices(value);
    case 'capacity': return getAppleCapacityChoices(value);
    default: return []
  }
}

const getCategoryChoices = (value) => {
  switch(value){
    case 'apple': return appleCategoryOptions;
    default: return []
  }
}

const getAppleModelChoices = (value) => {
  switch(value){
    case 'iphone': return modelIphoneOptions;
    case 'airpods': return modelAirPodsOptions;
    default: return []
  }
}

const getAppleColorChoices = (value) => {
  switch(value){
    case 'iphone': return colorIphoneOptions;
    default: return []
  }
}

const getAppleCapacityChoices = (value) => {
  switch(value){
    case 'iphone': return capacityIphoneOptions;
    default: return []
  }
}

export const getSimilarCategoryName = (name) => {
  for(let product in routesNames){
    if(routesNames[product].toLowerCase().includes(name)){
      return routesNames[product].toLowerCase()
    } 
  }
}

export const appleCategoryOptions = [
  {
    filterName: 'Категория',
    text: 'iPhone',
  },
  {
    filterName: 'Категория',
    text: 'iPad',
  },
  {
    filterName: 'Категория',
    text: 'AirPods',
  },
  {
    filterName: 'Категория',
    text: 'iMac',
  },
  {
    filterName: 'Категория',
    text: 'Macbook',
  },
  {
    filterName: 'Категория',
    text: 'Apple Watch',
  },
]

export const modelIphoneOptions = [
  {
    filterName: 'Модель',
    text: 'iPhone 13 Mini',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 13',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 13 Pro',
  },
  {
    filterName: 'Модель',
    text: 'iPhone 13 Pro Max',
  },
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
    text: 'iPhone SE 2020',
  }
]

export const colorIphoneOptions = [
  {
    filterName: 'Цвет',
    text: 'Black',
  },
  {
    filterName: 'Цвет',
    text: 'Product Red',
  },
  {
    filterName: 'Цвет',
    text: 'Yellow',
  },
  {
    filterName: 'Цвет',
    text: 'White',
  },
  {
    filterName: 'Цвет',
    text: 'Mind',
  },
  {
    filterName: 'Цвет',
    text: 'Purple',
  },
  {
    filterName: 'Цвет',
    text: 'Blue',
  },
  {
    filterName: 'Цвет',
    text: 'Silver',
  },
  {
    filterName: 'Цвет',
    text: 'Gold',
  },
  {
    filterName: 'Цвет',
    text: 'Pacific Blue',
  },
  {
    filterName: 'Цвет',
    text: 'Graphite',
  },
  {
    filterName: 'Цвет',
    text: 'Pink',
  },
  {
    filterName: 'Цвет',
    text: 'Midnight',
  },
  {
    filterName: 'Цвет',
    text: 'Starlight',
  },
  {
    filterName: 'Цвет',
    text: 'Green',
  },
  {
    filterName: 'Цвет',
    text: 'Alpine Green',
  },
  {
    filterName: 'Цвет',
    text: 'Sierra Blue',
  },

]

export const capacityIphoneOptions = [
  {
    filterName: 'Память',
    text: '64Gb',
  },
  {
    filterName: 'Память',
    text: '128Gb',
  },
  {
    filterName: 'Память',
    text: '256Gb',
  },
  {
    filterName: 'Память',
    text: '512Gb',
  },
  {
    filterName: 'Память',
    text: '1Tb',
  },

]

export const modelAirPodsOptions = [
  {
    filterName: 'Модель',
    text: 'AirPods 2', 
  },
  {
    filterName: 'Модель',
    text: 'AirPods Pro', 
  },
  {
    filterName: 'Модель',
    text: 'AirPods 3', 
  }
]


export const initialProductCrumbs = [
  {
    name: 'MacMac',
    link: '/'
  },
  {
    name: 'Все товары',
    link: '/category/all-products'
  }
]


export const favoritesCrumbs = [
  {
    name: 'MacMac',
    link: '/'
  },
  {
    name: 'Избранное',
    link: '/favourites'
  }
]


export const bagCrumbs = [
  {
    name: 'MacMac',
    link: '/'
  },
  {
    name: 'Корзина',
    link: '/bag'
  }
]

