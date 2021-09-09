import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// import Toast from "./Components/Common/Toast";

import ContextProvider from "./Contexts";
import MainRouter from "./Router/Router";

export default function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <MainRouter />
        </Router>
      </ContextProvider>
    </>
  );
}
