import React, { useState } from "react";
import {Create, SimpleForm, ImageInput, ImageField, SelectInput, TextInput, NumberInput} from 'react-admin'
import { validatePostForm, onTransform, brandChoices, getCategoryChoices, getModelChoices, getCapacityChoices, getColorChoices, productsWithCapacity, productsWithColors } from "../AdditionalFunctions/AdditionalFunctions"


const PostCreate = (props) =>{
  const [createdProduct, setCreatedProduct] = useState({})

  return (
    <Create {...props} transform={onTransform} title='Create a Product'>
    <SimpleForm validate={validatePostForm}> 

      <SelectInput 
        onChange={e => setCreatedProduct({brand: e.target.value})} 
        source="description.brand" 
        choices={brandChoices} 
      />

      {createdProduct.brand && (
        <SelectInput 
          onChange={e => setCreatedProduct({...createdProduct, category: e.target.value})} 
          source="description.category" 
          choices={getCategoryChoices(createdProduct.brand)} 
        />
      )}

      {createdProduct.category && (
        <SelectInput 
            onChange={e => setCreatedProduct({...createdProduct, model: e.target.value})} 
            source="description.model" 
            choices={getModelChoices(createdProduct.category)}
          />
        )
      }

      {productsWithCapacity.includes(createdProduct.category) && createdProduct.model && (
          <SelectInput 
            choices={getCapacityChoices(createdProduct.category, createdProduct.model)}
            onChange={e => setCreatedProduct({...createdProduct, capacity: e.target.value})} 
            source="description.capacity" 
          />
        )
      }
      
      {productsWithCapacity.includes(createdProduct.category) && createdProduct.model && ( 
        <SelectInput 
          choices={getColorChoices(createdProduct.category, createdProduct.model)}
          onChange={e => setCreatedProduct({...createdProduct, color: e.target.value})} 
          source="description.color"  
        />
      )}

      {createdProduct.model && 
        // <TextInput helperText="Это необязательное поле" source="price"/> 
        <NumberInput source="price" />
      }

      <ImageInput multiple source="pictures" label="" accept="image/*" placeholder={<p>Upload or Drop your images here</p>}>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Create>
  )
}

export default PostCreate