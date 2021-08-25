import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import TrainingPage from "./Components/Pages/TrainingPage";
import NutritionPage from "./Components/Pages/NutritionPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/training" component={TrainingPage} />
          <Route exact path="/nutrition" component={NutritionPage} />
        </Switch>
      </Router>
    </>
  );
}
