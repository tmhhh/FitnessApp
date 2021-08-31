import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import NutritionContextProvider from "./Contexts/NutritionContext";
import MainRouter from "./Router/Router";

export default function App() {
  return (
    <>
      <NutritionContextProvider>
        <Router>
          <MainRouter />
        </Router>
      </NutritionContextProvider>
    </>
  );
}
