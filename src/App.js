import React from "react";
import "./styles/App.scss";
import AppRoutes from "./routes/AppRoutes";

import { createHashHistory } from 'history';
import createAdminStore from './redux'
import { Provider } from 'react-redux';
import jsonServerProvider from 'ra-data-json-server';


const dataProvider = jsonServerProvider('http://localhost:3000')
// const dataProvider = restProvider('http://path.to.my.api/');
const history = createHashHistory();
const authProvider = () => Promise.resolve();


const App = () => {
  return (
    <Provider store={createAdminStore({authProvider, dataProvider,history})}>
      <AppRoutes/> 
    </Provider>
  );
}

export default App;
