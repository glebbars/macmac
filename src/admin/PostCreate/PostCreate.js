import React, { useState } from "react";
import {Create, SimpleForm, TextInput, ImageInput, ImageField} from 'react-admin'
import axios from 'axios'
import Compressor from 'compressorjs';
import Resizer from "react-image-file-resizer";

export const validatePostForm = (values) => {
  const errors = {};

  if (!values.name) {
      errors.name = 'The firstName is required';
  }
  else if (!values.price) {
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
  console.log(values.pictures[0].rawFile)
    const newFilesArr = values.pictures.filter(item => item.rawFile)
    const images = await resizeFile(values.pictures[0].rawFile)
    const compressedImgs = await uploadImage(images)
    values.pictures = [compressedImgs]
    return values  
};

// const compressImages = async (filesArr) => {
//   const compressedPhotos = await Promise.all(
//     filesArr.map(async file => await resizeFile(file))
//   )
//   return uploadImage(compressedPhotos)
// };

  
const compressImages = async (filesArr) => {
    const compressedPhotos = await Promise.all(
      filesArr.map(async file => await resizeFile(file))
    )
  console.log(compressedPhotos)

  return uploadImage(compressedPhotos)
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
  
// const uploadImage = async (compressedImgArr) => {
//   console.log(compressedImgArr)
//   const attachments = await Promise.all(
//     compressedImgArr.map(item => {
//       const data = new FormData();
//       console.log(compressedImgArr, item);
//       data.append('upload_preset', "njebqo0r")
//       return axios.post("https://api.cloudinary.com/v1_1/dlt6mfxib/image/upload", data)
//       .then(res => {
//         console.log(res)
//         return {
//           url: res.data.secure_url,
//           id: res.data.asset_id
//         }
//       })
//     }))
//     console.log(attachments)
//     return attachments
// }


const uploadImage = async (item) => {
  const data = new FormData();
  data.append('file', item);
  data.append('upload_preset', "njebqo0r")
  return axios.post("https://api.cloudinary.com/v1_1/dlt6mfxib/image/upload", data)
  .then(res => {
    console.log(res)
    return {
      url: res.data.secure_url,
      id: res.data.asset_id
    }
  }).catch(err => console.log(err))
}


const PostCreate = (props) =>{
  return (
    <>
    <Create {...props} transform={onTransform} title='Create a Product'>
    <SimpleForm validate={validatePostForm}> 
      <TextInput resettable source="name"/>
      <TextInput resettable source="price"/>
      <TextInput resettable source="color"/>
      <ImageInput multiple source="pictures" label="Product pictures" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Create>
    </>

  )
}

export default PostCreate