import React from 'react'
import { Admin, Resource } from 'react-admin';
import PostList from '../PostList/PostList'
import OrderList from '../OrderList/OrderList'
import PostCreate from '../PostCreate/PostCreate'
import PostEdit from '../PostEdit/PostEdit'
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage'
import CustomLayout from '../CustomLayout/CustomLayout'

const AdminPannel = ({history, authProvider, dataProvider}) =>{
  return(
    // <Admin dataProvider={jsonServerProvider('https://my-test-admin.herokuapp.com/api')}>
    <Admin history={history} layout={CustomLayout} authProvider={authProvider} loginPage={AdminLoginPage} dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
        <Resource name="orders" list={OrderList}/>
    </Admin>
  )
}

export default AdminPannel