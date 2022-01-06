import React from 'react'
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostList from '../PostList/PostList'
import OrderList from '../OrderList/OrderList'
import PostCreate from '../PostCreate/PostCreate'
import PostEdit from '../PostEdit/PostEdit'
import AuthProvider from "../AuthProvider/AuthProvider";
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage'

const AdminPannel = () =>{
  return(
    // <Admin dataProvider={jsonServerProvider('https://my-test-admin.herokuapp.com/api')}>
    <Admin authProvider={AuthProvider} loginPage={AdminLoginPage} dataProvider={jsonServerProvider('http://localhost:3000')}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
        <Resource name="orders" list={OrderList}/>
    </Admin>
  )
}

export default AdminPannel