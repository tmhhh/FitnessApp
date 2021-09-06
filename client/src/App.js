import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage/HomePage";
import TrainingPage from "./Components/Pages/TrainingPage/TrainingPage";

import NutritionPage from "./Components/Pages/NutritionPage/NutritionPage";
import ShoppingPage from "./Components/Pages/ShoppingPage/ShoppingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import NutritionContextProvider from "./Contexts/NutritionContext";
import ProductDetailPage from "./Components/Pages/ProductDetailPage/ProductDetailPage";
import CheckoutPage from "./Components/Pages/CheckoutPage/CheckoutPage";
export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <NutritionContextProvider>
            <Route exact path="/productDetail" component={ProductDetailPage} />
            <Route exact path="/checkout" component={CheckoutPage} />


            <Route exact path="/training" component={TrainingPage} />
            <Route exact path="/nutrition" component={NutritionPage} />
            <Route exact path="/shopping" component={ShoppingPage} />
          </NutritionContextProvider> */}
        </Switch>
      </Router>
    </>
  );
}
