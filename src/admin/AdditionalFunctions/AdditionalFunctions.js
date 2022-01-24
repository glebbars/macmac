import Resizer from "react-image-file-resizer";
import axios from "axios";

export const validatePostForm = (values) => {
  const errors = {};
  if (!values.category) {
      errors.name = 'The firstName is required';
  }
  else if (!values.model) {
      errors.price = 'The price is required';
  } 
  else if (!values.capacity) {
      errors.price = 'The price is required';
  } 
  else if (!values.color) {
      errors.color = 'The color is required';
  } 
  else if (!values.pictures || values.pictures.length === 0) {
      errors.pictures = 'Please upload pictures';
  } 
  return errors
};


export const onTransform = async (values) => {
  console.log(values)

  const newFilesArr = values.pictures.filter(item => item.rawFile)
  const price = await getPriceOfProductFromDB(values)
  values.price = price

  const compressedImgs = await compressImages(newFilesArr)
  const uploadedImgs = await uploadImage(compressedImgs)
  values.pictures = [...values.pictures.filter(item => !item.rawFile), ...uploadedImgs]

  return values  
};

export const getPriceOfProductFromDB = (allValues) =>  {

  const filterredValuesArr = Object.fromEntries(
    Object.entries(allValues).filter(([key, value]) => typeof value === 'string')
  )

  return axios.get('http://localhost:5000/prices/1').then(res => res.data)
  .then(pricesObj => {
    return Object.fromEntries(
      Object.entries(pricesObj)
        .filter(([key, value]) => key.includes(filterredValuesArr.category) && key.includes(filterredValuesArr.model) && key.includes(filterredValuesArr.capacity) && key.includes(filterredValuesArr.color)
      )
    )
  }).then(data => Object.values(data)[0] ? Object.values(data)[0] : allValues.price)
}
  
const compressImages = async (filesArr) => {
    const compressedPhotos = await Promise.all(
      filesArr.map(async file => await resizeFile(file.rawFile))
    )
    console.log(compressedPhotos)
  return compressedPhotos
};

const resizeFile = (file) => new Promise ((resolve) => {
  Resizer.imageFileResizer(
    file,
    1500,
    1500,
    "JPEG",
    100,
    0,
    (uri) => resolve(uri),
    "file"
  );
});
  
const uploadImage = async (compressedImgs) => {
  const attachments = await Promise.all(
    compressedImgs.map(img => {
      const data = new FormData();
      data.append('file', img);
      data.append('upload_preset', "njebqo0r")
      return axios.post("https://api.cloudinary.com/v1_1/dlt6mfxib/image/upload", data)
      .then(res => {
        console.log(res)
        return {
          url: res.data.secure_url,
          id: res.data.asset_id
        }
      }).catch(err => console.log(err))

    })
  )
  return attachments
}

export const initialChoices = [
  { id: 'iphone', name: 'iPhone' },
  { id: 'ipad', name: 'iPad' },
  { id: 'mac', name: 'Mac' },
  { id: 'watch', name: 'Apple watch' },
  { id: 'airpods', name: 'AirPods' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'dyson', name: 'dyson' },
  ]


export const getModelChoices = (value) => {
  switch(value){
    case 'iphone':
      return iphoneModelChoices
    break;
    case 'ipad':
      return ipadModelChoices
    break;
  }
}

const iphoneModelChoices = [
  { id: '11', name: '11' },
  { id: 'se 2020', name: 'SE 2020' },
  { id: '12', name: '12' },
  // { id: '12 mini', name: '12 Mini' },
  { id: '12 pro', name: '12 Pro' },
  { id: '12 pro max', name: '12 Pro Max' },
  { id: '13', name: '13' },
  { id: '13 mini', name: '13 Mini' },
  { id: '13 pro', name: '13 Pro' },
  { id: '13 pro max', name: '13 Pro Max' },
]

const ipadModelChoices = [
  { id: '10.2 2021', name: '10.2 2021' },
  { id: '11 2021', name: '11 2021' },
  { id: '12.9 2021', name: '12.9 2021' },
  { id: 'mini 6', name: 'mini 6' },
  { id: 'air 4', name: 'Air 4' }
]

export const getCapacityChoices = (value) => {
  switch(value){
    case '11':
    case "se 2020":
    case "12":
      return [capacityOptions["64"], capacityOptions["128"]]
    break;

    case '12 pro':
    case "12 pro max":
    case "13 mini":
      return [capacityOptions["256"], capacityOptions["512"]]
    break;

    case "13": 
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"]]
    break;

    case "13 pro":
    case "13 pro max":
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"], capacityOptions["1"]]
    break;  


  }
}

const capacityOptions = {
  "64":  { id: '64gb', name: '64GB' },
  "128":{ id: '128gb', name: '128GB' },
  "256": { id: '256gb', name: '256GB' },
  "512":{ id: '512gb', name: '512GB' },
  "1": { id: '1tb', name: '1TB' },
}

export const getColorChoices = (value) => {
  switch(value){
    case '11':
      return [colorOptions["black"], colorOptions['product red'], colorOptions["white"],colorOptions["green"],colorOptions["purple"], colorOptions["yellow"]]
    break;

    case "se 2020":
      return [colorOptions["black"], colorOptions['product red'], colorOptions["white"]]
    break;

    case '12':
      return [colorOptions["black"], colorOptions['blue'], colorOptions["white"],colorOptions["green"],colorOptions["purple"], colorOptions["yellow"]]
    break;

    case '12 pro':
    case "12 pro max":
      return [colorOptions["pacific blue"], colorOptions['graphite'], colorOptions["gold"],colorOptions["silver"]]
    break;

    case "13 mini":
    case "13": 
      return [colorOptions["pink"], colorOptions['product red'], colorOptions["starlight"],colorOptions["midnight"], colorOptions["blue"],]
    break;

    case "13 pro":
    case "13 pro max":
      return [colorOptions["sierra blue"], colorOptions['graphite'], colorOptions["gold"],colorOptions["silver"]]
    break;  
  }
}

const colorOptions =  {
  'silver': { id: 'silver', name: 'Silver' },
  'space grey': { id: 'space grey', name: 'Space Grey' },
  'yellow': { id: 'yellow', name: 'Yellow' },
  'gold': { id: 'gold', name: 'Gold' },
  'midnight green': { id: 'midnight green', name: 'Midnight Green' },
  'black': { id: 'black', name: 'Black' },
  'blue': { id: 'blue', name: 'Blue' },
  'green': { id: 'green', name: 'green' },
  'product red': { id: 'product red', name: 'Product Red' },
  'purple': { id: 'purple', name: 'Purple' },
  'white': { id: 'white', name: 'White' },
  'pacific blue': { id: 'pacific blue', name: 'Pacific Blue' },
  'graphite': { id: 'graphite', name: 'Graphite' },
  'pink': { id: 'pink', name: 'Pink' },
  'midnight': { id: 'midnight', name: 'Midnight' },
  'starlight': { id: 'starlight', name: 'Starlight' },
  'sierra blue': { id: 'sierra blue', name: 'Sierra Blue' },
}