import React from "react";
import "./styles/App.scss";
import AppRoutes from "./routes/AppRoutes";
import { createHashHistory } from 'history';
import createAdminStore from './redux'
import { Provider } from 'react-redux';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider(process.env.REACT_APP_DB_API)
// const dataProvider = jsonServerProvider("http://localhost:5000")

const history = createHashHistory();

const authProvider = () => Promise.resolve() 
export const App = () => {
  return (
    <Provider store={createAdminStore({authProvider, dataProvider, history})}>
      <AppRoutes authProvider={authProvider} dataProvider={dataProvider} history={history}/> 
    </Provider>
  );
}

export default App;
