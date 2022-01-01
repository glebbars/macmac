import React from "react";
import "./styles/App.scss";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
    <HeaderMenu />
      <AppRoutes/>
    </>
      
  );
}

export default App;
