import React, { useState, useEffect } from "react";
import AppRoutes from "../../routes/AppRoutes";

const GetData = () => {
  const [clothesList, setClothesList] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setClothesList(data);
      });
  }, []);

  return (
      <AppRoutes cardsArr={clothesList} />
  );
};

export default GetData;
