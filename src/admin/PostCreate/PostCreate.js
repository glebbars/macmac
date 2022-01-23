import React, { useState } from "react";
import {Create, SimpleForm, ImageInput, ImageField, SelectInput, TextInput} from 'react-admin'
import { validatePostForm, onTransform,initialChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";


const PostCreate = (props) =>{
  // const [finalProduct, setFinalProduct] = useState({})

  const [createdProduct, setCreatedProduct] = useState({})

  console.log(createdProduct)

  return (
    <Create {...props} transform={onTransform} title='Create a Product'>
    <SimpleForm validate={validatePostForm}> 
    <SelectInput onChange={e => setCreatedProduct({...createdProduct, category: e.target.value})} 
    source="category" choices={initialChoices} />

    {createdProduct.category && (
       <SelectInput onChange={e => setCreatedProduct({...createdProduct, model: e.target.value})} 
          source="model" choices={getModelChoices(createdProduct.category)}
        />
      )
    }

    {createdProduct.model && (
        <SelectInput choices={getCapacityChoices(createdProduct.model)}
        onChange={e => setCreatedProduct({...createdProduct, capacity: e.target.value})} 
        source="capacity" 
        />
      )
    }
    
    {createdProduct.capacity && ( 
      <SelectInput 
      choices={getColorChoices(createdProduct.model)}
      onChange={e => setCreatedProduct({...createdProduct, color: e.target.value})} 
      source="color"  />
      )}
    {createdProduct.color && 
      <TextInput helperText="Это необязательное поле" source="price"/> }
      <ImageInput multiple source="pictures" label="" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Create>
  )
}

export default PostCreate