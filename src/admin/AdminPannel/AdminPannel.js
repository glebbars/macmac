import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
import PostList from '../PostList/PostList'
import PostCreate from '../PostCreate/PostCreate'
import PostEdit from '../PostEdit/PostEdit'
import AuthProvider from "../AuthProvider/AuthProvider";
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import simpleRestProvider from 'ra-data-simple-rest';
import myDataProvider from '../customDataPtovider/customDataPtovider';

const AdminPannel = () =>{
  // authProvider={AuthProvider} loginPage={AdminLoginPage}
  return(
    <>
    <HeaderMenu/>
    {/* <Admin dataProvider={jsonServerProvider('https://my-test-admin.herokuapp.com/api')}> */}
    <Admin dataProvider={myDataProvider}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
    </Admin>
    </>

  )
}

export default AdminPannel