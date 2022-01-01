import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostList from '../PostList/PostList'
import PostCreate from '../PostCreate/PostCreate'
import PostEdit from '../PostEdit/PostEdit'
import AuthProvider from "../AuthProvider/AuthProvider";
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage'

const AdminPannel = () =>{
  // authProvider={AuthProvider} loginPage={AdminLoginPage}
  return(
    <Admin  dataProvider={jsonServerProvider('https://my-json-server.typicode.com/glebbars/admin-pannel-db')}>
    <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
</Admin>

  )
}

export default AdminPannel