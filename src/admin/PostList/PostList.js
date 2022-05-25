import React from "react";
import {List, Datagrid, TextField, NumberField, EditButton, DeleteButton, Pagination} from 'react-admin'

const PostPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />;

const PostList = (props) =>{

  return (
    <List title='Products' {...props} pagination={<PostPagination />}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="description.brand"/>
        <TextField source="description.category"/>
        <TextField source="description.model"/>
        <TextField source="description.capacity" />
        <TextField source="description.color" />
        <NumberField source="price" />
        <EditButton basePath="/posts"/>
        <DeleteButton basePath="/posts"/>
      </Datagrid>
    </List>
  )
}

export default PostList