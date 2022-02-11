import React, { useEffect, useState } from "react";
import {Edit, SimpleForm, TextInput, ImageInput, ImageField, SelectInput} from 'react-admin'
import { validatePostForm, onTransform, initialChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";
import axios from 'axios'

const PostEdit = (props) =>{

  const [createdProduct, setCreatedProduct] = useState({})

  useEffect(() => {
    axios.get(`https://my-test-admin.herokuapp.com/api/${props.id}`)
      .then(res=> setCreatedProduct(res.data))
  }, [])

  return (
    <Edit {...props} transform={onTransform} title='Edit a Product'>
        <SimpleForm validate={validatePostForm}>
          <TextInput disabled source='id' /> 
        <SelectInput onChange={e => setCreatedProduct({...createdProduct, category: e.target.value})} 
        source="category" choices={initialChoices} />

        <SelectInput 
          source="model"
          choices={getModelChoices(createdProduct.category)}
          onChange={e => setCreatedProduct({...createdProduct, model: e.target.value})} 
        />

        <SelectInput 
          source="capacity"
          choices={getCapacityChoices(createdProduct.model)}
          onChange={e => setCreatedProduct({...createdProduct, capacity: e.target.value})} 
       
       />

        <SelectInput 
          source="color"
          choices={getColorChoices(createdProduct.model)}
          onChange={e => setCreatedProduct({...createdProduct, color: e.target.value})} 
        
        />
      <TextInput helperText="Это необязательное поле" source="price"/> 


        <ImageInput multiple source="pictures" label="" accept="image/*"  placeholder={<p>Upload or Drop your images here</p>}>
          <ImageField source="url" title="title" />
          </ImageInput>

        </SimpleForm>
    </Edit>

  )
}


export default PostEdit

