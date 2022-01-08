import React from 'react'
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostList from '../PostList/PostList'
import OrderList from '../OrderList/OrderList'
import PostCreate from '../PostCreate/PostCreate'
import PostEdit from '../PostEdit/PostEdit'
// import AuthProvider from "../AuthProvider/AuthProvider";
import AdminLoginPage from '../AdminLoginPage/AdminLoginPage'
import CustomLayout from '../CustomLayout/CustomLayout'

import { Provider } from 'react-redux';
import { createHashHistory } from 'history';

// import polyglotI18nProvider from 'ra-i18n-polyglot';

import createAdminStore from '../createAdminStore/createAdminStore';
// import messages from './i18n';

// dependency injection

const dataProvider = jsonServerProvider('http://localhost:3000');
const authProvider = () => Promise.resolve();

const history = createHashHistory();

const AdminPannel = () =>{
  return(
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
        })}
    >
    {/* <Admin dataProvider={jsonServerProvider('https://my-test-admin.herokuapp.com/api')}> */}
    <Admin history={history} layout={CustomLayout} authProvider={authProvider} loginPage={AdminLoginPage} dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
        <Resource name="orders" list={OrderList}/>
    </Admin>
    </Provider>
  )
}

export default AdminPannel