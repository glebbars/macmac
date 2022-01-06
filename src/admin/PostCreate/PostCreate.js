import React from "react";
import {Create, SimpleForm, TextInput, ImageInput, ImageField} from 'react-admin'
import axios from 'axios'
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