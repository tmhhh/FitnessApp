import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage/HomePage";
import TrainingPage from "./Components/Pages/TrainingPage/TrainingPage";

import ProgramPage from "./Components/Pages/ProgramPage/ProgramPage";
import NutritionPage from "./Components/Pages/NutritionPage/NutritionPage";
import ShoppingPage from "./Components/Pages/ShoppingPage/ShoppingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import NutritionContextProvider from "./Contexts/NutritionContext";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <NutritionContextProvider>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/training" component={TrainingPage} />
            <Route exact path="/nutrition" component={NutritionPage} />
            <Route exact path="/programs" component={ProgramPage} />
            <Route exact path="/shop" component={ShoppingPage} />
          </NutritionContextProvider>
        </Switch>
      </Router>
    </>
  );
}
