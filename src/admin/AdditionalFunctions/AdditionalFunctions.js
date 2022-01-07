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
  const price = await getPriceOfProduct(values)
  values.price = price

  const compressedImgs = await compressImages(newFilesArr)
  const uploadedImgs = await uploadImage(compressedImgs)
  values.pictures = [...values.pictures.filter(item => !item.rawFile), ...uploadedImgs]

  return values  
};

const getPriceOfProduct = (allValues) =>  {

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
  }).then(data => Object.values(data)[0])
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
  { id: '12', name: '12' },
  { id: '12 mini', name: '12 Mini' },
  { id: '12 pro', name: '12 Pro' },
  { id: '13', name: '13' },
  { id: '13 mini', name: '13 Mini' },
  { id: '13 pro', name: '13 Mini' },
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
  return capacityOptions

  // switch(value){
  //   case '10.2 2021':
  //     return capacityOptionsss
  //   break;
  //   case '12':
  //     return capacityOptions
  //   break;
  // }
}

const capacityOptions = [
  { id: '64gb', name: '64GB' },
  { id: '128gb', name: '128GB' },
  { id: '256gb', name: '256GB' },
  { id: '512gb', name: '512GB' },
  { id: '1tb', name: '1TB' },
]

export const getColorChoices = (value) => {
  return colorOptions
  // switch(value){
  //   case '11':
  //     return iphoneModelChoices
  //   break;
  //   case '12':
  //     return ipadModelChoices
  //   break;
  // }
}


const colorOptions =  [
  // iphone 11
  { id: 'purple', name: 'Purple' },
  { id: 'green', name: 'Green' },
  { id: 'white', name: 'White' },
  { id: 'black', name: 'Black' },
  { id: 'yellow', name: 'Yellow' },
  //iphone 11 pro
  // { id: 'Silver', name: 'Silver' },
  // { id: 'Space Grey', name: 'Space Grey' },
  // { id: 'Gold', name: 'Gold' },
  // { id: 'Midnight Green', name: 'Midnight Green' },
  // // 11 pro max
  // { id: 'Silver', name: 'Silver' },
  // { id: 'Space Grey', name: 'Space Grey' },
  // { id: 'Gold', name: 'Gold' },
  // { id: 'Midnight Green', name: 'Midnight Green' },
  // // 12
  // { id: 'Black', name: 'Black' },
  // { id: 'White', name: 'White' },
  // { id: 'Blue', name: 'Blue' },
  // { id: 'Green', name: 'Green' },
  // { id: 'Product Red', name: 'Product Red' },
  // { id: 'Purple', name: 'Purple' },

  // // 12 mini 

  // { id: 'Black', name: 'Black' },
  // { id: 'White', name: 'White' },
  // { id: 'Blue', name: 'Blue' },
  // { id: 'Green', name: 'Green' },
  // { id: 'Product Red', name: 'Product Red' },
  // { id: 'Purple', name: 'Purple' },

  // // 12 mini 

  // { id: 'Black', name: 'Black' },
  // { id: 'White', name: 'White' },
  // { id: 'Blue', name: 'Blue' },
  // { id: 'Green', name: 'Green' },
  // { id: 'Product Red', name: 'Product Red' },
  // { id: 'Purple', name: 'Purple' },
  
  // // 12 pro

  // { id: 'Silver', name: 'Silver' },
  // { id: 'Gold', name: 'Gold' },
  // { id: 'Pacific Blue', name: 'Pacific Blue' },
  // { id: 'Graphite', name: 'Graphite' },

  // // 12 pro max

  // { id: 'Silver', name: 'Silver' },
  // { id: 'Gold', name: 'Gold' },
  // { id: 'Pacific Blue', name: 'Pacific Blue' },
  // { id: 'Graphite', name: 'Graphite' },

  // // 13

  // { id: 'Pink', name: 'Pink' },
  // { id: 'Blue', name: 'Blue' },
  // { id: 'Midnight', name: 'Midnight' },
  // { id: 'Starlight', name: 'Starlight' },
  // { id: 'Product Red', name: 'Product Red' },

  // // 13 mini

  // { id: 'Pink', name: 'Pink' },
  // { id: 'Blue', name: 'Blue' },
  // { id: 'Midnight', name: 'Midnight' },
  // { id: 'Starlight', name: 'Starlight' },
  // { id: 'Product Red', name: 'Product Red' },

  // // 13 pro

  // { id: 'Graphite', name: 'Graphite' },
  // { id: 'Gold', name: 'Gold' },
  // { id: 'Sierra Blue', name: 'Sierra Blue' },
  // { id: 'Silver', name: 'Silver' },

  // // 13 pro max

  // { id: 'Graphite', name: 'Graphite' },
  // { id: 'Gold', name: 'Gold' },
  // { id: 'Sierra Blue', name: 'Sierra Blue' },
  // { id: 'Silver', name: 'Silver' }

]