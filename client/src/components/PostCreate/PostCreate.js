import React from "react";
import {Create, SimpleForm, TextInput} from 'react-admin'

const PostCreate = (props) =>{
  return (
    <Create {...props} title='Create a Post'>
    <SimpleForm> 
      <TextInput source="name"/>
      <TextInput source="price"/>
      <TextInput source="color"/>
    </SimpleForm>
    </Create>

  )
}

export default PostCreate