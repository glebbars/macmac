import Resizer from "react-image-file-resizer";
import axios from "axios";

export const validatePostForm = (values) => {
  const errors = {};
  
  if (!values.category) {
      errors.name = 'Это поле обязательно';
  }
  else if (!values.model) {
      errors.price = 'Это поле обязательно';
  } 
  // else if (!values.capacity) {
  //     errors.price = 'The capacity is required';
  // } 
  // else if (!values.color) {
  //     errors.color = 'The color is required';
  // } 
  else if (!values.pictures || values.pictures.length === 0) {
      errors.pictures = 'Please upload pictures';
  } 
  return errors
};


export const onTransform = async (values) => {

  const newFilesArr = values.pictures.filter(item => item.rawFile)
  const filledValues = fillEmptyValues(values)
  const price = await getPriceOfProductFromDB(filledValues)
  filledValues.price = +price

  const compressedImgs = await compressImages(newFilesArr)
  const uploadedImgs = await uploadImage(compressedImgs)
  filledValues.pictures = [...filledValues.pictures.filter(item => !item.rawFile), ...uploadedImgs]

  return filledValues  
};

const fillEmptyValues = (values) => {
  const allValues = {
    category: values.category,
    model: values.model,
    pictures: values.pictures,
    price: values.price,
    capacity: values.capacity ? values.capacity : '',
    color: values.color ? values.capacolorcity : '',
  }
  return allValues

}

export const getPriceOfProductFromDB = (allValues) =>  {

  const filterredValuesArr = Object.fromEntries(
    Object.entries(allValues).filter(([key, value]) => typeof value === 'string')
  )

  return axios.get('http://localhost:5000/prices/1').then(res => res.data)
  .then(pricesObj => {
    return Object.fromEntries(
      Object.entries(pricesObj)
        .filter(([key, value]) => 
        key.includes(filterredValuesArr.category.toLowerCase()) && key.includes(filterredValuesArr.model.toLowerCase()) && key.includes(filterredValuesArr.capacity.toLowerCase()) && key.includes(filterredValuesArr.color.toLowerCase())
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
  { id: 'Apple Watch', name: 'Apple Watch' },
  { id: 'AirPods', name: 'AirPods' },
  { id: 'Accessories', name: 'Accessories' },
  { id: 'Dyson', name: 'Dyson' },
]


export const getModelChoices = (value) => {
  switch(value){
    case 'iPhone': return iphoneModelChoices;
    case 'iPad': return ipadModelChoices;
    case 'AirPods': return airPodsModelChoices;
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

const airPodsModelChoices = [
  { id: '2', name: '2' },
  { id: 'Pro', name: 'Pro' },
  { id: '3', name: '3' },
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
    // case '11':
    case "SE 2020":
    case "12":
      return [capacityOptions["64"], capacityOptions["128"]]

    case '12 Pro':
    case "12 Pro Max":
    case "13 Mini":
      return [capacityOptions["256"], capacityOptions["512"]]

    case "13": 
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"]]

    case '11':
    case "13 Pro":
    case "13 Pro Max":
      return [capacityOptions["64"], capacityOptions["128"], capacityOptions["256"], capacityOptions["512"], capacityOptions["1"]]
      
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
      return [colorOptions["black"], colorOptions["white"],  colorOptions["purple"], colorOptions['product red'], colorOptions["yellow"], colorOptions["mind"]]

    case "SE 2020":
      return [colorOptions["black"], colorOptions["white"], colorOptions['product red']]

    case '12':
      return [colorOptions["black"],  colorOptions["white"],  colorOptions['product red'], colorOptions["mind"], colorOptions['blue'],colorOptions["purple"]]

    case '12 Pro':
    case "12 Pro Max":
      return [colorOptions["pacific blue"], colorOptions['graphite'], colorOptions["gold"],colorOptions["silver"]]

    case "13 Mini":
    case "13": 
      return [colorOptions["midnight"], colorOptions["starlight"], colorOptions['product red'],colorOptions["blue"], colorOptions["pink"], colorOptions["green"]]

    case "13 Pro":
    case "13 Pro Max":
      return [colorOptions["sierra blue"], colorOptions['graphite'], colorOptions["gold"],colorOptions["silver"], colorOptions["alpine green"]]

    default: return []
  }
}

// DONE: 11; se 2020; 12; 12 pro/pro-max; 13 pro/pro-max

const colorOptions =  {
  // 11 and se 2020
  'black': { id: 'Black', name: 'Black' },
  'product red': { id: 'Product Red', name: 'Product Red' },
  'yellow': { id: 'Yellow', name: 'Yellow' },
  'white': { id: 'White', name: 'White' },
  'mind': { id: 'Mind', name: 'Mind' },
  'purple': { id: 'Purple', name: 'Purple' },
  // 11 and se 2020


  // 12
  'blue': { id: 'Blue', name: 'Blue' },
  // black
  // white
  // green
  // purple
  // yellow
  // 12
  

  // 12 pro and 12 pro max
  'silver': { id: 'Silver', name: 'Silver' },
  'gold': { id: 'Gold', name: 'Gold' },
  'pacific blue': { id: 'Pacific Blue', name: 'Pacific Blue' },
  'graphite': { id: 'Graphite', name: 'Graphite' },
  // 12 pro and 12 pro max
  
  
  // 13 - 13 mini
  'pink': { id: 'Pink', name: 'Pink' },
  'midnight': { id: 'Midnight', name: 'Midnight' },
  'starlight': { id: 'Starlight', name: 'Starlight' },
  'green': { id: 'Green', name: 'Green' },
  // blue 
  // product red
  // 13 - 13 mini
  
  
  // 13 pro and 13 pro max
  // gold 
  // silver 
  // graphite
  'alpine green': { id: 'Alpine Green', name: 'Alpine Green' },
  'sierra blue': { id: 'Sierra Blue', name: 'Sierra Blue' },
  // 13 pro and 13 pro max

}

export const colorForToggle = {
  // 11 and se 2020
  "Black": "rgb(31, 32, 33)",
  "White": "rgb(246, 243, 241)",
  "Yellow": "rgb(251, 230, 143)",
  "Product Red": "rgb(170, 39, 52)",
  "Purple": "rgb(190, 184, 230)",
  "Mind": "rgb(184, 223, 206)",
  // 11 and se 2020


  // 12
  "Blue": "rgb(80, 119, 142)",
  // 12


  // 12 pro/pro-max
  "Silver": "rgb(242, 243, 239)",
  "Gold": "rgb(247, 234, 214)",
  "Pacific Blue": "rgb(81, 95, 115)",
  "Graphite": "rgb(60, 59, 52)",
  // 12 pro/pro-max
  

  // 13/13 mini 
  "Pink": "rgb(247, 227, 222)",
  "Midnight": "rgb(67, 71, 76)",
  "Green": "rgb(71, 84, 68)",
  "Starlight": "rgb(250, 247, 245)",
  // 13/13 mini 


  // 13 pro/pro-max
  "Sierra Blue": "rgb(179, 198, 217)",
  "Alpine Green": "rgb(90, 104, 88)"
  // 13 pro/pro-max1
  
}

export const productsWithCapacity = ['iPhone', 'iPad']
export const productsWithColors = ['iPhone', 'iPad']