import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Layouts/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}
