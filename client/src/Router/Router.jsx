import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage";
import TrainingPage from "../Components/Pages/TrainingPage";

import NutritionPage from "../Components/Pages/NutritionPage";
import ShoppingPage from "../Components/Pages/ShoppingPage";

import Navbar from "../Components/Partials/Navbar";
import Footer from "../Components/Partials/Footer";

import AdminPage from "../Components/Admin/AdminPage";
import CheckoutPage from "../Components/Pages/CheckoutPage";
import ProductDetail from "../Components/Pages/ProductDetailPage";
import NotiToast from "../Components/Common/Toast";
import ProtectedRoute from "../Components/Routing/ProtectedRoute";
export default function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <ProtectedRoute path="/admin" component={AdminPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/proDetail/:id" component={ProductDetail} />
        <Route exact path="/training" component={TrainingPage} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/shopping" component={ShoppingPage} />
        <Route render={() => <div>NOT FOUND !!!</div>} />
      </Switch>
      <NotiToast />
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
