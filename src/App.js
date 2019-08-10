import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Country from "./components/Country/Country";

const App = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/:id" component={Country} />
    </>
  );
};
export default App;
