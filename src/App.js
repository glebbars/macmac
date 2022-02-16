import React from "react";
import "./styles/App.scss";
import AppRoutes from "./routes/AppRoutes";
import { createHashHistory } from 'history';
import createAdminStore from './redux'
import { Provider } from 'react-redux';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider("http://localhost:5000")
// const dataProvider = restProvider('http://path.to.my.api/');
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
