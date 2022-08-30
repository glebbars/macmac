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

  // const descriptionValues = Object.values(productObj.description).map(name => name.toLowerCase())

  // const productNamesArr = Object.keys(priceListDB).filter(key => {
  //   const includesAll = descriptionValues.every(name => key.includes(name))

  //   if(includesAll && key){
  //     return priceListDB[key]
  //   }
  // })

  const productNamesArr = Object.keys(priceListDB).find((key) => {
    if (productObj.fullName.toLowerCase() === key) {
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
    // const response = await axios.get('http://localhost:5000/prices/1')
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

export const brandChoices = [
  { id: "Apple", name: "Apple" },
  { id: "Sumsung", name: "Sumsung" },
  { id: "GoPro", name: "GoPro" },
  { id: "Dyson", name: "Dyson" },
  { id: "Accessories", name: "Accessories" },
];

export const getCategoryChoices = (value) => {
  switch (value) {
    case "Apple":
      return appleCategoryChoices;
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

export const appleCategoryChoices = [
  { id: "iPhone", name: "iPhone" },
  { id: "iPad", name: "iPad" },
  { id: "Mac", name: "Mac" },
  { id: "Apple Watch", name: "Apple Watch" },
  { id: "AirPods", name: "AirPods" },
];

export const getModelChoices = (value) => {
  switch (value) {
    case "iPhone":
      return iphoneModelChoices;
    case "iPad":
      return ipadModelChoices;
    case "AirPods":
      return airPodsModelChoices;
    case "Mac":
      return macModelChoices;
    case "Watch":
      return watchModelChoices;
    default:
      return [];
  }
};

const iphoneModelChoices = [
  { id: "iPhone SE 2020", name: "iPhone SE 2020" },
  { id: "iPhone SE 2022", name: "iPhone SE 2022" },
  { id: "iPhone 11", name: "iPhone 11" },
  { id: "iPhone 12", name: "iPhone 12" },
  { id: "iPhone 12 Mini", name: "iPhone 12 Mini" },
  { id: "iPhone 12 Pro", name: "iPhone 12 Pro" },
  { id: "iPhone 12 Pro Max", name: "iPhone 12 Pro Max" },
  { id: "iPhone 13", name: "iPhone 13" },
  { id: "iPhone 13 Mini", name: "iPhone 13 Mini" },
  { id: "iPhone 13 Pro", name: "iPhone 13 Pro" },
  { id: "iPhone 13 Pro Max", name: "iPhone 13 Pro Max" },
];

const airPodsModelChoices = [
  { id: "2", name: "2" },
  { id: "Pro", name: "Pro" },
  { id: "3", name: "3" },
];

const ipadModelChoices = [
  { id: "iPad Air 2022", name: "iPad Air 2022" },
  { id: "iPad 2021", name: "iPad 2021" },
  { id: "iPad mini 6", name: "iPad mini 6" },
  { id: "iPad Pro 2021", name: "iPad Pro 2021" },
];

const macModelChoices = [
  { id: "Pro", name: "Pro" },
  { id: "Air", name: "Air" },
];

const watchModelChoices = [
  { id: "6", name: "6" },
  { id: "7", name: "7" },
];

export const getDiagonalChoices = (category, model) => {
  switch (category) {
    case "iPad":
      return getIpadDiagonalChoices(model);
    case "Mac":
      return getMacCapacityChoices(model);
    default:
      return [];
  }
};

const getIpadDiagonalChoices = (model) => {
  switch (model) {
    case "ipad air 2022":
      return [diagonalChoices["10.9"]];
    case "ipad 2021":
      return [diagonalChoices["10.2"]];
    case "ipad mini 6":
      return [diagonalChoices["8.3"]];
    case "ipad pro 2021":
      return [diagonalChoices["11"], diagonalChoices["12.9"]];

    default:
      return [];
  }
};

const diagonalChoices = {
  10.9: { id: '10.9"', name: '10.9"' },
  10.2: { id: '10.2"', name: '10.2"' },
  8.3: { id: '8.3"', name: '8.3"' },
  12.9: { id: '12.9"', name: '12.9"' },
  11: { id: '11"', name: '11"' },
};

export const getWiFiChoices = (category) => {
  switch (category) {
    case "iPad":
      return WiFiChoices;
    default:
      return [];
  }
};

const WiFiChoices = [
  { id: "Wi-Fi", name: "Wi-Fi" },
  { id: "Wi-Fi + Cellular", name: "Wi-Fi + Cellular" },
];

export const getCapacityChoices = (category, model) => {
  switch (category) {
    case "iPhone":
      return getIphoneCapacityChoices(model);
    case "iPad":
      return getIpadCapacityChoices(model);
    case "Mac":
      return getMacCapacityChoices(model);
    default:
      return [];
  }
};

export const getIphoneCapacityChoices = (model) => {
  switch (model) {
    case "iphone se 2020":
      return [capacityOptions["64"], capacityOptions["128"]];

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

    case "iphone 12 pro":
    case "iphone 12 pro max":
      return [capacityOptions["128"], capacityOptions["256"]];

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

export const getIpadCapacityChoices = (model) => {
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

const getMacCapacityChoices = (model) => {
  switch (model) {
    case "Air":
    case "Pro":
      return [
        capacityOptions["64"],
        capacityOptions["128"],
        capacityOptions["256"],
        capacityOptions["512"],
        capacityOptions["1"],
      ];

    default:
      return [];
  }
};

const capacityOptions = {
  64: { id: "64Gb", name: "64Gb" },
  128: { id: "128Gb", name: "128Gb" },
  256: { id: "256Gb", name: "256Gb" },
  512: { id: "512Gb", name: "512Gb" },
  1: { id: "1Tb", name: "1Tb" },
  2: { id: "2Tb", name: "2Tb" },
};

export const getColorChoices = (category, model) => {
  switch (category) {
    case "iPhone":
      return getIphoneColorChoices(model);
    case "iPad":
      return getIpadColorChoices(model);
    case "Mac":
      return getMacColorChoices(model);
    case "Watch":
      return getWatchColorChoices(model);
    default:
      return [];
  }
};

export const getIphoneColorChoices = (model) => {
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

    case "iphone 12 pro":
    case "iphone 12 pro max":
      return [
        colorOptions["pacific blue"],
        colorOptions["graphite"],
        colorOptions["gold"],
        colorOptions["silver"],
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

export const getIpadColorChoices = (model) => {
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

const getMacColorChoices = (model) => {
  switch (model) {
    case "Air":
    case "Pro":
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

const getWatchColorChoices = (model) => {
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

const colorOptions = {
  black: { id: "Black", name: "Black" },
  "product red": { id: "(Product) Red", name: "(Product) Red" },
  yellow: { id: "Yellow", name: "Yellow" },
  white: { id: "White", name: "White" },
  mind: { id: "Mind", name: "Mind" },
  purple: { id: "Purple", name: "Purple" },
  blue: { id: "Blue", name: "Blue" },
  silver: { id: "Silver", name: "Silver" },
  gold: { id: "Gold", name: "Gold" },
  "pacific blue": { id: "Pacific Blue", name: "Pacific Blue" },
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
  "Pacific Blue": "rgb(81, 95, 115)",
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

export const productsWithCapacity = ["iPhone", "iPad", "Mac"];
export const productsWithColors = ["iPhone", "iPad", "Mac", "Watch"];
export const productsWithDiagonal = ["iPad", "Mac", "Watch"];
export const productsWithWiFi = ["iPad"];
