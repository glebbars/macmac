import React from "react";
import {List, Datagrid, TextField, NumberField, EditButton, DeleteButton, Pagination, TextInput} from 'react-admin'

const PostPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 200]} {...props} />;

const postFilters = [
  <TextInput label="Search" source="q" alwaysOn />
];

const PostList = (props) =>{

  return (
    <List title='Products' {...props} pagination={<PostPagination />} filters={postFilters}>
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