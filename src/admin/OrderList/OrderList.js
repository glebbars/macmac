import React from "react";
import {List, Datagrid, TextField, Pagination} from 'react-admin'

const PostPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />;

const OrderList = (props) =>{
  return (
    <List title='Orders' {...props} pagination={<PostPagination />}>
      <Datagrid>
        <TextField source="firstName"/>
        <TextField source="lastName" />
        <TextField source="phone" />
        <TextField source="email" />
        <TextField source="order" />
      </Datagrid>
    </List>
  )
}
export default OrderList