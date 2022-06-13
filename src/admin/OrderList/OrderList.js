import React from "react";
import {List, Datagrid, TextField} from 'react-admin'
import {CustomPagination, customFilters} from '../AdminListsProps/AdminListsProps'


const OrderList = (props) =>{
  return (
    <List title='Orders' {...props} pagination={<CustomPagination />} filters={customFilters}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="fullName"/>
        <TextField source="phone" />
        <TextField source="order" />
        <TextField source="totalPrice" />
        <TextField source="payment" />
        <TextField source="delivery" />
      </Datagrid>
    </List>
  )
}
export default OrderList