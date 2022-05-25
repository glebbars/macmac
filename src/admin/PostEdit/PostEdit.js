import React, { useEffect, useState } from "react";
import {Edit, SimpleForm, TextInput, ImageInput, ImageField, SelectInput} from 'react-admin'
import {brandChoices, validatePostForm, onTransform, getCategoryChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";
import axios from 'axios'

const PostEdit = (props) =>{
  const [createdProduct, setCreatedProduct] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${props.id}`)
      .then(res=> setCreatedProduct(res.data))
  }, [])

  console.log(createdProduct)

  return (
    <Edit {...props} transform={onTransform} title='Edit a Product'>
        <SimpleForm validate={validatePostForm}>
          <TextInput disabled source='id' /> 

          <SelectInput 
            onChange={e => setCreatedProduct({...createdProduct, brand: e.target.value})} 
            source="description.brand" 
            choices={brandChoices} 
          />

          <SelectInput 
            onChange={e => setCreatedProduct({...createdProduct, category: e.target.value})} 
            source="description.category" 
            choices={getCategoryChoices(createdProduct.description?.brand)} 
          />

          <SelectInput 
            source="description.model"
            choices={getModelChoices(createdProduct.description?.category)}
            onChange={e => setCreatedProduct({...createdProduct, model: e.target.value})} 
          />

          {createdProduct.description?.capacity && (
            <SelectInput 
              source="description.capacity"
              choices={getCapacityChoices(createdProduct.description?.category, createdProduct.description?.model)}
              onChange={e => setCreatedProduct({...createdProduct, capacity: e.target.value})} 
            /> 
          )}

          {createdProduct.description?.color && (
            <SelectInput 
              source="description.color"
              choices={getColorChoices(createdProduct.description?.category, createdProduct.description?.model)}
              onChange={e => setCreatedProduct({...createdProduct, color: e.target.value})} 
            /> 
          )}

          <TextInput helperText="Это необязательное поле" source="price"/> 

         <ImageInput multiple source="pictures" label="" accept="image/*"  placeholder={<p>Upload or Drop your images here</p>}>
            <ImageField source="url" title="title" />
          </ImageInput>

        </SimpleForm>
    </Edit>

  )
}


export default PostEdit

