import Resizer from "react-image-file-resizer";
import axios from "axios";

export const validatePostForm = (values) => {
  const errors = {};

  if (!values.description?.brand) {
      errors.name = 'Это поле обязательно';
  }

  if (!values.description?.category) {
      errors.name = 'Это поле обязательно';
  }
  else if (!values.description?.model) {
      errors.price = 'Это поле обязательно';
  } 
  else if (!values.pictures || values.pictures.length === 0) {
      errors.pictures = 'Please upload pictures';
  } 
  return errors
};


export const onTransform = async (values) => {

  const newFilesArr = values.pictures.filter(item => item.rawFile)
  const price = await getPriceOfProductFromDB(values)
  const compressedImgs = await compressImages(newFilesArr)
  const uploadedImgs = await uploadImage(compressedImgs)

  const allValues = {
    id: values.id,
    fullName: values.fullName,
    price: price,
    pictures: [...values.pictures.filter(item => !item.rawFile), ...uploadedImgs],
    description: values.description
  }

  return allValues  
};


export const getPriceOfProductFromDB = async (productObj, priceList) =>  {
  const priceListDB = await getPriceListDB(priceList)

  const descriptionValues = Object.values(productObj.description).map(name => name.toLowerCase())

  const productNamesArr = Object.keys(priceListDB).filter(key => {
    const includesAll = descriptionValues.every(name => key.includes(name))

    if(includesAll && key){
      return priceListDB[key]
    }
  })

  const price = priceListDB[productNamesArr[0]]

  return price ? price : productObj.price
}

const getPriceListDB = async (priceList) => {
  if(priceList){
    return priceList
  } else {
    const response = await axios.get('http://localhost:5000/prices/1')
    return response.data
  }
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

const {REACT_APP_CLOUDINARY_PRESET_NAME, REACT_APP_CLOUDINARY_CLOUD_NAME} = process.env


const uploadImage = async (compressedImgs) => {
  const attachments = await Promise.all(
    compressedImgs.map(img => {
      const data = new FormData();
      data.append('file', img);
      data.append('upload_preset', `${REACT_APP_CLOUDINARY_PRESET_NAME}`)
      return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, data)
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


export const brandChoices = [
  {id: 'Apple', name: 'Apple'},
  {id: 'Sumsung', name: 'Sumsung'},
  {id: 'GoPro', name: 'GoPro'},
  {id: 'Dyson', name: 'Dyson'},
  { id: 'Accessories', name: 'Accessories'}
]

export const getCategoryChoices = (value) => {
  switch(value){
    case 'Apple': return appleCategoryChoices;
    case 'Sumsung': return [];
    case 'GoPro': return [];
    case 'Dyson': return [];
    default: return []
  }
}

export const appleCategoryChoices = [
  { id: 'iPhone', name: 'iPhone' },
  { id: 'iPad', name: 'iPad' },
  { id: 'Macbook', name: 'Macbook' },
  { id: 'Apple Watch', name: 'Apple Watch' },
  { id: 'AirPods', name: 'AirPods' }
]


export const getModelChoices = (value) => {
  switch(value){
    case 'iPhone': return iphoneModelChoices;
    case 'iPad': return ipadModelChoices;
    case 'AirPods': return airPodsModelChoices;
    case 'Macbook': return macBookModelChoices;
    case 'Watch': return watchModelChoices;
    default: return []
  }
}

const iphoneModelChoices = [
  { id: 'SE 2020', name: 'SE 2020' },
  { id: 'SE 3', name: 'SE 3' },
  { id: '11', name: '11' },
  { id: '12', name: '12' },
  { id: '12 Mini', name: '12 Mini' },
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

const macBookModelChoices = [
  { id: 'Pro', name: 'Pro' },
  { id: 'Air', name: 'Air' },
]

const watchModelChoices = [
  { id: '6', name: '6' },
  { id: '7', name: '7' }, 
]


export const getCapacityChoices = (category, model) => {
  switch(category){
    case 'iPhone': return getIphoneCapacityChoices(model)
    case 'iPad': return getIpadCapacityChoices(model)
    case 'Macbook': return getMacbookCapacityChoices(model)
    default: return []
  }
}


const getIphoneCapacityChoices = (model) => {
  switch(model){
    case "SE 2020":
      return [capacityOptions["64"], capacityOptions["128"]];
      
    case "SE 3":
    case "11":
      return [capacityOptions["64"], capacityOptions["128"], capacityOptions["256"]];

    case '12':
    case '12 Mini':
      return [capacityOptions["64"], capacityOptions["128"], capacityOptions["256"], capacityOptions["512"]];

    case '12 Pro':
    case "12 Pro Max":
      return [capacityOptions["128"], capacityOptions["256"]];

    case "13": 
    case "13 Mini":
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"]];

    case "13 Pro":
    case "13 Pro Max":
      return [capacityOptions["128"], capacityOptions["256"], capacityOptions["512"], capacityOptions["1"]]
      
    default: return []
  } 
}

const getIpadCapacityChoices = (model) => {
  switch(model){
    case '10.2 2021':
    case '11 2021':
    case '12.9 2021':
    case 'Mini 6':  
    case 'Air 4':  
      return [capacityOptions["64"], capacityOptions["128"], capacityOptions["256"], capacityOptions["512"], capacityOptions["1"]]
        
    default: return []
  }
}

const getMacbookCapacityChoices = (model) => {
  switch(model){ 
    case 'Air':  
    case 'Pro':  
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

export const getColorChoices = (category, model) => {

  switch(category){
    case 'iPhone': return getIphoneColorChoices(model);
    case 'iPad': return getIpadColorChoices(model);
    case 'Macbook': return getMacbookColorChoices(model);
    case 'Watch': return getWatchColorChoices(model)
    default: return [];
  }

}

const getIphoneColorChoices = (model) => {
  switch(model){
    case "SE 2020":
      return [colorOptions["black"], colorOptions["white"], colorOptions['product red']];

    case "SE 3":
      return [colorOptions["midnight"], colorOptions["starlight"], colorOptions['product red']];

    case '11':
      return [colorOptions["black"], colorOptions["white"],  colorOptions["purple"], colorOptions['product red'], colorOptions["yellow"], colorOptions["mind"]]
      
    case "12 Mini":
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

const getIpadColorChoices = (model) => {
  switch(model){
    case '10.2 2021':
    case '11 2021':
    case '12.9 2021':
    case 'Mini 6':  
    case 'Air 4':  
      return [colorOptions["silver"],  colorOptions["white"],  colorOptions['product red'], colorOptions["mind"], colorOptions['blue'],colorOptions["purple"]];
        
    default: return []
  }
}

const getMacbookColorChoices = (model) => {
  switch(model){ 
    case 'Air':  
    case 'Pro':
      return [colorOptions["black"],  colorOptions["white"],  colorOptions['product red'], colorOptions["mind"], colorOptions['blue'],colorOptions["purple"]];
        
    default: return []
  }
}

const getWatchColorChoices = (model) => {
  switch(model){ 
    case '6':  
    case '7':
      return [colorOptions["black"],  colorOptions["white"],  colorOptions['product red'], colorOptions["mind"], colorOptions['blue'],colorOptions["purple"]];
        
    default: return []
  }
}

const colorOptions =  {
  'black': { id: 'Black', name: 'Black' },
  'product red': { id: '(Product) Red', name: '(Product) Red' },
  'yellow': { id: 'Yellow', name: 'Yellow' },
  'white': { id: 'White', name: 'White' },
  'mind': { id: 'Mind', name: 'Mind' },
  'purple': { id: 'Purple', name: 'Purple' },
  'blue': { id: 'Blue', name: 'Blue' },
  'silver': { id: 'Silver', name: 'Silver' },
  'gold': { id: 'Gold', name: 'Gold' },
  'pacific blue': { id: 'Pacific Blue', name: 'Pacific Blue' },
  'graphite': { id: 'Graphite', name: 'Graphite' },
  'pink': { id: 'Pink', name: 'Pink' },
  'midnight': { id: 'Midnight', name: 'Midnight' },
  'starlight': { id: 'Starlight', name: 'Starlight' },
  'green': { id: 'Green', name: 'Green' },
  'alpine green': { id: 'Alpine Green', name: 'Alpine Green' },
  'sierra blue': { id: 'Sierra Blue', name: 'Sierra Blue' }
}

export const colorForToggle = {
  // 11 and se 2020
  "Black": "rgb(31, 32, 33)",
  "White": "rgb(246, 243, 241)",
  "Yellow": "rgb(251, 230, 143)",
  "(Product) Red": "rgb(170, 39, 52)",
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

export const productsWithCapacity = ['iPhone', 'iPad', 'Macbook']
export const productsWithColors = ['iPhone', 'iPad', 'Macbook', 'Watch']