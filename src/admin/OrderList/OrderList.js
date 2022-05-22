import React from "react";
import {List, Datagrid, TextField, Pagination} from 'react-admin'

const PostPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />;

const OrderList = (props) =>{
  return (
    <List title='Orders' {...props} pagination={<PostPagination />}>
      <Datagrid>
        <TextField source="fullName"/>
        <TextField source="phone" />
        <TextField source="order" />
        <TextField source="price" />
      </Datagrid>
    </List>
  )
}
export default OrderList