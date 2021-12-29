import React from "react";
import {Edit, SimpleForm, TextInput} from 'react-admin'

const PostEdit = (props) =>{
  return (
    <Edit {...props} title='Edit Post'>
    <SimpleForm> 
      <TextInput disabled source="id"/>
      <TextInput source="name"/>
      <TextInput source="price"/>
      <TextInput source="color"/>
    </SimpleForm>
    </Edit>

  )
}

export default PostEdit