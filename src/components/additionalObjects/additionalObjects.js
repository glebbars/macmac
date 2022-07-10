import lightpurpleLine from "../../img/lightpurple-line.svg";
import greenLine from "../../img/green-line.svg";
import blueLine from "../../img/blue-line.svg";
import iphoneCatalog from "../../img/catalog-iphone.png";
import ipadCatalog from "../../img/catalog-ipad.png";
import imacCatalog from "../../img/catalog-imac.png";
import airpodsCatalog from "../../img/catalog-airpods.png";
import applewatchCatalog from "../../img/catalog-apple-watch.png";
import {
  getIphoneColorChoices,
  getIphoneCapacityChoices,
  getIpadColorChoices,
  getIpadCapacityChoices,
} from "../../admin/AdditionalFunctions/AdditionalFunctions";

export const routesNames = {
  "all-products": "Все товары",
  apple: "Apple",
  iphone: "iPhone",
  airpods: "AirPods",
  ipad: "iPad",
  mac: "Mac",
  watch: "Apple Watch",
  accessories: "Аксессуары",
  "apple-tv": "Apple TV",
  "sony-tv": "Sony TV",
};

export const bgImgObj = [
  {
    lineImg: lightpurpleLine,
    bgColor: "#f2e0f5",
  },
  {
    lineImg: greenLine,
    bgColor: "#DBECCE",
  },
  {
    lineImg: blueLine,
    bgColor: "#E2F1F4",
  },
];

export const categoryHeaderOptions = [
  {
    link: "/category/iphone",
    text: "iPhone",
    class: "header__menu__link header__menu__link_mr-t",
  },
  {
    link: "/category/airpods",
    text: "AirPods",
    class: "header__menu__link",
  },
  {
    link: "/category/ipad",
    text: "iPad",
    class: "header__menu__link",
  },
  {
    link: "/category/mac",
    text: "Mac",
    class: "header__menu__link",
  },
  // {
  //   link: '/category/imac',
  //   text: 'iMac',
  //   class: 'header__menu__link  header__menu__link_additional',
  // },
  {
    link: "/category/watch",
    text: "Watch",
    class: "header__menu__link header__menu__link_additional",
  },
];

export const popularRequestsOptions = [
  {
    text: "iPhone 13 Pro,",
    link: "/category/iphone",
  },
  {
    text: "AirPods,",
    link: "/category/airpods",
  },
  {
    text: "Mac,",
    link: "/category/mac",
  },
  {
    text: "iPhone 11",
    link: "/category/iphone",
  },
];

export const appleCategoryProductsOptions = [
  {
    link: "/category/iphone",
    text: "iPhone",
    class: "products__sidebar__category-text",
  },
  {
    link: "/category/airpods",
    text: "AirPods",
    class: "products__sidebar__category-text",
  },
  {
    link: "/category/ipad",
    text: "iPad",
    class: "products__sidebar__category-text",
  },
  {
    link: "/category/mac",
    text: "Mac",
    class: "products__sidebar__category-text",
  },
  {
    link: "/category/watch",
    text: "Watch",
    class: "products__sidebar__category-text",
  },
];

export const getOptions = (optionsType, categoryName, searchResult) => {
  if (categoryName) {
    return getRightChoiceFunc(optionsType, categoryName);
  } else if (searchResult) {
    const similarName = getSimilarCategoryName(searchResult);
    return getRightChoiceFunc(optionsType, similarName);
  }
};

const getRightChoiceFunc = (optionsType, value) => {
  switch (optionsType) {
    case "category":
      return getCategoryChoices(value);
    case "model":
      return getAppleModelChoices(value);
    case "color":
      return getAppleColorChoices(value);
    case "capacity":
      return getAppleCapacityChoices(value);
    case "diagonal":
      return getAppleDiagonalCHoices(value);
    case "wifi":
      return getAppleWifiChoices(value);
    default:
      return [];
  }
};

const getCategoryChoices = (value) => {
  switch (value) {
    case "apple":
      return appleCategoryOptions;
    default:
      return [];
  }
};

const getAppleModelChoices = (value) => {
  console.log("---");
  switch (value) {
    case "iphone":
      return modelIphoneOptions;
    case "ipad":
      return modelIpadOptions;
    case "airpods":
      return modelAirPodsOptions;
    default:
      return [];
  }
};

const getAppleColorChoices = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "iphone":
        return colorIphoneOptions;
      case "ipad":
        return colorIpadOptions;
      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("iphone"):
        return getModelOptions(value, "Цвет", getIphoneColorChoices);

      case value.includes("ipad"):
        return getModelOptions(value, "Цвет", getIpadColorChoices);

      default:
        return [];
    }
  }
};

const getAppleCapacityChoices = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "iphone":
        return [
          capacityOptions["64"],
          capacityOptions["128"],
          capacityOptions["256"],
          capacityOptions["512"],
          capacityOptions["1"],
        ];

      case "ipad":
        return [
          capacityOptions["64"],
          capacityOptions["128"],
          capacityOptions["256"],
          capacityOptions["512"],
          capacityOptions["1"],
          capacityOptions["2"],
        ];
      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("iphone"):
        return getModelOptions(value, "Память", getIphoneCapacityChoices);

      case value.includes("ipad"):
        return getModelOptions(value, "Память", getIpadCapacityChoices);

      default:
        return [];
    }
  }
};

const getModelOptions = (model, name, getOptionsFunc) => {
  const routeModel = model.split("-").join(" ");

  const adminOptions = getOptionsFunc(routeModel);

  const userOptions = adminOptions.map((obj) => ({
    filterName: name,
    text: obj.name,
  }));

  return userOptions;
};

const getAppleDiagonalCHoices = (value) => {
  switch (value) {
    case "ipad":
      return [
        diagonalChoices[8.3],
        diagonalChoices[10.2],
        diagonalChoices[10.9],
        diagonalChoices[11],
        diagonalChoices[12.9],
      ];

    default:
      return [];
  }
};

const getAppleWifiChoices = (value) => {
  switch (value) {
    case "ipad":
      return [wifiChoices["wifi"], wifiChoices["wifi+cellular"]];

    default:
      return [];
  }
};

export const getSimilarCategoryName = (name) => {
  for (let product in routesNames) {
    if (routesNames[product].toLowerCase().includes(name)) {
      return routesNames[product].toLowerCase();
    }
  }
};

const appleCategoryOptions = [
  {
    filterName: "Категория",
    text: "iPhone",
  },
  {
    filterName: "Категория",
    text: "iPad",
  },
  {
    filterName: "Категория",
    text: "AirPods",
  },
  {
    filterName: "Категория",
    text: "Mac",
  },
  {
    filterName: "Категория",
    text: "Apple Watch",
  },
];

const modelIphoneOptions = [
  {
    filterName: "Модель",
    text: "iPhone 13",
  },
  {
    filterName: "Модель",
    text: "iPhone 13 Mini",
  },
  {
    filterName: "Модель",
    text: "iPhone 13 Pro",
  },
  {
    filterName: "Модель",
    text: "iPhone 13 Pro Max",
  },
  {
    filterName: "Модель",
    text: "iPhone 12",
  },
  {
    filterName: "Модель",
    text: "iPhone 12 Mini",
  },
  {
    filterName: "Модель",
    text: "iPhone 12 Pro",
  },
  {
    filterName: "Модель",
    text: "iPhone 12 Pro Max",
  },
  {
    filterName: "Модель",
    text: "iPhone 11",
  },
  {
    filterName: "Модель",
    text: "iPhone SE 2022",
  },
  {
    filterName: "Модель",
    text: "iPhone SE 2020",
  },
];

const modelIpadOptions = [
  {
    filterName: "Модель",
    text: "iPad Air 2022",
  },
  {
    filterName: "Модель",
    text: "iPad 2021",
  },
  {
    filterName: "Модель",
    text: "iPad Pro 2021",
  },
  {
    filterName: "Модель",
    text: "iPad mini 6",
  },
];

const modelAirPodsOptions = [
  {
    filterName: "Модель",
    text: "AirPods 2",
  },
  {
    filterName: "Модель",
    text: "AirPods Pro",
  },
  {
    filterName: "Модель",
    text: "AirPods 3",
  },
];

const colorIphoneOptions = [
  {
    filterName: "Цвет",
    text: "Black",
  },
  {
    filterName: "Цвет",
    text: "(Product) Red",
  },
  {
    filterName: "Цвет",
    text: "Yellow",
  },
  {
    filterName: "Цвет",
    text: "White",
  },
  {
    filterName: "Цвет",
    text: "Mind",
  },
  {
    filterName: "Цвет",
    text: "Purple",
  },
  {
    filterName: "Цвет",
    text: "Blue",
  },
  {
    filterName: "Цвет",
    text: "Silver",
  },
  {
    filterName: "Цвет",
    text: "Gold",
  },
  {
    filterName: "Цвет",
    text: "Pacific Blue",
  },
  {
    filterName: "Цвет",
    text: "Graphite",
  },
  {
    filterName: "Цвет",
    text: "Pink",
  },
  {
    filterName: "Цвет",
    text: "Midnight",
  },
  {
    filterName: "Цвет",
    text: "Starlight",
  },
  {
    filterName: "Цвет",
    text: "Green",
  },
  {
    filterName: "Цвет",
    text: "Alpine Green",
  },
  {
    filterName: "Цвет",
    text: "Sierra Blue",
  },
];

const colorIpadOptions = [
  {
    filterName: "Цвет",
    text: "Space Gray",
  },
  {
    filterName: "Цвет",
    text: "Starlight",
  },
  {
    filterName: "Цвет",
    text: "Silver",
  },
  {
    filterName: "Цвет",
    text: "Pink",
  },
  {
    filterName: "Цвет",
    text: "Purple",
  },
  {
    filterName: "Цвет",
    text: "Blue",
  },
];

const capacityOptions = {
  64: {
    filterName: "Память",
    text: "64Gb",
  },
  128: {
    filterName: "Память",
    text: "128Gb",
  },
  256: {
    filterName: "Память",
    text: "256Gb",
  },
  512: {
    filterName: "Память",
    text: "512Gb",
  },
  1: {
    filterName: "Память",
    text: "1Tb",
  },
  2: {
    filterName: "Память",
    text: "2Tb",
  },
  4: {
    filterName: "Память",
    text: "4Tb",
  },
};

const diagonalChoices = {
  8.3: {
    filterName: "Диагональ",
    text: '8.3"',
  },
  10.2: {
    filterName: "Диагональ",
    text: '10.2"',
  },
  10.9: {
    filterName: "Диагональ",
    text: '10.9"',
  },
  11: {
    filterName: "Диагональ",
    text: '11"',
  },
  12.9: {
    filterName: "Диагональ",
    text: '12.9"',
  },
};

const wifiChoices = {
  wifi: {
    filterName: "Wi-Fi",
    text: "Wi-Fi",
  },
  "wifi+cellular": {
    filterName: "Wi-Fi",
    text: "Wi-Fi + Cellular",
  },
};

export const initialProductCrumbs = [
  {
    name: "MacMac",
    link: "/",
  },
  {
    name: "Все товары",
    link: "/category/all-products",
  },
];

export const favoritesCrumbs = [
  {
    name: "MacMac",
    link: "/",
  },
  {
    name: "Избранное",
    link: "/favourites",
  },
];

export const bagCrumbs = [
  {
    name: "MacMac",
    link: "/",
  },
  {
    name: "Корзина",
    link: "/bag",
  },
];

export const headerCatalogCategories = [
  {
    header: "iPhone",
    bg: {
      img: iphoneCatalog,
      color: "#EEE3F3",
    },
    options: [
      {
        name: "iPhone SE 2022",
        link: "/category/iphone-se-2022",
      },
      {
        name: "iPhone 13",
        link: "/category/iphone-13",
      },
      {
        name: "iPhone 13 Pro",
        link: "/category/iphone-13-pro",
      },
      {
        name: "iPhone 13 Pro Max",
        link: "/category/iphone-13-pro-max",
      },
      {
        name: "iPhone 12",
        link: "/category/iphone-12",
      },
      {
        name: "iPhone 12 Pro",
        link: "/category/iphone-12-pro",
      },
    ],
  },
  {
    header: "iPad",
    bg: {
      img: ipadCatalog,
      color: "#FFE2D7",
    },
    options: [
      {
        name: "iPad Air 2022",
        link: "/category/ipad-air-2022",
      },
      {
        name: "iPad Pro 2021",
        link: "/category/ipad-pro-2021",
      },
      {
        name: "iPad Mini 6",
        link: "/category/ipad-mini-6",
      },
      {
        name: "iPad 2021",
        link: "/category/ipad-2021",
      },
    ],
  },
  {
    header: "AirPods",
    bg: {
      img: airpodsCatalog,
      color: "#DAEDF1",
    },
    options: [
      {
        name: "AirPods 2nd generation",
        link: "/category/airpods-2",
      },
      {
        name: "AirPods Pro",
        link: "/category/airpods-pro",
      },
      {
        name: "AirPods 3rd generation",
        link: "/category/airpods-3",
      },
    ],
  },
  {
    header: "Mac",
    bg: {
      img: imacCatalog,
      color: "#DBECCE",
    },
    options: [
      {
        name: "Macbook Air",
        link: "/category/macbook-air",
      },
      {
        name: "Macbook Pro",
        link: "/category/macbook-pro",
      },
      {
        name: "iMac",
        link: "/category/imac",
      },
    ],
  },
  {
    header: "Watch",
    bg: {
      img: applewatchCatalog,
      color: "#FFD965",
    },
    options: [
      {
        name: 'iMac 21"',
        link: "/category/imac-21",
      },
      {
        name: 'iMac 27"',
        link: "/category/imac-27",
      },
      {
        name: 'iMac 21.5"',
        link: "/category/imac-21-5",
      },
      {
        name: 'iMac 27.0"',
        link: "/category/imac-27-0",
      },
      {
        name: 'iMac Mini"',
        link: "/category/imac-mini",
      },
    ],
  },
];

export const headerCatalogOther = [
  {
    link: "/category/apple-tv",
    text: "TV",
  },
  {
    link: "/category/accessories",
    text: "Аксессуары",
  },
];

////////
