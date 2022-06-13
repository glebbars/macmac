import React from "react";
import {List, Datagrid, TextField, NumberField, EditButton, DeleteButton} from 'react-admin'
import {CustomPagination, customFilters} from '../AdminListsProps/AdminListsProps'

const PostList = (props) =>{

  return (
    <List title='Products' {...props} pagination={<CustomPagination />} filters={customFilters}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="fullName"/>
        <TextField source="description.capacity"/>
        <NumberField source="price" />
        <EditButton basePath="/posts"/>
        <DeleteButton basePath="/posts"/>
      </Datagrid>
    </List>
  )
}

export default PostList