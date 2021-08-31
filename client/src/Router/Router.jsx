import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";
import TrainingPage from "../Components/Pages/TrainingPage/TrainingPage";

import NutritionPage from "../Components/Pages/NutritionPage/NutritionPage";
import ShoppingPage from "../Components/Pages/ShoppingPage/ShoppingPage";

import AuthPage from "../Components/Pages/AuthPage/AuthPage";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

import AdminPage from "../Components/Admin/AdminPage";

export default function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route exact path="/" component={HomePage} />
        <Route
          expact
          path="/register"
          component={() => <AuthPage type="register" />}
        />
        <Route
          expact
          path="/login"
          component={() => <AuthPage type="login" />}
        />
        <Route exact path="/training" component={TrainingPage} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/shop" component={ShoppingPage} />
      </Switch>
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
