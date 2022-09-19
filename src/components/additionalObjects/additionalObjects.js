import lightpurpleLine from "../../img/lightpurple-line.svg";
import greenLine from "../../img/green-line.svg";
import blueLine from "../../img/blue-line.svg";
import iphoneCatalog from "../../img/catalog-iphone.png";
import ipadCatalog from "../../img/catalog-ipad.png";
import imacCatalog from "../../img/catalog-imac.png";
import airpodsCatalog from "../../img/catalog-airpods.png";
import {
  getIpadCapacityOptions,
  getIpadColorOptions,
  getIpadDiagonalOptions,
  getIphoneCapacityOptions,
  getIphoneColorgetIphoneColorOptions,
  getMacbookCapacityOptions,
  getMacbookColorOptions,
  getMacbookDiagonalOptions,
  getMacbookMemoryOptions,
  iphoneModelOptions,
  ipadModelOptions,
  macbookModelOptions,
  airPodsModelOptions,
  colorOptions,
  appleCategoryOptions,
  capacityOptions,
  diagonalOptions,
  wifiOptions,
  memoryOptions,
} from "../../admin/AdditionalFunctions/AdditionalFunctions";

export const routesNames = {
  "all-products": "Все товары",
  apple: "Apple",
  iphone: "iPhone",
  airpods: "AirPods",
  ipad: "iPad",
  macbook: "Macbook",
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
    link: "/category/macbook",
    text: "Macbook",
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
    text: "Macbook,",
    link: "/category/macbook",
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
    link: "/category/macbook",
    text: "Macbook",
    class: "products__sidebar__category-text",
  },
  {
    link: "/category/watch",
    text: "Watch",
    class: "products__sidebar__category-text",
  },
];

export const getFilteringOptions = (
  optionsType,
  categoryName,
  searchResult
) => {
  if (categoryName) {
    return getRightOptionsFunc(optionsType, categoryName);
  } else if (searchResult) {
    const similarName = getSimilarCategoryName(searchResult);
    return getRightOptionsFunc(optionsType, similarName);
  }
};

const getRightOptionsFunc = (optionsType, value) => {
  switch (optionsType) {
    case "category":
      return getCategoryOptions(value);
    case "model":
      return getAppleModelOptions(value);
    case "color":
      return getAppleColorOptions(value);
    case "capacity":
      return getAppleCapacityOptions(value);
    case "diagonal":
      return getAppleDiagonalOptions(value);
    case "wifi":
      return getAppleWifiOptions(value);
    case "memory":
      return getAppleMemoryOptions(value);
    default:
      return [];
  }
};

const getCategoryOptions = (value) => {
  switch (value) {
    case "apple":
      return getOptionsForFiltering(appleCategoryOptions, "Категория");
    default:
      return [];
  }
};

const getAppleModelOptions = (value) => {
  switch (value) {
    case "iphone":
      return getOptionsForFiltering(iphoneModelOptions, "Модель");

    case "ipad":
      return getOptionsForFiltering(ipadModelOptions, "Модель");

    case "airpods":
      return getOptionsForFiltering(airPodsModelOptions, "Модель");

    case "macbook":
      return getOptionsForFiltering(macbookModelOptions, "Модель");
    default:
      return [];
  }
};

const getAppleColorOptions = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "iphone":
        return getOptionsForFiltering(colorIphoneOptions, "Цвет");
      case "ipad":
        return getOptionsForFiltering(colorIpadOptions, "Цвет");

      case "macbook":
        return getOptionsForFiltering(colorMacbookOptions, "Цвет");

      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("iphone"):
        return getExtendedOptions(
          value,
          "Цвет",
          getIphoneColorgetIphoneColorOptions
        );

      case value.includes("ipad"):
        return getExtendedOptions(value, "Цвет", getIpadColorOptions);

      case value.includes("macbook"):
        return getExtendedOptions(value, "Цвет", getMacbookColorOptions);

      default:
        return [];
    }
  }
};

const getAppleCapacityOptions = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "iphone":
        return getOptionsForFiltering(capacityIphoneOptions, "Память");

      case "ipad":
        return getOptionsForFiltering(capacityIpadOptions, "Память");

      case "macbook":
        return getOptionsForFiltering(capacityMacbookOptions, "Память");

      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("iphone"):
        return getExtendedOptions(value, "Память", getIphoneCapacityOptions);

      case value.includes("ipad"):
        return getExtendedOptions(value, "Память", getIpadCapacityOptions);

      case value.includes("macbook"):
        return getExtendedOptions(value, "Память", getMacbookCapacityOptions);

      default:
        return [];
    }
  }
};

const getAppleDiagonalOptions = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "ipad":
        return getOptionsForFiltering(diagonalIpadOptions, "Диагональ");

      case "macbook":
        return getOptionsForFiltering(diagonalMacbookOptions, "Диагональ");

      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("ipad"):
        return getExtendedOptions(value, "Диагональ", getIpadDiagonalOptions);

      case value.includes("macbook"):
        return getExtendedOptions(
          value,
          "Диагональ",
          getMacbookDiagonalOptions
        );

      default:
        return [];
    }
  }
};

const getAppleWifiOptions = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "ipad":
        return getOptionsForFiltering(wifiIpadOptions, "Wi-Fi");

      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("ipad"):
        return getOptionsForFiltering(wifiIpadOptions, "Wi-Fi");

      default:
        return [];
    }
  }
};

const getAppleMemoryOptions = (value) => {
  if (!value.includes("-")) {
    switch (value) {
      case "macbook":
        return getOptionsForFiltering(
          memoryMacbookOptions,
          "Оперативная память"
        );

      default:
        return [];
    }
  } else {
    switch (true) {
      case value.includes("macbook"):
        return getExtendedOptions(
          value,
          "Оперативная память",
          getMacbookMemoryOptions
        );

      default:
        return [];
    }
  }
};

const getOptionsForFiltering = (optionsArr, filterName) => {
  return optionsArr.map((option) => ({
    filterName,
    text: option?.name,
  }));
};

const getExtendedOptions = (model, name, getOptionsFunc) => {
  const routeModel = model.split("-").join(" ");

  const adminOptions = getOptionsFunc(routeModel);

  return adminOptions.map((obj) => ({
    filterName: name,
    text: obj.name,
  }));
};

export const getSimilarCategoryName = (name) => {
  for (let product in routesNames) {
    if (routesNames[product].toLowerCase().includes(name)) {
      return routesNames[product].toLowerCase();
    }
  }
};

const colorIphoneOptions = [
  colorOptions["black"],
  colorOptions["product red"],
  colorOptions["yellow"],
  colorOptions["white"],
  colorOptions["mind"],
  colorOptions["purple"],
  colorOptions["blue"],
  colorOptions["silver"],
  colorOptions["gold"],
  colorOptions["graphite"],
  colorOptions["pink"],
  colorOptions["midnight"],
  colorOptions["starlight"],
  colorOptions["alpine green"],
  colorOptions["sierra blue"],
];

const colorIpadOptions = [
  colorOptions["space gray"],
  colorOptions["purple"],
  colorOptions["blue"],
  colorOptions["silver"],
  colorOptions["pink"],
  colorOptions["starlight"],
];

const colorMacbookOptions = [
  colorOptions["space gray"],
  colorOptions["silver"],
  colorOptions["starlight"],
  colorOptions["midnight"],
  colorOptions["gold"],
];

const capacityIphoneOptions = [
  capacityOptions["64"],
  capacityOptions["128"],
  capacityOptions["256"],
  capacityOptions["512"],
  capacityOptions["1"],
];

const capacityIpadOptions = [...capacityIphoneOptions, capacityOptions["2"]];

const capacityMacbookOptions = [
  capacityOptions["256"],
  capacityOptions["512"],
  capacityOptions["1"],
  capacityOptions["2"],
  capacityOptions["4"],
];

const diagonalIpadOptions = [
  diagonalOptions[8.3],
  diagonalOptions[10.2],
  diagonalOptions[10.9],
  diagonalOptions[11],
  diagonalOptions[12.9],
];

const diagonalMacbookOptions = [
  diagonalOptions[13.3],
  diagonalOptions[13.6],
  diagonalOptions[14],
  diagonalOptions[16],
];

const memoryMacbookOptions = [
  memoryOptions[8],
  memoryOptions[16],
  memoryOptions[32],
  memoryOptions[64],
];

const wifiIpadOptions = [wifiOptions["wi-fi"], wifiOptions["wi-fi+cellular"]];

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
        name: "iPhone 12 Mini",
        link: "/category/iphone-12-mini",
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
    header: "Macbook",
    bg: {
      img: imacCatalog,
      color: "#DBECCE",
    },
    options: [
      {
        name: "Macbook Air M2",
        link: "/category/macbook-air-m2",
      },
      {
        name: "Macbook Air M1",
        link: "/category/macbook-air-m1",
      },
      {
        name: "MacBook Pro M2",
        link: "/category/macbook-pro-m2",
      },
      {
        name: "MacBook Pro M1",
        link: "/category/macbook-pro-m1",
      },
      {
        name: "MacBook Pro M1 Pro",
        link: "/category/macbook-pro-m1-pro",
      },
      {
        name: "MacBook Pro M1 Max",
        link: "/category/macbook-pro-m1-max",
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
  // {
  //   header: "Watch",
  //   bg: {
  //     img: applewatchCatalog,
  //     color: "#FFD965",
  //   },
  //   options: [
  //     {
  //       name: 'iMac 21"',
  //       link: "/category/imac-21",
  //     },
  //     {
  //       name: 'iMac 27"',
  //       link: "/category/imac-27",
  //     },
  //     {
  //       name: 'iMac 21.5"',
  //       link: "/category/imac-21-5",
  //     },
  //     {
  //       name: 'iMac 27.0"',
  //       link: "/category/imac-27-0",
  //     },
  //     {
  //       name: 'iMac Mini"',
  //       link: "/category/imac-mini",
  //     },
  //   ],
  // },
];

export const headerCatalogOther = [
  // {
  //   link: "/category/apple-tv",
  //   text: "TV",
  // },
  {
    link: "/category/watch",
    text: "Watch",
  },
  {
    link: "/category/accessories",
    text: "Аксессуары",
  },
];

////////
