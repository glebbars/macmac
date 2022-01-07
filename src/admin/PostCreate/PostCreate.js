import React, { useState } from "react";
import {Create, SimpleForm, TextInput, ImageInput, ImageField, SelectInput} from 'react-admin'
import { validatePostForm, onTransform,initialChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";

const PostCreate = (props) =>{
  // const [finalProduct, setFinalProduct] = useState({})

  const [choices, setChoices] = useState({
    model: [],
    capacity: [],
    color: []
  })

  const modifyFinalProduct = (value) => {
    // setFinalProduct(`${finalProduct}` + value)
  }

  return (
    <Create {...props} transform={onTransform} title='Create a Product'>
    <SimpleForm validate={validatePostForm}> 
    <SelectInput onChange={e => {
      // modifyFinalProduct(e.target.value); 
      setChoices({...choices, model: getModelChoices(e.target.value)}) 
    }} 
    source="category" choices={initialChoices} />

    {choices.model.length > 0 && (
       <SelectInput onChange={e => { 
          // modifyFinalProduct(e.target.value); 
          setChoices({...choices, capacity: getCapacityChoices(e.target.value)})
        }} 
          source="model" choices={choices.model} 
        />
      )
    }

    {choices.capacity.length > 0 && (
        <SelectInput onChange={e => {
          // modifyFinalProduct(e.target.value); 
          setChoices({...choices, color: getColorChoices(e.target.value)})
        }} 
        source="capacity" choices={choices.capacity} 
        />
      )
    }
    
    {choices.color.length > 0 && ( 
      <SelectInput onChange={e => modifyFinalProduct(e.target.value)} source="color" choices={choices.color} />
    )}

      <ImageInput multiple source="pictures" label="Product pictures" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Create>
  )
}

export default PostCreate