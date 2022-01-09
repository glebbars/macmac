import React, { useState } from "react";
import {Create, SimpleForm, ImageInput, ImageField, SelectInput} from 'react-admin'
import { validatePostForm, onTransform,initialChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";


const PostCreate = (props) =>{
  // const [finalProduct, setFinalProduct] = useState({})

  const [createdProduct, setCreatedProduct] = useState({})

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
      choices={getColorChoices(createdProduct.capacity)}
      onChange={e => setCreatedProduct({...createdProduct, color: e.target.value})} 
      source="color"  />
    )}
      <ImageInput multiple source="pictures" label="Product pictures" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Create>
  )
}

export default PostCreate