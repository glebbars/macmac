import React, { useEffect, useState } from "react";
import {Edit, SimpleForm, TextInput, ImageInput, ImageField, SelectInput, FormDataConsumer} from 'react-admin'
import { validatePostForm, onTransform, initialChoices, getModelChoices, getCapacityChoices, getColorChoices } from "../AdditionalFunctions/AdditionalFunctions";
import axios from 'axios'

const PostEdit = (props) =>{
  // const [finalProduct, setFinalProduct] = useState({})

  // const [createdProduct, setCreatedProduct] = useState({})
  const [choices, setChoices] = useState({
    model: [],
    capacity: [],
    color: []
  })

  const modifyFinalProduct = (value) => {
    // setFinalProduct(`${finalProduct}` + value)
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${props.id}`).then(res => {
      // setCreatedProduct(res.data)
      setChoices({
        model: getModelChoices(res.data.category)
      })
    })

  }, [])

  return (
    <Edit {...props} title='Edit a Product'>
     <SimpleForm validate={validatePostForm}>
       <TextInput disabled source='id' /> 
    <SelectInput onChange={e => {
      // modifyFinalProduct(e.target.value); 
      // console.log(choices.model)

      // setCreatedProduct({...createdProduct, category: e.target.value})
      setChoices({...choices, model: getModelChoices(e.target.value)}) 
    }} 
    source="category" choices={initialChoices} />

     <SelectInput 
          value={'11'}
          source="model"
          choices={choices.model}
          onChange={e => { 
            // modifyFinalProduct(e.target.value); 
            // setChoices({...choices, capacity: getCapacityChoices(e.target.value)})
          }} 
        />

    {/* <FormDataConsumer>
      {({ formData }) => 
        <SelectInput 
          source="capacity"
          choices={getCapacityChoices(formData.model)}
          onChange={e => { 
            // modifyFinalProduct(e.target.value); 
            setChoices({...choices, color: getColorChoices(e.target.value)})
          }} 
        />
      }
    </FormDataConsumer>

    <FormDataConsumer>
      {({ formData }) => 
        <SelectInput 
          source="color"
          choices={getColorChoices(formData.capacity)}
          onChange={e => { 
            // modifyFinalProduct(e.target.value); 
          }} 
        />
      }
    </FormDataConsumer> */}

    <ImageInput multiple source="pictures" label="Product pictures" accept="image/*"  placeholder={<p>Upload or Drop your images here</p>}>
       <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
    </Edit>

  )
}


export default PostEdit

