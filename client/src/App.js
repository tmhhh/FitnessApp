import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "Components/Partials/ScrollToTop/ScrollToTop";
// import Toast from "./Components/Common/Toast";
import ContextProvider from "Contexts";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "Router/Router";
import "./App.scss";
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
