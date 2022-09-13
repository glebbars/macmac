import Resizer from "react-image-file-resizer";
import axios from "axios";

export const validatePostForm = (values) => {
  const errors = {};

  if (!values.description?.brand) {
    errors.name = "Это поле обязательно";
  }

  if (!values.description?.category) {
    errors.name = "Это поле обязательно";
  } else if (!values.description?.model) {
    errors.price = "Это поле обязательно";
  } else if (!values.pictures || values.pictures.length === 0) {
    errors.pictures = "Please upload pictures";
  }
  return errors;
};

export const onTransform = async (values) => {
  const newFilesArr = values.pictures.filter((item) => item.rawFile);
  const price = await getPriceOfProductFromDB(values);
  const compressedImgs = await compressImages(newFilesArr);
  const uploadedImgs = await uploadImage(compressedImgs);

  return {
    id: values.id,
    fullName: values.fullName,
    price: price,
    pictures: [
      ...values.pictures.filter((item) => !item.rawFile),
      ...uploadedImgs,
    ],
    description: values.description,
  };
};

export const getPriceOfProductFromDB = async (productObj, priceList) => {
  const priceListDB = await getPriceListDB(priceList);

  const productNamesArr = Object.keys(priceListDB).find((key) => {
    if (productObj?.fullName?.toLowerCase() === key) {
      return priceListDB[key];
    }

    return "";
  });

  return productNamesArr ? priceListDB[productNamesArr] : productObj.price;
};

const getPriceListDB = async (priceList) => {
  if (priceList) {
    return priceList;
  } else {
    const response = await axios.get(
      `${process.env.REACT_APP_DB_API}/prices/1`
    );
    return response.data;
  }
};

const compressImages = async (filesArr) => {
  return await Promise.all(
    filesArr.map(async (file) => await resizeFile(file.rawFile))
  );
};

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      "PNG",
      100,
      0,
      (uri) => resolve(uri),
      "file"
    );
  });

const { REACT_APP_CLOUDINARY_PRESET_NAME, REACT_APP_CLOUDINARY_CLOUD_NAME } =
  process.env;

const uploadImage = async (compressedImgs) => {
  return await Promise.all(
    compressedImgs.map((img) => {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", `${REACT_APP_CLOUDINARY_PRESET_NAME}`);
      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          data
        )
        .then((res) => {
          return {
            url: res.data.secure_url,
            id: res.data.asset_id,
          };
        })
        .catch((err) => err);
    })
  );
};

export const brandOptions = [
  { id: "Apple", name: "Apple" },
  { id: "Sumsung", name: "Sumsung" },
  { id: "GoPro", name: "GoPro" },
  { id: "Dyson", name: "Dyson" },
  { id: "Accessories", name: "Accessories" },
];

export const getCategoryOptions = (value) => {
  switch (value) {
    case "Apple":
      return appleCategoryOptions;
    case "Sumsung":
      return [];
    case "GoPro":
      return [];
    case "Dyson":
      return [];
    default:
      return [];
  }
};

export const appleCategoryOptions = [
  { id: "iPhone", name: "iPhone" },
  { id: "iPad", name: "iPad" },
  { id: "MacBook", name: "MacBook" },
  { id: "Apple Watch", name: "Apple Watch" },
  { id: "AirPods", name: "AirPods" },
];

export const getModelOptions = (value) => {
  switch (value) {
    case "iPhone":
      return iphoneModelOptions;
    case "iPad":
      return ipadModelOptions;
    case "AirPods":
      return airPodsModelOptions;
    case "MacBook":
      return macbookModelOptions;
    case "Watch":
      return watchModelOptions;
    default:
      return [];
  }
};

export const iphoneModelOptions = [
  { id: "iPhone SE 2022", name: "iPhone SE 2022" },
  { id: "iPhone 11", name: "iPhone 11" },
  { id: "iPhone 12", name: "iPhone 12" },
  { id: "iPhone 12 Mini", name: "iPhone 12 Mini" },
  { id: "iPhone 13", name: "iPhone 13" },
  { id: "iPhone 13 Mini", name: "iPhone 13 Mini" },
  { id: "iPhone 13 Pro", name: "iPhone 13 Pro" },
  { id: "iPhone 13 Pro Max", name: "iPhone 13 Pro Max" },
];

export const airPodsModelOptions = [
  { id: "2", name: "2" },
  { id: "Pro", name: "Pro" },
  { id: "3", name: "3" },
];

export const ipadModelOptions = [
  { id: "iPad Air 2022", name: "iPad Air 2022" },
  { id: "iPad 2021", name: "iPad 2021" },
  { id: "iPad mini 6", name: "iPad mini 6" },
  { id: "iPad Pro 2021", name: "iPad Pro 2021" },
];

export const macbookModelOptions = [
  { id: "MacBook Air M2", name: "MacBook Air M2" },
  { id: "MacBook Air M1", name: "MacBook Air M1" },
  { id: "MacBook Pro M2", name: "MacBook Pro M2" },
  { id: "MacBook Pro M1", name: "MacBook Pro M1" },
  { id: "MacBook Pro M1 Pro", name: "MacBook Pro M1 Pro" },
  { id: "MacBook Pro M1 Max", name: "MacBook Pro M1 Max" },
];

const watchModelOptions = [
  { id: "6", name: "6" },
  { id: "7", name: "7" },
];

export const getDiagonalOptions = (category, model) => {
  switch (category) {
    case "iPad":
      return getIpadDiagonalOptions(model);
    case "MacBook":
      return getMacbookDiagonalOptions(model);
    default:
      return [];
  }
};

export const getIpadDiagonalOptions = (model) => {
  switch (model) {
    case "ipad air 2022":
      return [diagonalOptions["10.9"]];
    case "ipad 2021":
      return [diagonalOptions["10.2"]];
    case "ipad mini 6":
      return [diagonalOptions["8.3"]];
    case "ipad pro 2021":
      return [diagonalOptions["11"], diagonalOptions["12.9"]];

    default:
      return [];
  }
};

export const getMacbookDiagonalOptions = (model) => {
  switch (model) {
    case "macbook air m2":
    case "macbook pro m2":
      return [diagonalOptions["13.6"]];

    case "macbook air m1":
    case "macbook pro m1":
      return [diagonalOptions["13.3"]];

    case "macbook pro m1 pro":
      return [diagonalOptions["14"], diagonalOptions["16"]];

    case "macbook pro m1 max":
      return [diagonalOptions["16"]];

    default:
      return [];
  }
};

export const diagonalOptions = {
  8.3: { id: '8.3"', name: '8.3"' },
  10.2: { id: '10.2"', name: '10.2"' },
  10.9: { id: '10.9"', name: '10.9"' },
  11: { id: '11"', name: '11"' },
  12.9: { id: '12.9"', name: '12.9"' },

  13.3: { id: '13.3"', name: '13.3"' },
  13.6: { id: '13.6"', name: '13.6"' },
  14: { id: '14"', name: '14"' },
  16: { id: '16"', name: '16"' },
};

export const getWiFiOptions = (category) => {
  switch (category) {
    case "iPad":
      return [wifiOptions["wi-fi"], wifiOptions["wi-fi+cellular"]];
    default:
      return [];
  }
};

export const wifiOptions = {
  "wi-fi": { id: "Wi-Fi", name: "Wi-Fi" },
  "wi-fi+cellular": { id: "Wi-Fi + Cellular", name: "Wi-Fi + Cellular" },
};

export const getCapacityOptions = (category, model) => {
  switch (category) {
    case "iPhone":
      return getIphoneCapacityOptions(model);
    case "iPad":
      return getIpadCapacityOptions(model);
    case "MacBook":
      return getMacbookCapacityOptions(model);
    default:
      return [];
  }
};

export const getIphoneCapacityOptions = (model) => {
  switch (model) {
    case "iphone se 2022":
    case "iphone 11":
      return [
        capacityOptions["64"],
        capacityOptions["128"],
        capacityOptions["256"],
      ];

    case "iphone 12":
    case "iphone 12 mini":
      return [
        capacityOptions["64"],
        capacityOptions["128"],
        capacityOptions["256"],
        capacityOptions["512"],
      ];

    case "iphone 13":
    case "iphone 13 mini":
      return [
        capacityOptions["128"],
        capacityOptions["256"],
        capacityOptions["512"],
      ];

    case "iphone 13 pro":
    case "iphone 13 pro max":
      return [
        capacityOptions["128"],
        capacityOptions["256"],
        capacityOptions["512"],
        capacityOptions["1"],
      ];

    default:
      return [];
  }
};

export const getIpadCapacityOptions = (model) => {
  switch (model) {
    case "ipad air 2022":
    case "ipad 2021":
    case "ipad mini 6":
      return [capacityOptions["64"], capacityOptions["256"]];
    case "ipad pro 2021":
      return [
        capacityOptions["128"],
        capacityOptions["256"],
        capacityOptions["512"],
        capacityOptions["1"],
        capacityOptions["2"],
      ];
    default:
      return [];
  }
};

export const getMacbookCapacityOptions = (model) => {
  switch (model) {
    case "macbook air m2":
    case "macbook pro m2":
    case "macbook air m1":
    case "macbook pro m1":
      return [capacityOptions["256"], capacityOptions["512"]];

    case "macbook pro m1 pro":
    case "macbook pro m1 max":
      return [capacityOptions["512"], capacityOptions["1"]];

    default:
      return [];
  }
};

export const capacityOptions = {
  64: { id: "64Gb", name: "64Gb" },
  128: { id: "128Gb", name: "128Gb" },
  256: { id: "256Gb", name: "256Gb" },
  512: { id: "512Gb", name: "512Gb" },
  1: { id: "1Tb", name: "1Tb" },
  2: { id: "2Tb", name: "2Tb" },
  4: { id: "4Tb", name: "4Tb" },
};

export const getMemoryOptions = (category, model) => {
  switch (category) {
    case "MacBook":
      return getMacbookMemoryOptions(model);
    default:
      return [];
  }
};

export const getMacbookMemoryOptions = (model) => {
  switch (model) {
    case "macbook air m2":
    case "macbook air m1":
    case "macbook pro m2":
    case "macbook pro m1":
      return [memoryOptions["8"]];

    case "macbook pro m1 pro":
      return [memoryOptions["16"]];

    default:
      return [];
  }
};

export const memoryOptions = {
  8: { id: "8Gb", name: "8Gb" },
  16: { id: "16Gb", name: "16Gb" },
  32: { id: "32Gb", name: "32Gb" },
  64: { id: "64Gb", name: "64Gb" },
};

export const getColorOptions = (category, model) => {
  switch (category) {
    case "iPhone":
      return getIphoneColorgetIphoneColorOptions(model);
    case "iPad":
      return getIpadColorOptions(model);
    case "MacBook":
      return getMacbookColorOptions(model);
    case "Watch":
      return getWatchColorOptions(model);
    default:
      return [];
  }
};

export const getIphoneColorgetIphoneColorOptions = (model) => {
  switch (model) {
    case "iphone se 2020":
      return [
        colorOptions["black"],
        colorOptions["white"],
        colorOptions["product red"],
      ];

    case "iphone se 2022":
      return [
        colorOptions["midnight"],
        colorOptions["starlight"],
        colorOptions["product red"],
      ];

    case "iphone 11":
      return [
        colorOptions["black"],
        colorOptions["white"],
        colorOptions["purple"],
        colorOptions["product red"],
        colorOptions["yellow"],
        colorOptions["mind"],
      ];

    case "iphone 12 mini":
    case "iphone 12":
      return [
        colorOptions["black"],
        colorOptions["white"],
        colorOptions["product red"],
        colorOptions["mind"],
        colorOptions["blue"],
        colorOptions["purple"],
      ];

    case "iphone 13 mini":
    case "iphone 13":
      return [
        colorOptions["midnight"],
        colorOptions["starlight"],
        colorOptions["product red"],
        colorOptions["blue"],
        colorOptions["pink"],
        colorOptions["green"],
      ];

    case "iphone 13 pro":
    case "iphone 13 pro max":
      return [
        colorOptions["sierra blue"],
        colorOptions["graphite"],
        colorOptions["gold"],
        colorOptions["silver"],
        colorOptions["alpine green"],
      ];

    default:
      return [];
  }
};

export const getIpadColorOptions = (model) => {
  switch (model) {
    case "ipad air 2022":
      return [
        colorOptions["space gray"],
        colorOptions["starlight"],
        colorOptions["pink"],
        colorOptions["purple"],
        colorOptions["blue"],
      ];
    case "ipad mini 6":
      return [
        colorOptions["space gray"],
        colorOptions["starlight"],
        colorOptions["pink"],
        colorOptions["purple"],
      ];
    case "ipad 2021":
    case "ipad pro 2021":
      return [colorOptions["space gray"], colorOptions["silver"]];
    default:
      return [];
  }
};

export const getMacbookColorOptions = (model) => {
  switch (model) {
    case "macbook air m2":
      return [
        colorOptions["space gray"],
        colorOptions["silver"],
        colorOptions["starlight"],
        colorOptions["midnight"],
      ];

    case "macbook air m1":
      return [
        colorOptions["space gray"],
        colorOptions["silver"],
        colorOptions["gold"],
      ];

    case "macbook pro m2":
    case "macbook pro m1":
    case "macbook pro m1 pro":
    case "macbook pro m1 max":
      return [colorOptions["space gray"], colorOptions["silver"]];

    default:
      return [];
  }
};

const getWatchColorOptions = (model) => {
  switch (model) {
    case "6":
    case "7":
      return [
        colorOptions["black"],
        colorOptions["white"],
        colorOptions["product red"],
        colorOptions["mind"],
        colorOptions["blue"],
        colorOptions["purple"],
      ];

    default:
      return [];
  }
};

export const colorOptions = {
  black: { id: "Black", name: "Black" },
  "product red": { id: "Product Red", name: "Product Red" },
  yellow: { id: "Yellow", name: "Yellow" },
  white: { id: "White", name: "White" },
  mind: { id: "Mind", name: "Mind" },
  purple: { id: "Purple", name: "Purple" },
  blue: { id: "Blue", name: "Blue" },
  silver: { id: "Silver", name: "Silver" },
  gold: { id: "Gold", name: "Gold" },
  graphite: { id: "Graphite", name: "Graphite" },
  pink: { id: "Pink", name: "Pink" },
  midnight: { id: "Midnight", name: "Midnight" },
  starlight: { id: "Starlight", name: "Starlight" },
  green: { id: "Green", name: "Green" },
  "alpine green": { id: "Alpine Green", name: "Alpine Green" },
  "sierra blue": { id: "Sierra Blue", name: "Sierra Blue" },
  "space gray": { id: "Space Gray", name: "Space Gray" },
};

export const getColorForToggle = (category, color) => {
  switch (category) {
    case "iPhone":
      return iphoneColorsForToggle[color];

    case "iPad":
      return ipadColorsForToggle[color];

    case "MacBook":
      return macBookColorsForToggle[color];

    default:
      return [];
  }
};

const iphoneColorsForToggle = {
  Black: "rgb(31, 32, 33)",
  White: "rgb(246, 243, 241)",
  Yellow: "rgb(251, 230, 143)",
  "(Product) Red": "rgb(170, 39, 52)",
  Purple: "rgb(190, 184, 230)",
  Mind: "rgb(184, 223, 206)",
  Blue: "rgb(80, 119, 142)",
  Silver: "rgb(242, 243, 239)",
  Gold: "rgb(247, 234, 214)",
  Graphite: "rgb(60, 59, 52)",
  Pink: "rgb(247, 227, 222)",
  Midnight: "rgb(67, 71, 76)",
  Green: "rgb(71, 84, 68)",
  Starlight: "rgb(250, 247, 245)",
  "Sierra Blue": "rgb(179, 198, 217)",
  "Alpine Green": "rgb(90, 104, 88)",
};

const ipadColorsForToggle = {
  "Space Gray": "rgb(113, 111, 115)",
  Starlight: "rgb(250, 247, 243)",
  Pink: "rgb(227, 211, 208)",
  Purple: "rgb(191, 189, 209)",
  Blue: "rgb(151, 179, 192)",
  Silver: "rgb(221, 223, 222)",
};

const macBookColorsForToggle = {
  "Space Gray": "",
  Silver: "",
  Gold: "",
  Midnight: "",
  Starlight: "",
};

export const productsWithCapacity = ["iPhone", "iPad", "MacBook"];
export const productsWithColors = ["iPhone", "iPad", "MacBook", "Watch"];
export const productsWithDiagonal = ["iPad", "MacBook", "Watch"];
export const productsWithWiFi = ["iPad"];
export const productsWithMemory = ["MacBook"];
