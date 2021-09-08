import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import NutritionContextProvider from "./Contexts/NutritionContext";
import MainRouter from "./Router/Router";
import LoadingLayer from "./Components/Common/LoadingLayer";
import { useSelector } from "react-redux";

export default function App() {
  const loading = useSelector((state) => state.prodReducer.prodLoading);
  return (
    <>
      <NutritionContextProvider>
        <Router>
          <LoadingLayer show={loading} />
          <MainRouter />
        </Router>
      </NutritionContextProvider>
    </>
  );
}
