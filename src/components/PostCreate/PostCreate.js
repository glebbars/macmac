import React from "react";
import {Create, SimpleForm, TextInput, ImageInput, ImageField} from 'react-admin'

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
  return (
    <Create {...props} title='Create a Post'>
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