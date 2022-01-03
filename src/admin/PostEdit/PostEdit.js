import React from "react";
import {Edit, SimpleForm, TextInput, ImageInput, ImageField,SaveButton, Toolbar} from 'react-admin'
import {validatePostForm, onTransform} from '../PostCreate/PostCreate'

const PostCreateToolbar = props => (
  <Toolbar {...props}>
      <SaveButton transform={data => console.log(data)}/>
  </Toolbar>
);

const PostEdit = (props) =>{

  return (
    <Edit {...props} transform={onTransform} title='Edit a Product'>
    <SimpleForm validate={validatePostForm}> 
      <TextInput disabled source="id"/>
      <TextInput resettable source="name"/>
      <TextInput resettable source="price"/>
      <TextInput resettable source="color"/>
      <ImageInput multiple source="pictures" label="Product pictures" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="url" title="title" />
      </ImageInput>
    </SimpleForm>
    </Edit>

  )
}

export default PostEdit