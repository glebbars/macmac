import React from "react";
import {Create, SimpleForm, TextInput, ImageInput, ImageField} from 'react-admin'
import axios from 'axios'

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
  else if (!values.pictures === 0) {
      errors.color = 'Please upload pictures';
  } 
  return errors
};


const PostCreate = (props) =>{

  const onTransform = async (values) => {
    const images = await uploadImages(values.pictures)
    const newImgs = values.pictures = images
    return {
      ...values,
      newImgs
    }
  };

  const uploadImages = async (items) => {
    const attachments = await Promise.all(
      Array.from(items).map( item => {
        const data = new FormData();
        data.append('file', item.rawFile);
        data.append('upload_preset', "njebqo0r")
        return axios.post("https://api.cloudinary.com/v1_1/dlt6mfxib/image/upload", data)
        .then(res => {
          return {
            url: res.data.secure_url,
            id: res.data.asset_id
          }
        })
      })
    )
    return attachments
  }
  

  return (
    <Create {...props} transform={onTransform} title='Create a Post'>
    <SimpleForm validate={validatePostForm}> 
      <TextInput resettable source="name"/>
      <TextInput resettable source="price"/>
      <TextInput resettable source="color"/>
      <ImageInput multiple source="pictures" label="Product pictures" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Create>

  )
}

export default PostCreate