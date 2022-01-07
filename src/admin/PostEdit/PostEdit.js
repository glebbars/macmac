import React, { useEffect, useState } from "react";
import {Edit, SimpleForm, TextInput, ImageInput, ImageField, SelectInput, FormDataConsumer, Loading} from 'react-admin'
import { validatePostForm, onTransform, initialChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";
import axios from 'axios'

const PostEdit = (props) =>{

  const [createdProduct, setCreatedProduct] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${props.id}`).then(res => {
      setCreatedProduct(res.data)
      console.log(createdProduct)
    })
  }, [])

  if(createdProduct.length){
    return Loading...
  }

  return (
    <Edit {...props} title='Edit a Product'>
      {createdProduct.length > 0 && (
        <SimpleForm validate={validatePostForm}>
          <TextInput disabled source='id' /> 
        <SelectInput onChange={e => setCreatedProduct({...createdProduct, category: e.target.value})} 
        source="category" choices={initialChoices} />

        <SelectInput 
        // optionValue={getModelChoices(createdProduct.category)[0]}
              source="model"
              choices={getModelChoices(createdProduct.category)}
              onChange={e => setCreatedProduct({...createdProduct, model: e.target.value})} 
            />

        <ImageInput multiple source="pictures" label="Product pictures" accept="image/*"  placeholder={<p>Upload or Drop your images here</p>}>
          <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
      )}
    </Edit>

  )
}


export default PostEdit

