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

  const newFilesArr = values.pictures.filter(item => item.rawFile)
  const price = await getPriceOfProductFromDB(values)
  values.price = +price

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
        .filter(([key, value]) => key.includes(filterredValuesArr.category.toLowerCase()) && key.includes(filterredValuesArr.model.toLowerCase()) && key.includes(filterredValuesArr.capacity.toLowerCase()) && key.includes(filterredValuesArr.color.toLowerCase())
      )
    )
  }).then(data => Object.values(data)[0] ? Object.values(data)[0] : allValues.price)
}
  
const compressImages = async (filesArr) => {
    const compressedPhotos = await Promise.all(
      filesArr.map(async file => await resizeFile(file.rawFile))
    )
  return compressedPhotos
};

const resizeFile = (file) => new Promise ((resolve) => {
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
  
const uploadImage = async (compressedImgs) => {
  const attachments = await Promise.all(
    compressedImgs.map(img => {
      const data = new FormData();
      data.append('file', img);
      data.append('upload_preset', "njebqo0r")
      return axios.post("https://api.cloudinary.com/v1_1/dlt6mfxib/image/upload", data)
      .then(res => {
        return {
          url: res.data.secure_url,
          id: res.data.asset_id
        }
      }).catch(err => err)

    })
  )
  return attachments
}

export const initialChoices = [
  { id: 'iPhone', name: 'iPhone' },
  { id: 'iPad', name: 'iPad' },
  { id: 'Mac', name: 'Mac' },
  { id: 'Apple watch', name: 'Apple watch' },
  { id: 'AirPods', name: 'AirPods' },
  { id: 'Accessories', name: 'Accessories' },
  { id: 'Dyson', name: 'Dyson' },
]


export const getModelChoices = (value) => {
  switch(value){
    case 'iPhone': return iphoneModelChoices
    case 'iPad': return ipadModelChoices
    default: return []
  }
}

const iphoneModelChoices = [
  { id: '11', name: '11' },
  { id: 'SE 2020', name: 'SE 2020' },
  { id: '12', name: '12' },
  // { id: '12 mini', name: '12 Mini' },
  { id: '12 Pro', name: '12 Pro' },
  { id: '12 Pro Max', name: '12 Pro Max' },
  { id: '13', name: '13' },
  { id: '13 Mini', name: '13 Mini' },
  { id: '13 Pro', name: '13 Pro' },
  { id: '13 Pro Max', name: '13 Pro Max' },
]

const ipadModelChoices = [
  { id: '10.2 2021', name: '10.2 2021' },
  { id: '11 2021', name: '11 2021' },
  { id: '12.9 2021', name: '12.9 2021' },
  { id: 'Mini 6', name: 'Mini 6' },
  { id: 'Air 4', name: 'Air 4' }
]

export const getCapacityChoices = (value) => {
  switch(value){
    case '11':
    case "SE 2020":
    case "12":
      return [capacityOptions["64"], capacityOptions["128"]]

    case '12 Pro':
    case "12 Pro Max":
    case "13 Mini":
      return [capacityOptions["256"], capacityOptions["512"]]

    case "13": 
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"]]

    case "13 Pro":
    case "13 Pro Max":
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"], capacityOptions["1"]]
      
    default: return []

  }
}

const capacityOptions = {
  "64":  { id: '64Gb', name: '64Gb' },
  "128":{ id: '128Gb', name: '128Gb' },
  "256": { id: '256Gb', name: '256Gb' },
  "512":{ id: '512Gb', name: '512Gb' },
  "1": { id: '1Tb', name: '1Tb' },
}

export const getColorChoices = (value) => {
  switch(value){
    case '11':
      return [colorOptions["black"], colorOptions['product red'], colorOptions["white"],colorOptions["green"],colorOptions["purple"], colorOptions["yellow"]]

    case "SE 2020":
      return [colorOptions["black"], colorOptions['product red'], colorOptions["white"]]

    case '12':
      return [colorOptions["black"], colorOptions['blue'], colorOptions["white"],colorOptions["green"],colorOptions["purple"], colorOptions["yellow"]]

    case '12 Pro':
    case "12 Pro Max":
      return [colorOptions["pacific blue"], colorOptions['graphite'], colorOptions["gold"],colorOptions["silver"]]

    case "13 Mini":
    case "13": 
      return [colorOptions["pink"], colorOptions['product red'], colorOptions["starlight"],colorOptions["midnight"], colorOptions["blue"],]

    case "13 Pro":
    case "13 Pro Max":
      return [colorOptions["sierra blue"], colorOptions['graphite'], colorOptions["gold"],colorOptions["silver"]]

    default: return []
  }
}

const colorOptions =  {
  'silver': { id: 'Silver', name: 'Silver' },
  'space grey': { id: 'Space Grey', name: 'Space Grey' },
  'yellow': { id: 'Yellow', name: 'Yellow' },
  'gold': { id: 'Gold', name: 'Gold' },
  'midnight green': { id: 'Midnight Green', name: 'Midnight Green' },
  'black': { id: 'Black', name: 'Black' },
  'blue': { id: 'Blue', name: 'Blue' },
  'green': { id: 'Green', name: 'green' },
  'product red': { id: 'Product Red', name: 'Product Red' },
  'purple': { id: 'Purple', name: 'Purple' },
  'white': { id: 'White', name: 'White' },
  'pacific blue': { id: 'Pacific Blue', name: 'Pacific Blue' },
  'graphite': { id: 'Graphite', name: 'Graphite' },
  'pink': { id: 'Pink', name: 'Pink' },
  'midnight': { id: 'Midnight', name: 'Midnight' },
  'starlight': { id: 'Starlight', name: 'Starlight' },
  'sierra blue': { id: 'Sierra Blue', name: 'Sierra Blue' },
}