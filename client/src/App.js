import React from "react";
import "./styles/App.scss";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostList from './components/PostList/PostList'
import PostCreate from './components/PostCreate/PostCreate'
import PostEdit from './components/PostEdit/PostEdit'
import AuthProvider from "./components/AuthProvider/AuthProvider";
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage'
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
    <HeaderMenu />
      <AppRoutes/>
    {/* <Admin authProvider={AuthProvider} loginPage={AdminLoginPage} dataProvider={jsonServerProvider('http://localhost:3000')}>
        <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit}/>
    </Admin>
      */}
    </>
      
  );
}

export default App;
