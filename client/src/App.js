import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import LoadingLayer from "./Components/Common/LoadingLayer";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
// import Toast from "./Components/Common/Toast";
import ContextProvider from "Contexts";
import MainRouter from "Router/Router";
import ScrollToTop from "Components/Partials/ScrollToTop/ScrollToTop";
export default function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <ScrollToTop />
          {/* <LoadingLayer show={loading} /> */}
          <MainRouter />
        </Router>
      </ContextProvider>
    </>
  );
}
