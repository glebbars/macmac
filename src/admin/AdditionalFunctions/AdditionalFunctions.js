import Resizer from "react-image-file-resizer";
import axios from "axios";

export const validatePostForm = (values) => {
  const errors = {};

  // if (!values.category) {
  //     errors.name = 'The firstName is required';
  // }
  // else if (!values.model) {
  //     errors.price = 'The price is required';
  // } 
  // else if (!values.capacity) {
  //     errors.price = 'The price is required';
  // } 
  // else if (!values.color) {
  //     errors.color = 'The color is required';
  // } 
  // else if (!values.pictures || values.pictures.length === 0) {
  //     errors.pictures = 'Please upload pictures';
  // } 
  return errors
};


export const onTransform = async (values) => {
  console.log(values)
    const newFilesArr = values.pictures.filter(item => item.rawFile)
    console.log(newFilesArr)
    const compressedImgs = await compressImages(newFilesArr)
    const uploadedImgs = await uploadImage(compressedImgs)
    values.pictures = [...values.pictures.filter(item => !item.rawFile), ...uploadedImgs]
    return values  
};
  
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
  { id: '12 Mini', name: '12 Mini' },
  { id: '12 Pro', name: '12 Pro' },
  { id: '13', name: '13' },
  { id: '13 Mini', name: '13 Mini' },
  { id: '13 Pro', name: '13 Mini' },
  { id: '13 Pro Max', name: '13 Pro Max' },
]

const ipadModelChoices = [
  { id: '10.2 2021', name: '10.2 2021' },
  { id: '11 2021', name: '11 2021' },
  { id: '12.9 2021', name: '12.9 2021' },
  { id: 'mini 6', name: 'mini 6' },
  { id: 'Air 4', name: 'Air 4' }
]

export const getCapacityChoices = (value) => {
  switch(value){
    case '10.2 2021':
      return capacityOptionsss
    break;
    case '12':
      return capacityOptions
    break;
  }
}

const capacityOptions = [
  { id: '64GB', name: '64GB' },
  { id: '128GB', name: '128GB' },
  { id: '256GB', name: '256GB' },
  { id: '512GB', name: '512GB' },
  { id: '1TB', name: '1TB' },
]
const capacityOptionsss = [
  { id: '512GB', name: '512GB' },
  { id: '1TB', name: '1TB' },
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
  { id: 'Purple', name: 'Purple' },
  { id: 'Green', name: 'Green' },
  { id: 'White', name: 'White' },
  { id: 'Black', name: 'Black' },
  { id: 'Yellow', name: 'Yellow' },
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