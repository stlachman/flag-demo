import React from "react";
import { Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Home from "./components/Home/Home";
import Country from "./components/Country/Country";

const App = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/country/:id" component={Country} />
    </>
  );
};
export default App;
