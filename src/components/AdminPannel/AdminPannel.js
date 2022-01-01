import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostList from '../PostList/PostList'
import PostCreate from '../PostCreate/PostCreate'
import PostEdit from '../PostEdit/PostEdit'
import AuthProvider from "../AuthProvider/AuthProvider";
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage'
import HeaderMenu from '../HeaderMenu/HeaderMenu'

const AdminPannel = () =>{
  // authProvider={AuthProvider} loginPage={AdminLoginPage}
  return(
    <>
    <HeaderMenu/>
    {/* <Admin  dataProvider={jsonServerProvider('https://my-json-server.typicode.com/glebbars/admin-pannel-db')}> */}
    <Admin dataProvider={jsonServerProvider('https://my-test-admin.herokuapp.com/api')}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
    </Admin>
    </>

  )
}

export default AdminPannel